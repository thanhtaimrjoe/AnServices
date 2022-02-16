using AnService_Capstone.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AnService_Capstone.Core.Interfaces
{
    public interface IContractRepository
    {
        public Task<IEnumerable<TblContract>> GetContractListByUserID(int id);

        public Task<bool> UpdateStatusContract(int id, int status);

        public Task<bool> ApproveContract(int id);

        public Task<bool> DenyContract(int id);

        public Task<bool> RequestUpdateContract(int id);

        public Task<bool> CreateContract(int id, string name, string url, int requestID);

        public Task<TblContract> CheckContractExist(int requestID);

        public Task<bool> UpdateContractURL(string url, int contractID);
    }
}
