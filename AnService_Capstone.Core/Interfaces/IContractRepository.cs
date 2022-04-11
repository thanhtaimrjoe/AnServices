using AnService_Capstone.Core.Entities;
using AnService_Capstone.Core.Models.Request;
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

        public Task<IEnumerable<TblContract>> GetContractList(int quarter, int year);

        public Task<bool> UpdateStatusContract(int id, int status);

        /*public Task<bool> ApproveContract(int id);*/

        /*public Task<bool> DenyContract(int id);*/

        /*public Task<bool> RequestUpdateContract(int id);*/

        public Task<bool> CreateContract(CreateContract contract);

        public Task<TblContract> CheckContractExist(int requestID);

        public Task<bool> UpdateContract(CreateContract contract, int contractID);

        public Task<TblContract> GetContractByServiceRequestID(int id);

        public Task<TblContract> GetContractByID(int id);
    }
}
