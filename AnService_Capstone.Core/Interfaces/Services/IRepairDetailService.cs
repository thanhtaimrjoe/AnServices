using AnService_Capstone.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AnService_Capstone.Core.Interfaces.Services
{
    public interface IRepairDetailService
    {
        public Task<IEnumerable<TblRepairDetail>> GetRepairDetailByServiceRequestID(int requestServiceId);
    }
}
