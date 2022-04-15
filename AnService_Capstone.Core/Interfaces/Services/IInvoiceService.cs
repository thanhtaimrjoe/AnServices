using AnService_Capstone.Core.Models.Request;
using AnService_Capstone.Core.Models.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AnService_Capstone.Core.Interfaces.Services
{
    public interface IInvoiceService
    {
        public Task<ErrorResponse> CreateInvoice(CreateInvoice invoice);

        public Task<ErrorResponse> SendEmail(int serviceRequestID);

        public Task<ContractViewModel> GetInfomationInvoiceByServiceRequestID(int serviceRequestID);

        public Task<List<ContractViewModel>> GetInfomationInvoiceByServiceRequestIDForStaff(int serviceRequestID);
    }
}
