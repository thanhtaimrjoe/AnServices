using AnService_Capstone.Core.Interfaces;
using AnService_Capstone.Core.Interfaces.Services;
using AnService_Capstone.Core.Models.Response;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace AnService_Capstone.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RepairDetailController : ControllerBase
    {
        /*private readonly IRepairDetail _repairDetail;*/
        private readonly IRepairDetailService _repairDetailService;

        public RepairDetailController(IRepairDetailService repairDetailService)
        {
            _repairDetailService = repairDetailService;
        }

        /*/// <summary>
        /// update lại status của repair detail (customer dùng khi kiểm tra kết quả khi worker sửa xong), 
        /// status approve có sắn, ngày kết thúc công việc tự gán ngày hiện tại
        /// </summary>
        /// <param name="id">id của repaird detail</param>
        /// <returns></returns>
        [HttpPut]
        [Route("[action]")]
        public async Task<IActionResult> ConfirmResult(int id)
        {
            if (id == 0)
            {
                return BadRequest(new ErrorResponse("Please enter id"));
            }
            var repairList = await _repairDetail.GetRepairDetailByRequestDetailID(id);
            if (repairList == null)
            {
                return NotFound(new ErrorResponse("No record to update"));
            }
            var res = await _repairDetail.UpdateStatusRepairApproveByID(repairList);
            if (!res)
            {
                return BadRequest(new ErrorResponse("Something wrong"));
            }
            return Ok("Update Successful");
        }*/

        /// <summary>
        /// lấy danh sách việc đã giao cho worker bằng id dịch vụ (request detail) của customer
        /// </summary>
        /// <param name="requestServiceId"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("[action]")]
        [Authorize(Roles = "Staff, Worker")]
        public async Task<IActionResult> GetRepairDetailByServiceRequestID(int requestServiceId)
        {
            if (requestServiceId == 0)
            {
                return BadRequest(new ErrorResponse("Please enter requestServiceId"));
            }
            var res = await _repairDetailService.GetRepairDetailByServiceRequestID(requestServiceId);
            /*if (res == null)
            {
                return NotFound(new ErrorResponse("No Record"));
            }*/
            return Ok(res);
        }
    }
}
