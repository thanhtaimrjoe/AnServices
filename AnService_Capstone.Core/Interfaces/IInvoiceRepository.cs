using AnService_Capstone.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AnService_Capstone.Core.Interfaces
{
    public interface IInvoiceRepository
    {
        public Task<bool> CreateInvoice(int id, float total);

        public Task<TblInvoice> CheckInvoiceExist(int id);
    }
}
