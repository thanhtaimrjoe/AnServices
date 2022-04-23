using AnService_Capstone.Core.Entities;
using AnService_Capstone.Core.Interfaces;
using AnService_Capstone.Core.Interfaces.Services;
using AnService_Capstone.Core.Models.Request;
using AnService_Capstone.Core.Models.Response;
using AnService_Capstone.DataAccess.Dapper.Customize;
using AnService_Capstone.DataAccess.Dapper.Services.SendSMS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AnService_Capstone.DataAccess.Dapper.Services
{
    public class ServiceRequestService : IServiceRequestService
    {
        private readonly IServiceRepository _serviceRepository;
        private readonly TwilioService _twilioService;
        private readonly IUserRepository _userRepository;
        private readonly UtilHelper _utilHelper;
        private readonly IPromotionRepository _promotionRepository;
        private readonly IRepairDetail _repariRepository;

        public ServiceRequestService(IServiceRepository serviceRepository, TwilioService twilioService, IUserRepository userRepository,
            UtilHelper utilHelper, IPromotionRepository promotionRepository, IRepairDetail repariRepository)
        {
            _serviceRepository = serviceRepository;
            _twilioService = twilioService;
            _userRepository = userRepository;
            _utilHelper = utilHelper;
            _promotionRepository = promotionRepository;
            _repariRepository = repariRepository;
        }

        public async Task<ErrorResponse> AssignWorkerToRequest(AssignJob job)
        {
            bool chechExist = false;
            bool res = false;

            chechExist = await _repariRepository.CheckRepairDetailExist(job.RequestDetailId, job.MainWorker);
            var detail = await _serviceRepository.GetRequestDetailByID(job.RequestDetailId);

            if (chechExist)
            {
                res = await _serviceRepository.AssignWorkerToRequest(job.RequestDetailId, job.MainWorker, 1, job.Priority);
            }


            if (job.WorkerList != null)
            {
                foreach (var worker in job.WorkerList)
                {
                    chechExist = await _repariRepository.CheckRepairDetailExist(job.RequestDetailId, worker);
                    if (chechExist)
                    {
                        res = await _serviceRepository.AssignWorkerToRequest(job.RequestDetailId, worker, 0, job.Priority);
                    }
                }
            }

            _ = await _serviceRepository.UpdateStatusServiceRequestDetail(job.RequestDetailId, 6);
            _ = await _serviceRepository.UpdateStatusServiceRequest(detail.ServiceRequestId, 6);
            return new ErrorResponse("Create Successfull");
        }

        public async Task<ErrorResponse> CancelServiceRequestForCustomer(int id)
        {
            if (id == 0)
            {
                return new ErrorResponse("Please enter id");
            }

            var result = await _serviceRepository.UpdateStatusServiceRequest(id, 8);
            var service = await _serviceRepository.GetServiceRequestByID(id);

            if (service.PromotionId != 0)
            {
                _ = await _promotionRepository.UpdateStatusPromotion((int)service.PromotionId, 1);
            }

            if (!result)
            {
                return new ErrorResponse("Cancel Fail");
            }
            return new ErrorResponse("Cancel Successful");
        }

        public async Task<ErrorResponse> CancelServiceRequestForStaff(int id)
        {
            if (id == 0)
            {
                return new ErrorResponse("Please enter id");
            }

            var result = await _serviceRepository.UpdateStatusServiceRequest(id, 1);
            var service = await _serviceRepository.GetServiceRequestByID(id);

            if (service.PromotionId != 0)
            {
                _ = await _promotionRepository.UpdateStatusPromotion((int)service.PromotionId, 1);
            }

            if (!result)
            {
                return new ErrorResponse("Cancel Fail");
            }
            return new ErrorResponse("Cancel Successful");
        }

        public async Task<ErrorResponse> CompleteServiceRequest(int serviceRequestID)
        {
            if (serviceRequestID == 0)
            {
                return new ErrorResponse("Please enter serviceRequestID");
            }

            var res = await _serviceRepository.UpdateStatusServiceRequest(serviceRequestID, 13);

            if (res)
            {
                return new ErrorResponse("Update Successful");
            }

            return new ErrorResponse("Update Fail");
        }

        public async Task<int> CountReworkRequestDetail()
        {
            var res = await _serviceRepository.CountRequestServiceDetail(16);
            return res;
        }

        public async Task<int> CountSatisfiedRequestDetail()
        {
            var res = await _serviceRepository.CountRequestServiceDetail(11);
            return res;
        }

        public async Task<int> CountUnsatisfiedRequestDetail()
        {
            var res = await _serviceRepository.CountRequestServiceDetail(12);
            return res;
        }

        public async Task<ErrorResponse> CreateServiceRequest(CreateService model)
        {
            bool serviceDetail = false;
            bool media = false;

            var reqService = await _serviceRepository.CreateServiceRequest(model);
            foreach (var serviceItem in model.ServiceList)
            {
                serviceDetail = await _serviceRepository.CreateRequestDetai(reqService, serviceItem);
            }
            foreach (var mediaItem in model.MediaList)
            {
                media = await _serviceRepository.CreateMedia(reqService, mediaItem);
            }
            if (serviceDetail != false && media != false)
            {
                var check = await _serviceRepository.CheckServiceRequestByUserIDOfTheDay(model.CustomerId);
                if (!check)
                {
                    var user = await _userRepository.GetCustomerByID(model.CustomerId);
                    var formatPhone = _utilHelper.FormatPhoneNumber(user.PhoneNumber);
                    _twilioService.SendSMS(formatPhone, "Tài khoản của bạn đã bị khóa vì bạn đã gửi hơn 3 yêu cầu dịch vụ. ");
                    _ = _userRepository.UpdateStatusUserByID(model.CustomerId, 10);
                    return new ErrorResponse("Your account has been banned");
                    /*return Ok("Your account has been banned");*/
                }
                if (model.PromotionID != 0)
                {
                    _ = await _promotionRepository.UpdateStatusPromotion(model.PromotionID, 0);
                }
                return new ErrorResponse("Create Successfull");
            }
            return new ErrorResponse("Create Fail");
        }

        public async Task<IEnumerable<TblService>> GetAllService()
        {
            var service = await _serviceRepository.GetAllService();
            return service;
        }

        public async Task<IEnumerable<TblServiceRequest>> GetAllServiceRequestByUserID(int id)
        {
            var service = await _serviceRepository.GetAllServiceRequestByUserID(id);
            return service;
        }

        public async Task<IEnumerable<TblServiceRequest>> GetAllServiceRequestByWorkerID(int id, int status)
        {
            var result = await _serviceRepository.GetAllServiceRequestByWorkerID(id, status);
            return result;
        }

        public async Task<IEnumerable<TblRequestDetail>> GetAllServiceRequestDetailsByServiceRequestID(int id)
        {
            /*var result = await _serviceRepository.GetAllServiceRequestDetailsByServiceRequestID(id); 
            return result;*/
            IEnumerable<TblRequestDetail> result;

            result = await _serviceRepository.GetAllInformationServiceRequestDetailsByServiceRequestID(id);

            if (result == null)
            {
                result = await _serviceRepository.GetAllServiceRequestDetailsByServiceRequestID(id);
            }
            return result;
        }

        public async Task<IEnumerable<TblRequestDetail>> GetAllServiceRequestDetailsByServiceRequestIDAndWorkerID(int requestID, int workerID)
        {
            var result = await _serviceRepository.GetAllServiceRequestDetailsByServiceRequestIDAndWorkerID(requestID, workerID);
            return result;
        }

        public async Task<IEnumerable<TblServiceRequest>> GetAllServiceRequestStatusOrDate(int ServiceRequestStatus, string ServiceRequestCreateDate)
        {
            IEnumerable<TblServiceRequest> service;

            if (ServiceRequestCreateDate != null)
            {
                ServiceRequestCreateDate = DateTime.ParseExact(ServiceRequestCreateDate, "yyyy-MM-dd",
                                           System.Globalization.CultureInfo.InvariantCulture).ToString("yyyy-MM-dd");
            }

            if (ServiceRequestStatus == 0 && ServiceRequestCreateDate == null)
            {
                service = await _serviceRepository.GetAllServiceRequest();
            }
            else if (ServiceRequestStatus != 0 && ServiceRequestCreateDate == null)
            {
                service = await _serviceRepository.GetAllServiceRequestByStatus(ServiceRequestStatus);
            }
            else if (ServiceRequestStatus == 0 && ServiceRequestCreateDate != null)
            {
                service = await _serviceRepository.GetAllServiceRequestByDate(ServiceRequestCreateDate);
            }
            else
            {
                service = await _serviceRepository.GetAllServiceRequestByDateAndStatus(ServiceRequestCreateDate, ServiceRequestStatus);
            }
            
            return service;
        }

        public async Task<IEnumerable<TblService>> GetServiceByName(string name)
        {
            var service = await _serviceRepository.GetServiceByName(name);
            return service;
        }

        public async Task<TblServiceRequest> GetServiceRequestByID(int id)
        {
            var service = await _serviceRepository.GetServiceRequestByID(id);
            return service;
        }

        public async Task<IEnumerable<TblServiceRequest>> GetServiceRequestByUserIDAndStatus(int id, int status)
        {
            var result = await _serviceRepository.GetServiceRequestByUserIDAndStatus(id, status);
            return result;
        }

        public async Task<ErrorResponse> RemoveListServiceRequest(IEnumerable<int> requestServiceID)
        {
            bool result = false;
            if (requestServiceID == null)
            {
                return new ErrorResponse("Please enter requestServiceID");
            }

            foreach (var service in requestServiceID)
            {
                result = await _serviceRepository.UpdateStatusServiceRequest(service, 5);
            }

            if (!result)
            {
                return new ErrorResponse("Cancel Fail");
            }
            return new ErrorResponse("Cancel Successful");
        }

        public async Task<ErrorResponse> ReworkRequestDetail(int requestDetailID)
        {
            if (requestDetailID == 0)
            {
                return new ErrorResponse("Please enter requestDetailID");
            }

            bool checkStatus = true;
            var res = await _serviceRepository.UpdateStatusServiceRequestDetail(requestDetailID, 16);

            if (res)
            {
                var detail = await _serviceRepository.GetRequestDetailByID(requestDetailID);

                var services = await _serviceRepository.GetAllServiceRequestDetailsByServiceRequestID(detail.ServiceRequestId);

                foreach (var serviceDetail in services)
                {
                    if (serviceDetail.RequestDetailStatus != 11 && serviceDetail.RequestDetailStatus != 16)
                    {
                        checkStatus = false;
                    }
                }

                if (checkStatus)
                {
                    _ = await _serviceRepository.UpdateStatusServiceRequest(detail.ServiceRequestId, 17);
                }
                return new ErrorResponse("Update Successful");
            }

            return new ErrorResponse("Update Fail");
        }

        public async Task<ErrorResponse> SurveyingServiceRequest(int serviceRequestID)
        {
            if (serviceRequestID == 0)
            {
                return new ErrorResponse("Please enter serviceRequestID");
            }

            var service = await _serviceRepository.GetServiceRequestByID(serviceRequestID);

            if (service.ServiceRequestStatus != 2)
            {
                return new ErrorResponse("Request has been canceled");
            }

            var res = await _serviceRepository.UpdateStatusServiceRequest(serviceRequestID, 15);

            if (res)
            {
                return new ErrorResponse("Update Successful");
            }

            return new ErrorResponse("Update Fail");
        }

        public async Task<ErrorResponse> UpdateStatusServiceRequestDetail(int id, int status)
        {
            if (id == 0)
            {
                return new ErrorResponse("Please enter id");
            }

            if (status == 0)
            {
                return new ErrorResponse("Please enter status");
            }

            bool checkStatus = true;

            var result = await _serviceRepository.UpdateStatusServiceRequestDetail(id, status);

            if (result)
            {
                var detail = await _serviceRepository.GetRequestDetailByID(id);

                var services = await _serviceRepository.GetAllServiceRequestDetailsByServiceRequestID(detail.ServiceRequestId);

                foreach (var serviceDetail in services)
                {
                    if (serviceDetail.RequestDetailStatus != 11 && serviceDetail.RequestDetailStatus != 16)
                    {
                        checkStatus = false;
                    }
                }

                if (checkStatus)
                {
                    _ = await _serviceRepository.UpdateStatusServiceRequest(detail.ServiceRequestId, 17);
                }

                return new ErrorResponse("Update Successful");
            }
            return new ErrorResponse("Update Fail");
        }
    }
}
