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
    public class ReportController : ControllerBase
    {
        /*private readonly IReport _report;
        private readonly IServiceRepository _serviceRepository;*/
        private readonly IReportService _reportService;
        /*public ReportController(IReport report, IServiceRepository serviceRepository, IReportService reportService)
        {
            _report = report;
            _serviceRepository = serviceRepository;
            _reportService = reportService;
        }*/
        public ReportController(IReportService reportService)
        {
            _reportService = reportService;
        }

        /// <summary>
        /// worker tạo report khi sửa xong hoặc có lỗi mới trong quá trình sửa
        /// </summary>
        /// <param name="model">bao gồm request detail id, worker id, description, img hoặc video url</param>
        /// <returns></returns>
        [HttpPost]
        [Route("[action]")]
        [Authorize(Roles = "Worker")]
        public async Task<IActionResult> CreateReport([FromBody] CreateReport model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            var res = await _reportService.CreateReport(model);
            if (res.ErrorsMsg.First().Equals("Create Successfull"))
            {
                return Ok(res.ErrorsMsg);
            }
            else
            {
                return BadRequest(res.ErrorsMsg);
            }
            /*bool media = false;

            var reqService = await _report.CreateReport(model);
            
            foreach (var mediaItem in model.MediaList)
            {
                media = await _report.CreateMedia(reqService, mediaItem);
            }

            if (media)
            {
                if (model.ReportTitle.Equals("Báo cáo hoàn thành"))
                {
                    _ = await _serviceRepository.UpdateStatusServiceRequestDetail(model.RequestDetailID, 9);
                }
                return Ok("Create Successfull");
            }
            return BadRequest(new ErrorResponse("Create Fail"));*/
        }

        /// <summary>
        /// lấy tất cả report theo worker id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("[action]")]
        [Authorize(Roles = "Staff, Worker")]
        public async Task<IActionResult> GetAllReportByRequestDetailID(int id)
        {
            if (id == 0)
            {
                return BadRequest(new ErrorResponse("Please enter id"));
            }

            var res = await _reportService.GetAllReportByRequestDetailID(id);

            if(res != null)
            {
                return Ok(res);
            }
            return NotFound(new ErrorResponse("No record"));
        }

        /// <summary>
        /// lấy tất cả report theo request service id
        /// </summary>
        /// <param name="ServiceRequestId"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("[action]")]
        [Authorize(Roles = "Staff, Worker")]
        public async Task<IActionResult> GetAllReportByServiceRequestID(int ServiceRequestId)
        {
            if (ServiceRequestId == 0)
            {
                return BadRequest(new ErrorResponse("Please enter ServiceRequestId"));
            }

            var res = await _reportService.GetAllReportByServiceRequestID(ServiceRequestId);
            return Ok(res);
        }
    }
}
