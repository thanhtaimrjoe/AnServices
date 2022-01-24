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
        
        /// <summary>
        /// tạo request vật liệu
        /// </summary>
        /// <param name="model">Cần mason id, request detail id, 1 list vật liệu cần nhập</param>
        /// <returns></returns>
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

        /// <summary>
        /// lấy tất cả request material trong db (tblUsedMaterial)
        /// </summary>
        /// <returns></returns>
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

        /// <summary>
        /// lấy tất cả request material trong db (tblUsedMaterial) dựa theo request detail id
        /// </summary>
        /// <param name="id">cần request detail id</param>
        /// <returns></returns>
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

        /// <summary>
        /// lấy tất cả request material trong db (tblUsedMaterial) dựa theo request service id
        /// </summary>
        /// <param name="id">cần request service id</param>
        /// <returns></returns>
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

        /// <summary>
        /// update status của request vật liệu, cần chuyền tham số id, status (approve, deny)
        /// </summary>
        /// <param name="id">id của request vật liệu</param>
        /// <param name="status">approve (3) hoặc deny (1)</param>
        /// <returns></returns>
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
        
        /// <summary>
        /// update request vật liệu theo id với status approve
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
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

        /// <summary>
        /// update request vật liệu theo id với status deny, message với lý do tại sao deny
        /// </summary>
        /// <param name="id"></param>
        /// <param name="message"></param>
        /// <returns></returns>
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

        /// <summary>
        /// update số lượng vật liệu của request theo id, message thông báo cập nhật lại số lượng, status approve
        /// </summary>
        /// <param name="id"></param>
        /// <param name="quantity"></param>
        /// <param name="message"></param>
        /// <returns></returns>
        [HttpPut]
        [Route("[action]")]
        public async Task<IActionResult> UpdateRequestMaterial(int id, int quantity, string message)
        {
            if (id == 0)
            {
                return BadRequest(new ErrorResponse("Please enter id"));
            }

            if (quantity == 0)
            {
                return BadRequest(new ErrorResponse("Please enter quantity > 0"));
            }

            if (message == null)
            {
                return BadRequest(new ErrorResponse("Please enter the reason that you deny this request"));
            }

            var result = await _materialReposiory.UpdateRequestMaterial(id, quantity, message);
            if (result)
            {
                return Ok("Update Successfull");
            }
            return BadRequest(new ErrorResponse("Update Fail"));
        }

        /// <summary>
        /// lấy danh sách vật liệu có trong db
        /// </summary>
        /// <returns></returns>
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

        /// <summary>
        /// lấy request vật liệu theo id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("[action]")]
        public async Task<IActionResult> GetRequestMaterialByID(int id)
        {
            if (id == 0)
            {
                return BadRequest(new ErrorResponse("Please enter id"));
            }

            var res = await _materialReposiory.GetRequestMaterialByID(id);
            if (res == null)
            {
                return NotFound(new ErrorResponse("No record"));
            }
            return Ok(res);
        }
    }
}
