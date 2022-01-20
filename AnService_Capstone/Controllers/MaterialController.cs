using AnService_Capstone.Core.Interfaces;
using AnService_Capstone.Core.Models.Request;
using AnService_Capstone.Core.Models.Response;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace AnService_Capstone.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MaterialController : ControllerBase
    {
        private readonly IMaterialRepository _materialReposiory;

        public MaterialController(IMaterialRepository materialReposiory)
        {
            _materialReposiory = materialReposiory;
        }

        [HttpPost]
        [Route("[action]")]
        public async Task<IActionResult> InsertRequestMaterial(RequestMaterial model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var result = await _materialReposiory.InsertMaterial(model);
            if (result)
            {
                return Ok("Request Successful");
            }
            return BadRequest(new ErrorResponse("Create Fail"));
        }

        [HttpGet]
        [Route("[action]")]
        public async Task<IActionResult> GetAllRequestMaterial()
        {
            var result = await _materialReposiory.GetAllRequestMaterial();
            if (result != null)
            {
                return Ok(result);
            }
            return NotFound(new ErrorResponse("No Record"));
        }

        [HttpGet]
        [Route("[action]")]
        public async Task<IActionResult> GetAllMaterialByRequestDetailID(int id)
        {
            if (id == 0)
            {
                return BadRequest(new ErrorResponse("Please enter id"));
            }

            var result = await _materialReposiory.GetAllMaterialByRequestDetailID(id);
            if (result != null)
            {
                return Ok(result);
            }
            return NotFound(new ErrorResponse("No Record"));
        }

        [HttpGet]
        [Route("[action]")]
        public async Task<IActionResult> GetAllMaterialByRequestServiceID(int id)
        {
            if (id == 0)
            {
                return BadRequest(new ErrorResponse("Please enter id"));
            }

            var result = await _materialReposiory.GetAllMaterialByRequestServiceID(id);
            if (result != null)
            {
                return Ok(result);
            }
            return NotFound(new ErrorResponse("No Record"));
        }

        [HttpPut]
        [Route("[action]")]
        public async Task<IActionResult> UpdateStatusRequestMaterial(int id, int status)
        {
            if (id == 0)
            {
                return BadRequest(new ErrorResponse("Please enter id"));
            }

            if (status == 0)
            {
                return BadRequest(new ErrorResponse("Please enter status"));
            }

            var result = await _materialReposiory.UpdateStatusRequestMaterial(id, status);
            if (result)
            {
                return Ok("Update Successfull");
            }
            return BadRequest(new ErrorResponse("Update Fail"));
        }

        [HttpPut]
        [Route("[action]")]
        public async Task<IActionResult> ApproveRequestMaterial(int id)
        {
            if (id == 0)
            {
                return BadRequest(new ErrorResponse("Please enter id"));
            }

            var result = await _materialReposiory.ApproveRequestMaterial(id);
            if (result)
            {
                return Ok("Update Successfull");
            }
            return BadRequest(new ErrorResponse("Update Fail"));
        }

        [HttpPut]
        [Route("[action]")]
        public async Task<IActionResult> DenyRequestMaterial(int id, string message)
        {
            if (id == 0)
            {
                return BadRequest(new ErrorResponse("Please enter id"));
            }

            if (message == null)
            {
                return BadRequest(new ErrorResponse("Please enter the reason that you deny this request"));
            }

            var result = await _materialReposiory.DenyRequestMaterial(id, message);
            if (result)
            {
                return Ok("Update Successfull");
            }
            return BadRequest(new ErrorResponse("Update Fail"));
        }

        [HttpGet]
        [Route("[action]")]
        public async Task<IActionResult> GetAllMaterial()
        {
            var rs = await _materialReposiory.GetAllMaterial();
            if (rs == null)
            {
                return NotFound();
            }
            return Ok(rs);
        }
    }
}
