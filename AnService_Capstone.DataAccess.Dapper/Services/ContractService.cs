using AnService_Capstone.Core.Entities;
using AnService_Capstone.Core.Interfaces;
using AnService_Capstone.Core.Interfaces.Services;
using AnService_Capstone.Core.Models.Request;
using AnService_Capstone.Core.Models.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AnService_Capstone.DataAccess.Dapper.Services
{
    public class ContractService : IContractService
    {
        private readonly IContractRepository _contractRepository;
        private readonly IServiceRepository _serviceRepository;
        public ContractService(IContractRepository contractRepository, IServiceRepository serviceRepository)
        {
            _contractRepository = contractRepository;
            _serviceRepository = serviceRepository;
        }

        public async Task<ErrorResponse> ApproveContract(int id)
        {
            if (id == 0)
            {
                return new ErrorResponse("Please enter id");
            }

            var res = await _contractRepository.UpdateStatusContract(id, 3);
            if (res)
            {
                var contract = await _contractRepository.GetContractByID(id);
                var service = await _serviceRepository.GetServiceRequestByID(contract.ServiceRequestId);
                _ = await _serviceRepository.UpdateStatusServiceRequest(contract.ServiceRequestId, 3);
                /*_ = await _promotionRepository.UpdateStatusPromotion((int)service.PromotionId);*/
                return new ErrorResponse("Update successfull");
            }
            return new ErrorResponse("Update fail");
        }

        public async Task<ErrorResponse> CreateContract(CreateContract contract)
        {
            foreach (var updateDetail in contract.updatePriceRequestDetails)
            {
                _ = await _serviceRepository.UpdatePriceServiceRequestDetail(updateDetail.RequestDetailID, updateDetail.RequestDetailPrice);
            }

            var check = await _contractRepository.CheckContractExist(contract.RequestId);

            if (check != null)
            {
                var res2 = await _contractRepository.UpdateContract(contract, check.ContractId);
                _ = await _contractRepository.UpdateStatusContract(check.ContractId, 2);
                /*foreach (var updateDetail in contract.updatePriceRequestDetails)
                {
                    _ = await _serviceRepository.UpdatePriceServiceRequestDetail(updateDetail.RequestDetailID, updateDetail.RequestDetailPrice);
                }*/
                if (res2)
                {
                    return new ErrorResponse("Create successfull");
                }
                return new ErrorResponse("Create fail");
            }

            var res = await _contractRepository.CreateContract(contract);
            /*foreach (var updateDetail in contract.updatePriceRequestDetails)
            {
                _ = await _serviceRepository.UpdatePriceServiceRequestDetail(updateDetail.RequestDetailID, updateDetail.RequestDetailPrice);
            }*/

            if (res)
            {
                return new ErrorResponse("Create successfull");
            }
            return new ErrorResponse("Create fail");
        }

        public async Task<ErrorResponse> DenyContract(int id)
        {
            if (id == 0)
            {
                return new ErrorResponse("Please enter id");
            }

            var res = await _contractRepository.UpdateStatusContract(id, 1);
            if (res)
            {
                return new ErrorResponse("Update successfull");
            }
            return new ErrorResponse("Update fail");
        }

        public async Task<TblContract> GetContractByServiceRequestID(int requestServiceId)
        {
            var res = await _contractRepository.GetContractByServiceRequestID(requestServiceId);
            return res;
        }

        public async Task<IEnumerable<TblContract>> GetContractListByUserID(int id)
        {
            var res = await _contractRepository.GetContractListByUserID(id);
            return res;
        }

        public async Task<ErrorResponse> RequestUpdateContract(int id)
        {
            if (id == 0)
            {
                return new ErrorResponse("Please enter id");
            }

            var res = await _contractRepository.UpdateStatusContract(id, 7);
            if (res)
            {
                return new ErrorResponse("Update successfull");
            }
            return new ErrorResponse("Update fail");
        }
    }
}
