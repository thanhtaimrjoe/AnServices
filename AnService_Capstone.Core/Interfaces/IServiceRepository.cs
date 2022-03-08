using AnService_Capstone.Core.Entities;
using AnService_Capstone.Core.Models.Request;
using AnService_Capstone.Core.Models.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AnService_Capstone.Core.Interfaces
{
    public interface IServiceRepository
    {
        public Task<int> CreateRequestService(CreateService model);

        public Task<TblService> GetServiceByID(int id);

        public Task<bool> CreateRequestDetai(int requestID, int serviceID);

        public Task<bool> CreateMedia(int requestID, string url);

        /*public Task<IEnumerable<TblRequestService>> GetAllRequestService();*/

        public Task<IEnumerable<RequestService>> GetAllRequestService();

        public Task<RequestService> GetRequestServiceByID(int id);

        public Task<IEnumerable<RequestService>> GetAllRequestServiceByUserID(int id);

        public Task<bool> CheckRequestServiceByUserIDOfTheDay(int id);

        public Task<IEnumerable<TblService>> GetAllService();

        public Task<IEnumerable<TblService>> GetServiceByName(string name);

        public Task<bool> AssignWorkerToRequest(int RequestDetailId, int workerID, int status, int priority);

        public Task<IEnumerable<RequestService>> GetAllRequestServiceByWorkerID(int id);

        /*public Task<IEnumerable<RequestServiceDetailViewModel>> GetRequestServiceDetailsByRequestServiceID(int id);*/

        public Task<IEnumerable<TblRequestDetail>> GetAllRequestServiceDetailsByRequestServiceID(int id);

        public Task<IEnumerable<RequestService>> GetAllServiceByStatusAndUserID(int user, int status);

        public Task<IEnumerable<RequestService>> GetAllServiceByStatus(int status);

        public Task<IEnumerable<RequestService>> GetAllServiceByDate(DateTime? date);

        public Task<IEnumerable<RequestService>> GetAllServiceByDateAndStatus(DateTime? date, int status);

        /*public Task<IEnumerable<RequestServiceDetailViewModel>> GetRequestServiceDetailsByRequestServiceIDAndWorkerID(int request, int worker);*/

        public Task<IEnumerable<TblRequestDetail>> GetAllRequestServiceDetailsByRequestServiceIDAndWorkerID(int request, int worker);

        /*public Task<bool> CancelRequestServiceByIDForCustomer(int id);*/

        /*public Task<bool> CancelRequestServiceByIDForStaff(int id);*/

        public Task<bool> UpdateStatusRequestServiceDetail(int id, int status);

        public Task<bool> UpdatePriceRequestServiceDetail(int id, float price);

        public Task<bool> UpdateStatusRequestService(int id, int status);

        public Task<TblRequestDetail> GetRequestDetailByID(int id);

    }
}
