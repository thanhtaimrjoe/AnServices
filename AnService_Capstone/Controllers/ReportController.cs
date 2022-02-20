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
    public class ReportController : ControllerBase
    {
        private readonly IReport _report;
        public ReportController(IReport report)
        {
            _report = report;
        }

        /// <summary>
        /// mason tạo report khi sửa xong hoặc có lỗi mới trong quá trình sửa
        /// </summary>
        /// <param name="model">bao gồm request detail id, mason id, description, img hoặc video url</param>
        /// <returns></returns>
        [HttpPost]
        [Route("[action]")]
        public async Task<IActionResult> CreateReport([FromBody] CreateReport model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            bool media = false;

            var reqService = await _report.CreateReport(model);
            
            foreach (var mediaItem in model.MediaList)
            {
                media = await _report.CreateMedia(reqService, mediaItem);
            }

            if (media)
            {
                return Ok("Create Successfull");
            }
            return BadRequest(new ErrorResponse("Create Fail"));
        }

        /// <summary>
        /// lấy tất cả report theo mason id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("[action]")]
        public async Task<IActionResult> GetAllReportByMasonID(int id)
        {
            if (id == 0)
            {
                return BadRequest(new ErrorResponse("Please enter id"));
            }

            var res = await _report.GetAllReportByMasonID(id);

            if(res != null)
            {
                return Ok(res);
            }
            return NotFound(new ErrorResponse("No record"));
        }

        /// <summary>
        /// lấy tất cả report theo request service id
        /// </summary>
        /// <param name="RequestServiceId"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("[action]")]
        public async Task<IActionResult> GetAllReportByRequestServiceID(int RequestServiceId)
        {
            if (RequestServiceId == 0)
            {
                return BadRequest(new ErrorResponse("Please enter RequestServiceId"));
            }

            var res = await _report.GetAllReportByRequestServiceID(RequestServiceId);
            return Ok(res);
        }
    }
}
