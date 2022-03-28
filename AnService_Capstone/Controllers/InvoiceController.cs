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
    public class InvoiceController : ControllerBase
    {
        private readonly IInvoiceRepository _invoice;
        private readonly IServiceRepository _serviceRepository;
        private readonly IContractRepository _contactRepository;
        private readonly IPromotionRepository _promotionRepository;

        public InvoiceController(IInvoiceRepository invoice, IServiceRepository serviceRepository, IContractRepository contactRepository, IPromotionRepository promotionRepository)
        {
            _invoice = invoice;
            _serviceRepository = serviceRepository;
            _contactRepository = contactRepository;
            _promotionRepository = promotionRepository;
        }

        /// <summary>
        /// tạo hóa đơn theo request service id
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        [Route("[action]")]
        public async Task<IActionResult> CreateInvoice(CreateInvoice invoice)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            /*if (serviceRequestID == 0)
            {
                return BadRequest(new ErrorResponse("Please enter serviceRequestID"));
            }

            if (contractID == 0)
            {
                return BadRequest(new ErrorResponse("Please enter contractID"));
            }*/

            /*if (totalPrice == 0)
            {
                return BadRequest(new ErrorResponse("Please enter totalPrice"));
            }*/

            double totalPrice = 0;

            var check = await _invoice.CheckInvoiceExist(invoice.ContractID);

            if(check != null)
            {
                return BadRequest("Duplicate Invoice");
            }

            var detail = await _serviceRepository.GetAllServiceRequestDetailsByServiceRequestID(invoice.ServiceRequestID);

            foreach (var item in detail)
            {
                if (item.RequestDetailStatus == 11)
                {
                    totalPrice += (double)item.RequestDetailPrice;
                }
            }

            var promotionObj = await _promotionRepository.GetInformationPromotionByID(invoice.PromotionID);
            var contact = await _contactRepository.GetContractByServiceRequestID(invoice.ServiceRequestID);

            double deposit = (double)(contact.ContractTotalPrice * contact.ContractDeposit);
            double vat = totalPrice * 0.1;
            double promotion = totalPrice * (double)promotionObj.PromotionValue;

            totalPrice = totalPrice - deposit - promotion + vat;

            /*foreach (var price in invoice.RequestDetails)
            {
                totalPrice += price.Price;
            }*/

            var res = await _invoice.CreateInvoice(invoice.ServiceRequestID, invoice.ContractID, invoice.PromotionID, totalPrice);
            if (res)
            {
                _ = await _serviceRepository.UpdateStatusServiceRequest(invoice.ServiceRequestID, 14);
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
