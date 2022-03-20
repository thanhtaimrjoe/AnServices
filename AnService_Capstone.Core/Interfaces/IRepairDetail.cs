using AnService_Capstone.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AnService_Capstone.Core.Interfaces
{
    public interface IRepairDetail
    {
        public Task<IEnumerable<TblRepairDetail>> GetRepairDetailByServiceRequestID(int id);
        public Task<bool> UpdateStatusRepairApproveByID(IEnumerable<TblRepairDetail> listRepair);
        public Task<bool> CheckRepairDetailExist(int requestDetailID, int workerID);
    }
}
