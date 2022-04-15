using AnService_Capstone.Core.Entities;
using AnService_Capstone.Core.Models.Request;
using AnService_Capstone.Core.Models.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AnService_Capstone.Core.Interfaces.Services
{
    public interface IContractService
    {
        public Task<IEnumerable<TblContract>> GetContractListByUserID(int id);

        public Task<TblContract> GetContractByServiceRequestID(int requestServiceId);

        public Task<ErrorResponse> ApproveContract(int id);

        public Task<ErrorResponse> DenyContract(int id);

        public Task<ErrorResponse> RequestUpdateContract(int id);

        public Task<ErrorResponse> CreateContract(CreateContract contract);
    }
}
