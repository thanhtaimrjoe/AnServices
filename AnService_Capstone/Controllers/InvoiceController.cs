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

        /*/// <summary>
        /// tạo hóa đơn theo request service id
        /// </summary>
        /// <param name="id">request service id</param>
        /// <returns></returns>
        [HttpPost]
        [Route("[action]")]
        public async Task<IActionResult> CreateInvoice(int id)
        {
            if (id == 0)
            {
                return BadRequest(new ErrorResponse("Please enter id"));
            }

            float total = 0;

            var check = await _invoice.CheckInvoiceExist(id);
            if (check != null)
            {
                return BadRequest(new ErrorResponse("Invoice is exist"));
            }

            var serviceList = await _serviceRepository.GetRequestServiceDetailsByRequestServiceID(id);

            foreach (var service in serviceList)
            {
                total += (float) service.Service.ServicePrice;
            }

            var res = await _invoice.CreateInvoice(id, total);
            if (res)
            {
                return Ok("Create Successful");
            }
            return BadRequest(new ErrorResponse("Create Fail"));
        }*/
    }
}
