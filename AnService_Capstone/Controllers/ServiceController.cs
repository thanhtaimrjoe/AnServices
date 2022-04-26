using AnService_Capstone.Core.Entities;
using AnService_Capstone.Core.Interfaces;
using AnService_Capstone.Core.Interfaces.Services;
using AnService_Capstone.Core.Models.Request;
using AnService_Capstone.Core.Models.Response;
using AnService_Capstone.DataAccess.Dapper.Customize;
using AnService_Capstone.DataAccess.Dapper.Services.SendSMS;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;

namespace AnService_Capstone.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ServiceController : ControllerBase
    {
        private readonly IServiceRepository _serviceRepository;
        private readonly TwilioService _twilioService;
        private readonly IUserRepository _userRepository;
        private readonly UtilHelper _utilHelper;
        private readonly IRepairDetail _repariRepository;
        private readonly IPromotionRepository _promotionRepository;
        private readonly IInvoiceRepository _invoiceRepository;
        private readonly IContractRepository _contractRepository;
        private readonly IServiceRequestService _serviceRequestService;
        public ServiceController(IServiceRequestService serviceRequestService, IServiceRepository serviceRepository, TwilioService twilioService, IUserRepository userRepository,
            UtilHelper utilHelper, IRepairDetail repariRepository, IPromotionRepository promotionRepository, IInvoiceRepository invoiceRepository,
            IContractRepository contractRepository)
        {
            _serviceRepository = serviceRepository;
            _twilioService = twilioService;
            _userRepository = userRepository;
            _utilHelper = utilHelper;
            _repariRepository = repariRepository;
            _promotionRepository = promotionRepository;
            _invoiceRepository = invoiceRepository;
            _contractRepository = contractRepository;
            _serviceRequestService = serviceRequestService;
        }

        /// <summary>
        /// customer tạo request service
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("[action]")]
        [Authorize(Roles = "Staff, Customer")]
        public async Task<IActionResult> CreateServiceRequest(CreateService model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            /*bool serviceDetail = false;
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
                    return BadRequest(new ErrorResponse("Your account has been banned"));
                    *//*return Ok("Your account has been banned");*//*
                }
                if (model.PromotionID != 0)
                {
                    _ = await _promotionRepository.UpdateStatusPromotion(model.PromotionID, 0);
                }
                return Ok("Create Successfull");
            }
            return BadRequest(new ErrorResponse("Create Fail"));*/
            var res = await _serviceRequestService.CreateServiceRequest(model);
            if (res.ErrorsMsg.First().Equals("Create Successfull") || res.ErrorsMsg.First().Equals("Your account has been banned"))
            {
                return Ok(res.ErrorsMsg);
            }
            else
            {
                return BadRequest(res.ErrorsMsg);
            }
        }

        /// <summary>
        /// điều phối nhân viên vào service của khách hàng đã đặt
        /// </summary>
        /// <param name="job"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("[action]")]
        [Authorize(Roles = "Staff")]
        public async Task<IActionResult> AssignWorkerToRequest(AssignJob job)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            /*var result = await _serviceRepository.AssignWorkerToRequest(workerIDPri);*/

            /*foreach (var worker in job.WorkerList)
            {
                var result = await _serviceRepository.AssignWorkerToRequest(worker);
            }*/

            /*bool chechExist = false;
            bool res = false;
            *//*bool result = false;*//*

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
            return Ok("Create Successfull");*/
            return Ok(await _serviceRequestService.AssignWorkerToRequest(job));

            /*if (res)
            {
                _ = await _serviceRepository.UpdateStatusServiceRequestDetail(job.RequestDetailId, 6);
                _ = await _serviceRepository.UpdateStatusServiceRequest(detail.ServiceRequestId, 6);
                return Ok("Create Successfull");
                
            }*/
            /*return BadRequest(new ErrorResponse("Create Fail"));*/
        }

        /*[HttpPost]
        [Route("[action]")]
        public async Task<IActionResult> CreateRequestService([FromForm] CreateService model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            bool serviceDetail = false;
            bool media = false;

            *//*bool serviceDetail = true;
            bool media = true;*//*

            List<string> stringFile = new List<string>();
            foreach (var file in model.File)
            {
                string name = DateTime.Now.ToString("f", CultureInfo.GetCultureInfo("en-US")) + file.FileName;
                string res = await _firebaseService.Upload(file.OpenReadStream(), name, "RequestServices");
                stringFile.Add(res);
            }

            var reqService = await _serviceRepository.CreateRequestService(model);
            foreach (var serviceItem in model.ServiceList)
            {
                serviceDetail = await _serviceRepository.CreateRequestDetai(reqService, serviceItem);
            }
            foreach (var mediaItem in stringFile)
            {
                media = await _serviceRepository.CreateMedia(reqService, mediaItem);
            }
            if (serviceDetail != false && media != false)
            {
                *//*var check = await _serviceRepository.CheckRequestServiceByUserIDOfTheDay(model.CustomerId);
                if (!check)
                {
                    var user = await _userRepository.GetCustomerByID(model.CustomerId);
                    var formatPhone = _utilHelper.FormatPhoneNumber(user.PhoneNumber);
                    _twilioService.SendSMS(formatPhone, "Your account has been blocked because you have submitted more than 3 service requests. ");
                    _ = _userRepository.UpdateStatusUserByID(model.CustomerId, 10);
                }*//*
                return Ok("Create Successfull");
            }
            return BadRequest(new ErrorResponse("Create Fail"));
        }*/

        /// <summary>
        /// lấy thông tin request service bằng request service id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("[action]")]
        [Authorize(Roles = "Staff, Customer")]
        public async Task<IActionResult> GetServiceRequestByID(int id)
        {
            if (id == 0)
            {
                return BadRequest(new ErrorResponse("Please enter id"));
            }

            /*var service = await _serviceRepository.GetServiceRequestByID(id);
            *//*if (service == null)
            {
                return NotFound(new ErrorResponse("No Record"));
            }*//*
            return Ok(service);*/
            return Ok(await _serviceRequestService.GetServiceRequestByID(id));
        }

        /// <summary>
        /// lấy danh sách request service (note: hiện chỉ filter từng param)
        /// </summary>
        /// <param name="ServiceRequestStatus"></param>
        /// <param name="ServiceRequestCreateDate">yyyy-mm-dd</param>
        /// <returns></returns>
        [HttpGet]
        [Route("[action]")]
        [Authorize(Roles = "Staff, Customer")]
        public async Task<IActionResult> GetAllServiceRequestStatusOrDate(int ServiceRequestStatus, string ServiceRequestCreateDate)
        {
            /*IEnumerable<TblServiceRequest> service;

            if (ServiceRequestCreateDate != null)
            {
                ServiceRequestCreateDate = DateTime.ParseExact(ServiceRequestCreateDate, "yyyy-MM-dd hh:mm:ss",
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

            *//*if (service == null)
            {
                return NotFound(new ErrorResponse("No record"));
            }*//*
            return Ok(service);*/
            return Ok(await _serviceRequestService.GetAllServiceRequestStatusOrDate(ServiceRequestStatus, ServiceRequestCreateDate));
        }

        /*[HttpGet]
        [Route("[action]")]
        public async Task<IActionResult> Test2(string ServiceRequestCreateDate)
        {
            var service = await _serviceRepository.GetAllServiceRequest();
            ServiceRequestCreateDate = DateTime.ParseExact(ServiceRequestCreateDate, "yyyy-MM-dd hh:mm:ss",
                                           System.Globalization.CultureInfo.InvariantCulture).ToString("yyyy-MM-dd");
            return Ok(ServiceRequestCreateDate);
        }*/

        /*/// <summary>
        /// lấy danh sách request service có trong db
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("[action]")]
        *//*[Authorize(Roles = "Customer")]*//*
        public async Task<IActionResult> GetAllRequestService()
        {
            var service = await _serviceRepository.GetAllRequestService2();

            if (service == null)
            {
                return BadRequest();
            }
            return Ok(service);
        }*/

        /// <summary>
        /// lấy request service của 1 customer thông qua customerid
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("[action]")]
        [Authorize(Roles = "Customer")]
        public async Task<IActionResult> GetAllServiceRequestByUserID(int id)
        {
            if (id == 0)
            {
                return BadRequest(new ErrorResponse("Please enter id"));
            }

            var service = await _serviceRequestService.GetAllServiceRequestByUserID(id);
            if (service == null)
            {
                return NotFound(new ErrorResponse("No Request Service"));
            }
            return Ok(service);
        }

        /// <summary>
        /// tìm kiếm service by name
        /// </summary>
        /// <param name="name"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("[action]")]
        [Authorize(Roles = "Customer")]
        public async Task<IActionResult> GetServiceByName(string name)
        {
            var service = await _serviceRequestService.GetServiceByName(name);
            if (service == null)
            {
                return NotFound(new ErrorResponse("No Service"));
            }
            return Ok(service);
        }

        /// <summary>
        /// load danh sách service có trong db
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("[action]")]
        [Authorize(Roles = "Customer")]
        public async Task<IActionResult> GetAllService()
        {
            var service = await _serviceRequestService.GetAllService();
            if (service == null)
            {
                return BadRequest(new ErrorResponse("No Service"));
            }
            return Ok(service);
        }

        /// <summary>
        /// lấy danh sách request service mà worker được điều phối bằng workerid
        /// </summary>
        /// <param name="id"></param>
        /// <param name="status"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("[action]")]
        [Authorize(Roles = "Worker")]
        public async Task<IActionResult> GetAllServiceRequestByWorkerID(int id, int status)
        {
            if (id == 0)
            {
                return BadRequest(new ErrorResponse("Please enter id"));
            }

            var result = await _serviceRequestService.GetAllServiceRequestByWorkerID(id, status);

            if (result == null)
            {
                return NotFound(new ErrorResponse("No Request Service Availabe"));
            }
            return Ok(result);
        }

        /*[HttpGet]
        [Route("[action]")]
        public async Task<IActionResult> GetAllServiceRequestByWorkerIDAndStatus(int id, IEnumerable<int> status)
        {
            if (id == 0)
            {
                return BadRequest(new ErrorResponse("Please enter id"));
            }

            var result = await _serviceRepository.GetAllServiceRequestByWorkerID(id);

            if (result == null)
            {
                return NotFound(new ErrorResponse("No Request Service Availabe"));
            }
            return Ok(result);
        }*/

        /// <summary>
        /// lấy detail của request service bằng request service id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("[action]")]
        [Authorize(Roles = "Staff, Customer, Worker")]
        public async Task<IActionResult> GetAllServiceRequestDetailsByServiceRequestID(int id)
        {
            if (id == 0)
            {
                return BadRequest(new ErrorResponse("Please enter id"));
            }

            var result = await _serviceRequestService.GetAllServiceRequestDetailsByServiceRequestID(id);

            /*if (result == null)
            {
                return NotFound(new ErrorResponse("No Request Service Availabe"));
            }*/
            return Ok(result);
        }

        /// <summary>
        /// lấy detail của request service bằng request service id và worker id
        /// </summary>
        /// <param name="requestID"></param>
        /// <param name="workerID"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("[action]")]
        [Authorize(Roles = "Worker")]
        public async Task<IActionResult> GetAllServiceRequestDetailsByServiceRequestIDAndWorkerID(int requestID, int workerID)
        {
            if (requestID == 0)
            {
                return BadRequest(new ErrorResponse("Please enter request id"));
            }

            if (workerID == 0)
            {
                return BadRequest(new ErrorResponse("Please enter worker id"));
            }

            var result = await _serviceRequestService.GetAllServiceRequestDetailsByServiceRequestIDAndWorkerID(requestID, workerID);

            if (result == null)
            {
                return NotFound(new ErrorResponse("No Request Service Availabe"));
            }
            return Ok(result);
        }

        /// <summary>
        /// lấy request service của 1 customer bằng customerid và status (approve, pending, deny, processing)
        /// </summary>
        /// <param name="id"></param>
        /// <param name="status"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("[action]")]
        [Authorize(Roles = "Customer")]
        public async Task<IActionResult> GetServiceRequestByUserIDAndStatus(int id, int status)
        {
            if (id == 0)
            {
                return BadRequest(new ErrorResponse("Please enter id"));
            }

            if (status == 0)
            {
                return BadRequest(new ErrorResponse("Please enter status"));
            }

            var result = await _serviceRequestService.GetServiceRequestByUserIDAndStatus(id, status);

            if (result == null)
            {
                return NotFound(new ErrorResponse("No Request Service Availabe"));
            }
            return Ok(result);
        }

        /// <summary>
        /// dashboard
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("[action]")]
        [Authorize(Roles = "Staff")]
        public async Task<IActionResult> CountSatisfiedRequestDetail()
        {
            /*var res = await _serviceRepository.CountRequestServiceDetail(11);*/
            return Ok(await _serviceRequestService.CountSatisfiedRequestDetail());
        }

        /// <summary>
        /// dashboard
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("[action]")]
        [Authorize(Roles = "Staff")]
        public async Task<IActionResult> CountUnsatisfiedRequestDetail()
        {
            /* var res = await _serviceRepository.CountRequestServiceDetail(12);
             return Ok(res);*/
            return Ok(await _serviceRequestService.CountUnsatisfiedRequestDetail());
        }

        /// <summary>
        /// dashboard
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("[action]")]
        [Authorize(Roles = "Staff")]
        public async Task<IActionResult> CountReworkRequestDetail()
        {
            /*var res = await _serviceRepository.CountRequestServiceDetail(16);
            return Ok(res);*/
            return Ok(await _serviceRequestService.CountReworkRequestDetail());
        }

        /*/// <summary>
        /// dashboard
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("[action]")]
        public async Task<IActionResult> CountServiceRequest()
        {
            var res = await _serviceRepository.GetAllServiceRequest();
            return Ok(res.Count());
        }

        /// <summary>
        /// dashboard
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("[action]")]
        public async Task<IActionResult> CountCompletedServiceRequest()
        {
            var res = await _serviceRepository.CountServiceRequest(13);
            return Ok(res);
        }

        /// <summary>
        /// dashboard
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("[action]")]
        public async Task<IActionResult> CountDenyServiceRequest()
        {
            var res = await _serviceRepository.CountServiceRequest(1);
            return Ok(res);
        }*/

        /*[HttpGet]
        [Route("[action]")]
        public async Task<IActionResult> Test3(int year)
        {
            var res = await _serviceRepository.AmountOfSaleList2(year, 0);
            return Ok(res);
        }*/

        /// <summary>
        /// 
        /// </summary>
        /// <param name="quarter">Quý trong năm</param>
        /// <param name="year"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("[action]")]
        [Authorize(Roles = "Staff")]
        public async Task<IActionResult> Dashboard(int quarter, int year)
        {
            Dashboard dashboard = new Dashboard();

            if (year == 0)
            {
                year = DateTime.Now.Year;
            }

            var res1 = await _serviceRepository.AmountOfSaleList(year, 0);
            var res2 = await _serviceRepository.CountServiceStatus();
            /*var res3 = await _promotionRepository.CountPromotionIsUsed();*/
            var res4 = await _serviceRepository.CountRequestServiceDetail(11);
            var res5 = await _serviceRepository.CountRequestServiceDetail(12);
            var res6 = await _serviceRepository.SumRevenueOfInvoiceByYear(quarter, year);
            var res7 = await _serviceRepository.CountRequestServiceDetail(16);
            var res8 = await _serviceRepository.AmountOfSaleList(year, 1);
            var res9 = await _serviceRepository.AmountOfSaleList(year, 2);
            var res10 = await _userRepository.GetAllCustomers(null, "", "");
            var res11 = await _userRepository.GetAllCustomers("10", "", "");
            var res12 = await _userRepository.GetAllNewUsersInMonth(quarter, year, 3, 4);
            /*var res13 = await _userRepository.GetAllWorker(null, "", "");
            var res14 = await _userRepository.GetAllNewUsersInMonth(DateTime.Now.Month, 2, 4);*/
            var res15 = await _userRepository.GetAllNewUsersInMonth(quarter, year, 3, 10);
            /*var res16 = await _promotionRepository.CountPromotionIsUsedInMonth(DateTime.Now.Month);
            var res17 = await _promotionRepository.CountPromotionIsUsedInYear(year);*/
            var res18 = await _serviceRepository.CountTaskOfWorker();
            var res19 = await _serviceRepository.SumRevenueOfContractByYear(quarter, year);
            var res20 = await _invoiceRepository.GetListInfomationInvoiceByServiceRequestID(year, quarter);
            var res21 = await _contractRepository.GetContractList(quarter, year);
            var res22 = await _invoiceRepository.AmountOfInvoice(year, quarter);

            dashboard.ReceivedServiceRequest = res1.FirstOrDefault();
            dashboard.ServiceStatusStatistics = res2;
            /*dashboard.PromotionIsUsed = res3;*/
            dashboard.SatisfiedRequestDetail = res4;
            dashboard.UnsatisfiedRequestDetail = res5;
            dashboard.RevenueOfInvoiceByYear = res6.FirstOrDefault();
            dashboard.ReworkRequestDetail = res7;
            dashboard.CompleteServiceRequest = res8.FirstOrDefault();
            dashboard.CancelServiceRequest = res9.FirstOrDefault();
            dashboard.TotalCustomers = res10.Count();
            dashboard.AmountOfBanCustomers = res11.Count();
            dashboard.AmountOfNewCustomersInMonth = res12.Count();
            /*dashboard.TotalWorkers = res13.Count();
            dashboard.AmountOfNewWorkersInMonth = res14.Count();*/
            dashboard.AmountOfBanCustomersInMonth = res15.Count();
            /*dashboard.PromotionIsUsedInMonth = res16;
            dashboard.PromotionIsUsedInYear = res17;*/
            dashboard.WorkerTasks = res18;
            dashboard.RevenueOfContractByYear = res19.FirstOrDefault();
            dashboard.InvoiceList = res20;
            dashboard.ContractList = res21;
            dashboard.AmountOfInvoice = res22;

            return Ok(dashboard);
        }

        /*[HttpGet]
        [Route("[action]")]
        public async Task<IActionResult> ServiceStatusStatistics()
        {
            Dashboard.ServiceRequest serviceRequest = new Dashboard.ServiceRequest();

            
        }*/

        /*/// <summary>
        /// filter request service theo status (approve, pending, deny, processing)
        /// </summary>
        /// <param name="status"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("[action]")]
        public async Task<IActionResult> GetRequestServiceByStatus(int status)
        {
            if (status == 0)
            {
                return BadRequest(new ErrorResponse("Please enter status"));
            }

            var result = await _serviceRepository.GetAllServiceByStatus(status);

            if (result == null)
            {
                return NotFound(new ErrorResponse("No Request Service Availabe"));
            }
            return Ok(result);
        }*/

        /*/// <summary>
        /// 
        /// </summary>
        /// <param name="date"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("[action]")]
        public async Task<IActionResult> GetRequestServiceDate(DateTime? date)
        {
            if (date == null)
            {
                return BadRequest(new ErrorResponse("Please enter date"));
            }

            var result = await _serviceRepository.GetAllServiceByDate(date);

            if (result == null)
            {
                return NotFound(new ErrorResponse("No Request Service Availabe, format : yyyy-mm-ddT00:00:00"));
            }
            return Ok(result);
        }*/

        /// <summary>
        /// Từ chối hoặc hủy bỏ request service
        /// </summary>
        /// <param name="id">request service</param>
        /// <returns></returns>
        [HttpPut]
        [Route("[action]")]
        [Authorize(Roles = "Customer")]
        public async Task<IActionResult> CancelServiceRequestForCustomer(int id)
        {
            /*if (id == 0)
            {
                return BadRequest(new ErrorResponse("Please enter id"));
            }

            var result = await _serviceRepository.UpdateStatusServiceRequest(id, 8);
            var service = await _serviceRepository.GetServiceRequestByID(id);
            
            if (service.PromotionId != 0)
            {
                _ = await _promotionRepository.UpdateStatusPromotion((int)service.PromotionId, 1);
            }
            
            if (!result)
            {
                return NotFound(new ErrorResponse("Cancel Fail"));
            }
            return Ok("Cancel Successful");*/
            var res = await _serviceRequestService.CancelServiceRequestForCustomer(id);
            if (res.ErrorsMsg.First().Equals("Cancel Successful"))
            {
                return Ok(res.ErrorsMsg);
            }
            else
            {
                return BadRequest(res.ErrorsMsg);
            }
        }

        /// <summary>
        /// Từ chối hoặc hủy bỏ request service
        /// </summary>
        /// <param name="id">request service</param>
        /// <returns></returns>
        [HttpPut]
        [Route("[action]")]
        [Authorize(Roles = "Staff")]
        public async Task<IActionResult> CancelServiceRequestForStaff(int id)
        {
            /*if (id == 0)
            {
                return BadRequest(new ErrorResponse("Please enter id"));
            }

            var result = await _serviceRepository.UpdateStatusServiceRequest(id, 1);
            var service = await _serviceRepository.GetServiceRequestByID(id);

            if (service.PromotionId != 0)
            {
                _ = await _promotionRepository.UpdateStatusPromotion((int)service.PromotionId, 1);
            }

            if (!result)
            {
                return NotFound(new ErrorResponse("Cancel Fail"));
            }
            return Ok("Cancel Successful");*/
            var res = await _serviceRequestService.CancelServiceRequestForStaff(id);
            if (res.ErrorsMsg.First().Equals("Cancel Successful"))
            {
                return Ok(res.ErrorsMsg);
            }
            else
            {
                return BadRequest(res.ErrorsMsg);
            }
        }

        [HttpPut]
        [Route("[action]")]
        [Authorize(Roles = "Customer")]
        public async Task<IActionResult> UpdateStatusServiceRequestDetail(int id, int status)
        {
            /*if (id == 0)
            {
                return BadRequest(new ErrorResponse("Please enter id"));
            }

            if (status == 0)
            {
                return BadRequest(new ErrorResponse("Please enter status"));
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

                return Ok("Update Successful");
            }
            return NotFound(new ErrorResponse("Update Fail"));*/
            var res = await _serviceRequestService.UpdateStatusServiceRequestDetail(id, status);
            if (res.ErrorsMsg.First().Equals("Update Successful"))
            {
                return Ok(res.ErrorsMsg);
            }
            else
            {
                return BadRequest(res.ErrorsMsg);
            }
        }

        [HttpPut]
        [Route("[action]")]
        [Authorize(Roles = "Staff")]
        public async Task<IActionResult> CompleteServiceRequest(int serviceRequestID)
        {
            /*if (serviceRequestID == 0)
            {
                return BadRequest(new ErrorResponse("Please enter serviceRequestID"));
            }

            var res = await _serviceRepository.UpdateStatusServiceRequest(serviceRequestID, 13);

            if (res)
            {
                return Ok("Update Successful");
            }

            return BadRequest(new ErrorResponse("Update Fail"));*/
            var res = await _serviceRequestService.CompleteServiceRequest(serviceRequestID);
            if (res.ErrorsMsg.First().Equals("Update Successful"))
            {
                return Ok(res.ErrorsMsg);
            }
            else
            {
                return BadRequest(res.ErrorsMsg);
            }
        }

        [HttpPut]
        [Route("[action]")]
        [Authorize(Roles = "Staff")]
        public async Task<IActionResult> SurveyingServiceRequest(int serviceRequestID)
        {
            /*if (serviceRequestID == 0)
            {
                return BadRequest(new ErrorResponse("Please enter serviceRequestID"));
            }

            var service = await _serviceRepository.GetServiceRequestByID(serviceRequestID);

            if (service.ServiceRequestStatus != 2)
            {
                return BadRequest(new ErrorResponse("Request has been canceled"));
            }

            var res = await _serviceRepository.UpdateStatusServiceRequest(serviceRequestID, 15);

            if (res)
            {
                return Ok("Update Successful");
            }

            return BadRequest(new ErrorResponse("Update Fail"));*/
            var res = await _serviceRequestService.SurveyingServiceRequest(serviceRequestID);
            if (res.ErrorsMsg.First().Equals("Update Successful"))
            {
                return Ok(res.ErrorsMsg);
            }
            else
            {
                return BadRequest(res.ErrorsMsg);
            }
        }

        [HttpPut]
        [Route("[action]")]
        [Authorize(Roles = "Staff")]
        public async Task<IActionResult> ReworkRequestDetail(int requestDetailID)
        {
            /*if (requestDetailID == 0)
            {
                return BadRequest(new ErrorResponse("Please enter requestDetailID"));
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
                return Ok("Update Successful");
            }

            return BadRequest(new ErrorResponse("Update Fail"));*/
            var res = await _serviceRequestService.ReworkRequestDetail(requestDetailID);
            if (res.ErrorsMsg.First().Equals("Update Successful"))
            {
                return Ok(res.ErrorsMsg);
            }
            else
            {
                return BadRequest(res.ErrorsMsg);
            }
        }

        /*[HttpPut]
        [Route("[action]")]
        public async Task<IActionResult> AcceptRequestService(int requestServiceID, IEnumerable<UpdatePriceRequestDetail> requestDetail)
        {
            if (requestServiceID == 0)
            {
                return BadRequest(new ErrorResponse("Please enter requestServiceID"));
            }

            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            bool checkUpdatePrice = false;

            foreach (var detail in requestDetail)
            {
                checkUpdatePrice = await _serviceRepository.UpdatePriceRequestServiceDetail(detail.RequestDetailID, detail.RequestDetailPrice);
            }

            var checkUpdateStatus = await _serviceRepository.UpdateStatusRequestService(requestServiceID, 6);

            if (checkUpdatePrice == true && checkUpdateStatus == true)
            {
                return Ok("Accept Successful");
            }
            return BadRequest("Accept Error");
        }*/

        [HttpDelete]
        [Route("[action]")]
        [Authorize(Roles = "Staff")]
        public async Task<IActionResult> RemoveListServiceRequest(IEnumerable<int> requestServiceID)
        {
            /*bool result = false;
            if (requestServiceID == null)
            {
                return BadRequest(new ErrorResponse("Please enter requestServiceID"));
            }

            foreach (var service in requestServiceID)
            {
                result = await _serviceRepository.UpdateStatusServiceRequest(service, 5);
            }

            if (!result)
            {
                return NotFound(new ErrorResponse("Cancel Fail"));
            }
            return Ok("Cancel Successful");*/
            var res = await _serviceRequestService.RemoveListServiceRequest(requestServiceID);
            if (res.ErrorsMsg.First().Equals("Cancel Successful"))
            {
                return Ok(res.ErrorsMsg);
            }
            else
            {
                return BadRequest(res.ErrorsMsg);
            }
        }

        /*[HttpGet]
        [Route("[action]")]
        public async Task<IActionResult> Test(int id)
        {
            if (id == 0)
            {
                return BadRequest(new ErrorResponse("Please enter id"));
            }

            IEnumerable<TblRequestDetail> result;

            result = await _serviceRepository.GetAllInformationServiceRequestDetailsByServiceRequestID(id);

            if (result == null)
            {
                result = await _serviceRepository.GetAllServiceRequestDetailsByServiceRequestID(id);
            }
            if (result == null)
            {
                return NotFound(new ErrorResponse("No Request Service Availabe"));
            }
            return Ok(result);
        }*/

        /*[HttpGet]
        [Route("[action]")]
        public async Task<IActionResult> Test2()
        {
            var result = await _serviceRepository.GetAllRequestDetail();
            return Ok(result);
        }*/
    }
}
