using AnService_Capstone.Core.Interfaces;
using AnService_Capstone.Core.Models.Response;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace AnService_Capstone.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InvoiceController : ControllerBase
    {
        private readonly IInvoiceRepository _invoice;
        private readonly IServiceRepository _serviceRepository;

        public InvoiceController(IInvoiceRepository invoice, IServiceRepository serviceRepository)
        {
            _invoice = invoice;
            _serviceRepository = serviceRepository;
        }

        /// <summary>
        /// tạo hóa đơn theo request service id
        /// </summary>
        /// <param name="serviceRequestID">request service id</param>
        /// <param name="contractID"></param>
        /// <param name="totalPrice">tổng giá tiền</param>
        /// <returns></returns>
        [HttpPost]
        [Route("[action]")]
        public async Task<IActionResult> CreateInvoice(int serviceRequestID, int contractID, double totalPrice)
        {
            if (serviceRequestID == 0)
            {
                return BadRequest(new ErrorResponse("Please enter serviceRequestID"));
            }

            if (contractID == 0)
            {
                return BadRequest(new ErrorResponse("Please enter contractID"));
            }

            /*if (totalPrice == 0)
            {
                return BadRequest(new ErrorResponse("Please enter totalPrice"));
            }*/

            var res = await _invoice.CreateInvoice(serviceRequestID, contractID, totalPrice);
            if (res)
            {
                _ = await _serviceRepository.UpdateStatusServiceRequest(serviceRequestID, 14);
                return Ok("Create Successful");
            }
            return BadRequest("Create Fail");
        }

        [HttpGet]
        [Route("[action]")]
        public async Task<IActionResult> GetInfomationInvoiceByServiceRequestID(int serviceRequestID)
        {
            if (serviceRequestID == 0)
            {
                return BadRequest(new ErrorResponse("Please enter serviceRequestID"));
            }

            var res = await _invoice.GetInfomationInvoiceByServiceRequestID(serviceRequestID);
            if (res == null)
            {
                return NotFound("No record");
            }
            return Ok(res);
        }
    }
}
