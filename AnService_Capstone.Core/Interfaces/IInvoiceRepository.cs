using AnService_Capstone.Core.Entities;
using AnService_Capstone.Core.Models.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AnService_Capstone.Core.Interfaces
{
    public interface IInvoiceRepository
    {
        public Task<bool> CreateInvoice(int id, int contractID, double total);

        public Task<TblInvoice> CheckInvoiceExist(int id);

        public Task<ContractViewModel> GetInfomationInvoiceByServiceRequestID(int id);
    }
}
