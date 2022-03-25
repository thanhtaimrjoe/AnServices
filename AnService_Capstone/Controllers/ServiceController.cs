﻿using AnService_Capstone.Core.Entities;
using AnService_Capstone.Core.Interfaces;
using AnService_Capstone.Core.Models.Request;
using AnService_Capstone.Core.Models.Response;
using AnService_Capstone.DataAccess.Dapper.Customize;
using AnService_Capstone.DataAccess.Dapper.Services.Firebase;
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
        private readonly FirebaseService _firebaseService;
        private readonly UtilHelper _utilHelper;
        private readonly IRepairDetail _repariRepository;
        private readonly IPromotionRepository _promotionRepository;
        public ServiceController(IServiceRepository serviceRepository, TwilioService twilioService, IUserRepository userRepository,
            FirebaseService firebaseService, UtilHelper utilHelper, IRepairDetail repariRepository, IPromotionRepository promotionRepository)
        {
            _serviceRepository = serviceRepository;
            _twilioService = twilioService;
            _userRepository = userRepository;
            _firebaseService = firebaseService;
            _utilHelper = utilHelper;
            _repariRepository = repariRepository;
            _promotionRepository = promotionRepository;
        }

        /// <summary>
        /// customer tạo request service
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("[action]")]
        public async Task<IActionResult> CreateServiceRequest(CreateService model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

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
                /*var check = await _serviceRepository.CheckServiceRequestByUserIDOfTheDay(model.CustomerId);
                if (!check)
                {
                    var user = await _userRepository.GetCustomerByID(model.CustomerId);
                    var formatPhone = _utilHelper.FormatPhoneNumber(user.PhoneNumber);
                    _twilioService.SendSMS(formatPhone, "Your account has been blocked because you have submitted more than 3 service requests. ");
                    _ = _userRepository.UpdateStatusUserByID(model.CustomerId, 10);
                    return BadRequest(new ErrorResponse("Your account has been banned"));
                    *//*return Ok("Your account has been banned");*//*
                }*/
                if (model.PromotionCode.PromotionID != 0)
                {
                    _ = await _promotionRepository.UpdateStatusPromotion(model.PromotionCode.PromotionID);
                }
                return Ok("Create Successfull");
            }
            return BadRequest(new ErrorResponse("Create Fail"));
        }

        /// <summary>
        /// điều phối nhân viên vào service của khách hàng đã đặt
        /// </summary>
        /// <param name="job"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("[action]")]
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

            bool chechExist = false;
            bool res = false;
            /*bool result = false;*/

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

            if (res)
            {
                _ = await _serviceRepository.UpdateStatusServiceRequestDetail(job.RequestDetailId, 6);
                _ = await _serviceRepository.UpdateStatusServiceRequest(detail.ServiceRequestId, 6);
                return Ok("Create Successfull");
                
            }
            return BadRequest(new ErrorResponse("Create Fail"));
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
        /*[Authorize(Roles = "Customer")]*/
        public async Task<IActionResult> GetServiceRequestByID(int id)
        {
            if (id == 0)
            {
                return BadRequest(new ErrorResponse("Please enter id"));
            }

            var service = await _serviceRepository.GetServiceRequestByID(id);
            /*if (service == null)
            {
                return NotFound(new ErrorResponse("No Record"));
            }*/
            return Ok(service);
        }

        /// <summary>
        /// lấy danh sách request service (note: hiện chỉ filter từng param)
        /// </summary>
        /// <param name="ServiceRequestStatus"></param>
        /// <param name="ServiceRequestCreateDate">yyyy-mm-dd</param>
        /// <returns></returns>
        [HttpGet]
        [Route("[action]")]
        /*[Authorize(Roles = "Customer")]*/
        public async Task<IActionResult> GetAllServiceRequestStatusOrDate(int ServiceRequestStatus, string ServiceRequestCreateDate)
        {
            IEnumerable<TblServiceRequest> service;

            /*if (ServiceRequestCreateDate != null)
            {
                ServiceRequestCreateDate = DateTime.ParseExact(ServiceRequestCreateDate, "yyyy-MM-dd",
                                           System.Globalization.CultureInfo.InvariantCulture).ToString("d");
            }*/
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

            /*if (service == null)
            {
                return NotFound(new ErrorResponse("No record"));
            }*/
            return Ok(service);
        }

        /*[HttpGet]
        [Route("[action]")]
        public async Task<IActionResult> Test2(string ServiceRequestCreateDate)
        {
            ServiceRequestCreateDate = DateTime.ParseExact(ServiceRequestCreateDate, "yyyy-MM-dd",
                                           System.Globalization.CultureInfo.InvariantCulture).ToString("d");
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
        /*[Authorize(Roles = "Customer")]*/
        public async Task<IActionResult> GetAllServiceRequestByUserID(int id)
        {
            if (id == 0)
            {
                return BadRequest(new ErrorResponse("Please enter id"));
            }

            var service = await _serviceRepository.GetAllServiceRequestByUserID(id);
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
        /*[Authorize(Roles = "Customer")]*/
        public async Task<IActionResult> GetServiceByName(string name)
        {
            var service = await _serviceRepository.GetServiceByName(name);
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
        /*[Authorize(Roles = "Customer")]*/
        public async Task<IActionResult> GetAllService()
        {
            var service = await _serviceRepository.GetAllService();
            if (service == null)
            {
                return BadRequest();
            }
            return Ok(service);
        }

        /// <summary>
        /// lấy danh sách request service mà worker được điều phối bằng workerid
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("[action]")]
        public async Task<IActionResult> GetAllServiceRequestByWorkerID(int id)
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
        }

        /// <summary>
        /// lấy detail của request service bằng request service id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("[action]")]
        public async Task<IActionResult> GetAllServiceRequestDetailsByServiceRequestID(int id)
        {
            if (id == 0)
            {
                return BadRequest(new ErrorResponse("Please enter id"));
            }

            var result = await _serviceRepository.GetAllServiceRequestDetailsByServiceRequestID(id);

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

            var result = await _serviceRepository.GetAllServiceRequestDetailsByServiceRequestIDAndWorkerID(requestID, workerID);

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

            var result = await _serviceRepository.GetServiceRequestByUserIDAndStatus(id, status);

            if (result == null)
            {
                return NotFound(new ErrorResponse("No Request Service Availabe"));
            }
            return Ok(result);
        }

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
        public async Task<IActionResult> CancelServiceRequestForCustomer(int id)
        {
            if (id == 0)
            {
                return BadRequest(new ErrorResponse("Please enter id"));
            }

            var result = await _serviceRepository.UpdateStatusServiceRequest(id, 8);

            if (!result)
            {
                return NotFound(new ErrorResponse("Cancel Fail"));
            }
            return Ok("Cancel Successful");
        }

        /// <summary>
        /// Từ chối hoặc hủy bỏ request service
        /// </summary>
        /// <param name="id">request service</param>
        /// <returns></returns>
        [HttpPut]
        [Route("[action]")]
        public async Task<IActionResult> CancelServiceRequestForStaff(int id)
        {
            if (id == 0)
            {
                return BadRequest(new ErrorResponse("Please enter id"));
            }

            var result = await _serviceRepository.UpdateStatusServiceRequest(id, 1);

            if (!result)
            {
                return NotFound(new ErrorResponse("Cancel Fail"));
            }
            return Ok("Cancel Successful");
        }

        [HttpPut]
        [Route("[action]")]
        public async Task<IActionResult> UpdateStatusServiceRequestDetail(int id, int status)
        {
            if (id == 0)
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
                    if (serviceDetail.RequestDetailStatus != 11 && serviceDetail.RequestDetailStatus != 12)
                    {
                        checkStatus = false;
                    }
                }

                if (checkStatus)
                {
                    _ = await _serviceRepository.UpdateStatusServiceRequest(detail.ServiceRequestId, 14);
                }

                return Ok("Update Successful");
            }
            return NotFound(new ErrorResponse("Update Fail"));
        }

        [HttpPut]
        [Route("[action]")]
        public async Task<IActionResult> RemoveListServiceRequest(IEnumerable<int> requestServiceID)
        {
            bool result = false;
            if (requestServiceID == null)
            {
                return BadRequest(new ErrorResponse("Please enter requestServiceID"));
            }

            foreach (var service in requestServiceID)
            {
                result = await _serviceRepository.UpdateStatusServiceRequest(service, 13);
            }
            
            if (!result)
            {
                return NotFound(new ErrorResponse("Cancel Fail"));
            }
            return Ok("Cancel Successful");
        }

        [HttpPut]
        [Route("[action]")]
        public async Task<IActionResult> CompleteServiceRequest(int serviceRequestID)
        {
            if (serviceRequestID == 0)
            {
                return BadRequest(new ErrorResponse("Please enter serviceRequestID"));
            }

            var res = await _serviceRepository.UpdateStatusServiceRequest(serviceRequestID, 13);

            if (res)
            {
                return Ok("Update Successful");
            }

            return BadRequest(new ErrorResponse("Update Fail"));
        }

        [HttpPut]
        [Route("[action]")]
        public async Task<IActionResult> SurveyingServiceRequest(int serviceRequestID)
        {
            if (serviceRequestID == 0)
            {
                return BadRequest(new ErrorResponse("Please enter serviceRequestID"));
            }

            var res = await _serviceRepository.UpdateStatusServiceRequest(serviceRequestID, 15);

            if (res)
            {
                return Ok("Update Successful");
            }

            return BadRequest(new ErrorResponse("Update Fail"));
        }

        [HttpPut]
        [Route("[action]")]
        public async Task<IActionResult> ReworkRequestDetail(int requestDetailID)
        {
            if (requestDetailID == 0)
            {
                return BadRequest(new ErrorResponse("Please enter requestDetailID"));
            }

            var res = await _serviceRepository.UpdateStatusServiceRequestDetail(requestDetailID, 16);

            if (res)
            {
                return Ok("Update Successful");
            }

            return BadRequest(new ErrorResponse("Update Fail"));
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

        [HttpGet]
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
            /*if (result == null)
            {
                return NotFound(new ErrorResponse("No Request Service Availabe"));
            }*/
            return Ok(result);
        }

        /*[HttpGet]
        [Route("[action]")]
        public async Task<IActionResult> Test2()
        {
            var result = await _serviceRepository.GetAllRequestDetail();
            return Ok(result);
        }*/
    }
}
