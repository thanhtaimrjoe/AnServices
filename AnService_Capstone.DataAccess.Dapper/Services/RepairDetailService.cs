using AnService_Capstone.Core.Entities;
using AnService_Capstone.Core.Interfaces;
using AnService_Capstone.Core.Interfaces.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AnService_Capstone.DataAccess.Dapper.Services
{
    public class RepairDetailService : IRepairDetailService
    {
        private readonly IRepairDetail _repairDetail;
        public RepairDetailService(IRepairDetail repairDetail)
        {
            _repairDetail = repairDetail;
        }

        public async Task<IEnumerable<TblRepairDetail>> GetRepairDetailByServiceRequestID(int requestServiceId)
        {
            var res = await _repairDetail.GetRepairDetailByServiceRequestID(requestServiceId);
            return res;
        }
    }
}
