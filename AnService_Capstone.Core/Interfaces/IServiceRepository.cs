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
        public Task<int> CreateServiceRequest(CreateService model);

        public Task<TblService> GetServiceByID(int id);

        public Task<bool> CreateRequestDetai(int requestID, int serviceID);

        public Task<bool> CreateMedia(int requestID, string url);

        /*public Task<IEnumerable<TblRequestService>> GetAllRequestService();*/

        public Task<IEnumerable<TblServiceRequest>> GetAllServiceRequest();

        public Task<TblServiceRequest> GetServiceRequestByID(int id);

        public Task<IEnumerable<TblServiceRequest>> GetAllServiceRequestByUserID(int id);

        public Task<bool> CheckServiceRequestByUserIDOfTheDay(int id);

        public Task<IEnumerable<TblService>> GetAllService();

        public Task<IEnumerable<TblService>> GetServiceByName(string name);

        public Task<bool> AssignWorkerToRequest(int RequestDetailId, int workerID, int status, int priority);

        public Task<IEnumerable<TblServiceRequest>> GetAllServiceRequestByWorkerID(int id, int status);

        /*public Task<IEnumerable<TblServiceRequest>> GetAllServiceRequestByWorkerIDAndStatus(int id, IEnumerable<int> status);*/

        /*public Task<IEnumerable<RequestServiceDetailViewModel>> GetRequestServiceDetailsByRequestServiceID(int id);*/

        public Task<IEnumerable<TblRequestDetail>> GetAllServiceRequestDetailsByServiceRequestID(int id);

        public Task<IEnumerable<TblRequestDetail>> GetAllInformationServiceRequestDetailsByServiceRequestID(int id);

        public Task<IEnumerable<TblServiceRequest>> GetServiceRequestByUserIDAndStatus(int user, int status);

        public Task<IEnumerable<TblServiceRequest>> GetAllServiceRequestByStatus(int status);

        public Task<IEnumerable<TblServiceRequest>> GetAllServiceRequestByDate(string date);

        public Task<IEnumerable<TblServiceRequest>> GetAllServiceRequestByDateAndStatus(string date, int status);

        /*public Task<IEnumerable<RequestServiceDetailViewModel>> GetRequestServiceDetailsByRequestServiceIDAndWorkerID(int request, int worker);*/

        public Task<IEnumerable<TblRequestDetail>> GetAllServiceRequestDetailsByServiceRequestIDAndWorkerID(int request, int worker);

        /*public Task<bool> CancelRequestServiceByIDForCustomer(int id);*/

        /*public Task<bool> CancelRequestServiceByIDForStaff(int id);*/

        public Task<bool> UpdateStatusServiceRequestDetail(int id, int status);

        public Task<bool> UpdatePriceServiceRequestDetail(int id, float price);

        public Task<bool> UpdateStatusServiceRequest(int id, int status);

        public Task<TblRequestDetail> GetRequestDetailByID(int id);

        public void BackgroundServiceTask();

        public Task<int> CountRequestServiceDetail(int status);

        /*public Task<int> CountServiceRequest(int status);*/

        public Task<IEnumerable<Dashboard.AmountOfSalesInYear>> AmountOfSaleList(int year, int status);

        /*public Task<IEnumerable<int>> AmountOfSaleList2(int year, int status);*/

        public Task<IEnumerable<Dashboard.AmountOfSalesInYear>> SumRevenueByYear(int year);

        public Task<Dashboard.ServiceStatusStatistic> CountServiceStatus();

        public Task<IEnumerable<Dashboard.WorkerTask>> CountTaskOfWorker();

        /*public Task<IEnumerable<TblRequestDetail>> GetAllRequestDetail();*/
    }
}
