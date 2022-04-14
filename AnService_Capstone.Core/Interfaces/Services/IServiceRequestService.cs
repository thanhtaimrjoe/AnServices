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
    public interface IServiceRequestService
    {
        public Task<int> CountSatisfiedRequestDetail();

        public Task<int> CountUnsatisfiedRequestDetail();

        public Task<int> CountReworkRequestDetail();

        public Task<ErrorResponse> CreateServiceRequest(CreateService model);

        public Task<ErrorResponse> AssignWorkerToRequest(AssignJob job);

        public Task<ErrorResponse> CancelServiceRequestForCustomer(int id);

        public Task<ErrorResponse> CancelServiceRequestForStaff(int id);

        public Task<ErrorResponse> UpdateStatusServiceRequestDetail(int id, int status);

        public Task<ErrorResponse> CompleteServiceRequest(int serviceRequestID);

        public Task<ErrorResponse> SurveyingServiceRequest(int serviceRequestID);

        public Task<ErrorResponse> ReworkRequestDetail(int serviceRequestID);

        public Task<ErrorResponse> RemoveListServiceRequest(IEnumerable<int> requestServiceID);

        public Task<TblServiceRequest> GetServiceRequestByID(int id);

        public Task<IEnumerable<TblService>> GetServiceByName(string name);

        public Task<IEnumerable<TblService>> GetAllService();

        public Task<IEnumerable<TblRequestDetail>> GetAllServiceRequestDetailsByServiceRequestID(int id);

        public Task<IEnumerable<TblRequestDetail>> GetAllServiceRequestDetailsByServiceRequestIDAndWorkerID(int requestID, int workerID);

        public Task<IEnumerable<TblServiceRequest>> GetServiceRequestByUserIDAndStatus(int id, int status);

        public Task<IEnumerable<TblServiceRequest>> GetAllServiceRequestByUserID(int id);

        public Task<IEnumerable<TblServiceRequest>> GetAllServiceRequestByWorkerID(int id, int status);

        public Task<IEnumerable<TblServiceRequest>> GetAllServiceRequestStatusOrDate(int ServiceRequestStatus, string ServiceRequestCreateDate);
    }
}
