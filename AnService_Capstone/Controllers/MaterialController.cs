using AnService_Capstone.Core.Interfaces;
using AnService_Capstone.Core.Interfaces.Services;
using AnService_Capstone.Core.Models.Request;
using AnService_Capstone.Core.Models.Response;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Threading.Tasks;

namespace AnService_Capstone.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MaterialController : ControllerBase
    {
        /*private readonly IMaterialRepository _materialReposiory;*/
        private readonly IMaterialService _materialService;

        public MaterialController(IMaterialService materialService)
        {
            _materialService = materialService;
        }
        
        /// <summary>
        /// tạo request vật liệu
        /// </summary>
        /// <param name="model">Cần worker id, request detail id, 1 list vật liệu cần nhập</param>
        /// <returns></returns>
        [HttpPost]
        [Route("[action]")]
        [Authorize(Roles = "Worker")]
        public async Task<IActionResult> InsertRequestMaterial(RequestMaterial model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            var res = await _materialService.InsertRequestMaterial(model);
            if (res.ErrorsMsg.First().Equals("Request Successful"))
            {
                return Ok(res.ErrorsMsg);
            }
            else
            {
                return BadRequest(res.ErrorsMsg);
            }
            /*var result = await _materialReposiory.InsertMaterial(model);
            if (result)
            {
                return Ok("Request Successful");
            }
            return BadRequest(new ErrorResponse("Create Fail"));*/
        }

        /// <summary>
        /// lấy tất cả request material trong db (tblUsedMaterial)
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("[action]")]
        [Authorize(Roles = "Worker, Staff")]
        public async Task<IActionResult> GetAllRequestMaterial()
        {
            var result = await _materialService.GetAllRequestMaterial();
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
        [Authorize(Roles = "Worker, Staff")]
        public async Task<IActionResult> GetAllMaterialByRequestDetailID(int id)
        {
            if (id == 0)
            {
                return BadRequest(new ErrorResponse("Please enter id"));
            }

            var result = await _materialService.GetAllMaterialByRequestDetailID(id);
            if (result != null)
            {
                return Ok(result);
            }
            return NotFound(new ErrorResponse("No Record"));
            /*return Ok(result);*/
        }

        /// <summary>
        /// lấy tất cả request material trong db (tblUsedMaterial) dựa theo request service id
        /// </summary>
        /// <param name="id">cần request service id</param>
        /// <returns></returns>
        [HttpGet]
        [Route("[action]")]
        [Authorize(Roles = "Worker, Staff")]
        public async Task<IActionResult> GetAllMaterialByServiceRequestID(int id)
        {
            if (id == 0)
            {
                return BadRequest(new ErrorResponse("Please enter id"));
            }

            return Ok(await _materialService.GetAllMaterialByServiceRequestID(id));
            /*var result = await _materialReposiory.GetAllMaterialByServiceRequestID(id);
            *//*if (result != null)
            {
                return Ok(result);
            }
            return NotFound(new ErrorResponse("No Record"));*//*
            return Ok(result);*/
        }

        /// <summary>
        /// lấy danh sách vật liệu có trong db
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("[action]")]
        [Authorize(Roles = "Worker")]
        public async Task<IActionResult> GetAllMaterial()
        {
            var rs = await _materialService.GetAllMaterial();
            if (rs == null)
            {
                return NotFound(new ErrorResponse("No Record"));
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
        [Authorize(Roles = "Worker, Staff")]
        public async Task<IActionResult> GetRequestMaterialByID(int id)
        {
            if (id == 0)
            {
                return BadRequest(new ErrorResponse("Please enter id"));
            }

            var res = await _materialService.GetRequestMaterialByID(id);
            if (res == null)
            {
                return NotFound(new ErrorResponse("No record"));
            }
            return Ok(res);
        }

        [HttpGet]
        [Route("[action]")]
        [Authorize(Roles = "Worker")]
        public async Task<IActionResult> GetUnitList()
        {
            var res = await _materialService.GetUnitList();

            if (res == null)
            {
                return NotFound(new ErrorResponse("No record"));
            }
            return Ok(res);
        }

        /// <summary>
        /// update status của request vật liệu, cần chuyền tham số id, status (approve, deny)
        /// </summary>
        /// <param name="id">id của request vật liệu</param>
        /// <param name="status">approve (3) hoặc deny (1)</param>
        /// <returns></returns>
        [HttpPut]
        [Route("[action]")]
        [Authorize(Roles = "Staff")]
        public async Task<IActionResult> UpdateStatusRequestMaterial(int id, int status)
        {
            /*if (id == 0)
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
            return BadRequest(new ErrorResponse("Update Fail"));*/
            var res = await _materialService.UpdateStatusRequestMaterial(id, status);
            if (res.ErrorsMsg.First().Equals("Update Successfull"))
            {
                return Ok(res.ErrorsMsg);
            }
            else
            {
                return BadRequest(res.ErrorsMsg);
            }
        }
        
        /// <summary>
        /// update request vật liệu theo id với status approve
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpPut]
        [Route("[action]")]
        [Authorize(Roles = "Staff")]
        public async Task<IActionResult> ApproveRequestMaterial(int id)
        {
            /*if (id == 0)
            {
                return BadRequest(new ErrorResponse("Please enter id"));
            }

            var result = await _materialReposiory.ApproveRequestMaterial(id);
            if (result)
            {
                return Ok("Update Successfull");
            }
            return BadRequest(new ErrorResponse("Update Fail"));*/
            var res = await _materialService.ApproveRequestMaterial(id);
            if (res.ErrorsMsg.First().Equals("Update Successfull"))
            {
                return Ok(res.ErrorsMsg);
            }
            else
            {
                return BadRequest(res.ErrorsMsg);
            }
        }

        /// <summary>
        /// update request vật liệu theo id với status deny, message với lý do tại sao deny
        /// </summary>
        /// <param name="id"></param>
        /// <param name="message"></param>
        /// <returns></returns>
        [HttpPut]
        [Route("[action]")]
        [Authorize(Roles = "Staff")]
        public async Task<IActionResult> DenyRequestMaterial(int id, string message)
        {
            /*if (id == 0)
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
            return BadRequest(new ErrorResponse("Update Fail"));*/
            var res = await _materialService.DenyRequestMaterial(id, message);
            if (res.ErrorsMsg.First().Equals("Update Successfull"))
            {
                return Ok(res.ErrorsMsg);
            }
            else
            {
                return BadRequest(res.ErrorsMsg);
            }
        }

        /// <summary>
        /// update số lượng vật liệu của request theo id, message thông báo cập nhật lại số lượng, status approve
        /// </summary>
        /// <param name="id">usermaterialid</param>
        /// <param name="quantityNew">số lượng mới</param>
        /// <param name="message"></param>
        /// <returns></returns>
        [HttpPut]
        [Route("[action]")]
        [Authorize(Roles = "Staff")]
        public async Task<IActionResult> UpdateRequestMaterial(int id, int quantityNew, string message)
        {
            /*if (id == 0)
            {
                return BadRequest(new ErrorResponse("Please enter id"));
            }

            if (quantityNew == 0)
            {
                return BadRequest(new ErrorResponse("Please enter quantityNew > 0"));
            }

            if (message == null)
            {
                return BadRequest(new ErrorResponse("Please enter the reason that you deny this request"));
            }

            var result = await _materialReposiory.UpdateRequestMaterial(id, quantityNew, message);
            if (result)
            {
                return Ok("Update Successfull");
            }
            return BadRequest(new ErrorResponse("Update Fail"));*/
            var res = await _materialService.UpdateRequestMaterial(id, quantityNew, message);
            if (res.ErrorsMsg.First().Equals("Update Successfull"))
            {
                return Ok(res.ErrorsMsg);
            }
            else
            {
                return BadRequest(res.ErrorsMsg);
            }
        }

        /// <summary>
        /// cancel yêu cầu vật liệu
        /// </summary>
        /// <param name="id">usermaterialid</param>
        /// <returns></returns>
        [HttpPut]
        [Route("[action]")]
        [Authorize(Roles = "Worker")]
        public async Task<IActionResult> CancelRequestMaterial(int id)
        {
            /*if (id == 0)
            {
                return BadRequest(new ErrorResponse("Please enter id"));
            }
            
            var res = await _materialReposiory.UpdateStatusRequestMaterial(id, 8);
            if (res)
            {
                return Ok("Cancel Successfull");
            }
            return BadRequest(new ErrorResponse("Cancel Fail"));*/
            var res = await _materialService.CancelRequestMaterial(id);
            if (res.ErrorsMsg.First().Equals("Cancel Successfull"))
            {
                return Ok(res.ErrorsMsg);
            }
            else
            {
                return BadRequest(res.ErrorsMsg);
            }
        }

    }
}
