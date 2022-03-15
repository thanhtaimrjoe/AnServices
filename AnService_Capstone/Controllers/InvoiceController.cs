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
        /// <param name="id">request service id</param>
        /// <param name="totalPrice">tổng giá tiền</param>
        /// <returns></returns>
        [HttpPost]
        [Route("[action]")]
        public async Task<IActionResult> CreateInvoice(int id, double totalPrice)
        {
            if (id == 0)
            {
                return BadRequest(new ErrorResponse("Please enter id"));
            }

            /*if (totalPrice == 0)
            {
                return BadRequest(new ErrorResponse("Please enter totalPrice"));
            }*/

            var res = await _invoice.CreateInvoice(id, totalPrice);
            if (res)
            {
                _ = await _serviceRepository.UpdateStatusRequestService(id, 9);
                return Ok("Create Successful");
            }
            return BadRequest("Create Fail");
        }

        [HttpGet]
        [Route("[action]")]
        public async Task<IActionResult> GetInfomationInvoiceByRequestServiceID(int requestServiceID)
        {
            if (requestServiceID == 0)
            {
                return BadRequest(new ErrorResponse("Please enter requestServiceID"));
            }

            var res = await _invoice.GetInfomationInvoiceByRequestServiceID(requestServiceID);
            if (res == null)
            {
                return NotFound("No record");
            }
            return Ok(res);
        }
    }
}
