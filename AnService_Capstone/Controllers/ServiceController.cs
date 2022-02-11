﻿using AnService_Capstone.Core.Entities;
using AnService_Capstone.Core.Interfaces;
using AnService_Capstone.Core.Models.Request;
using AnService_Capstone.Core.Models.Response;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AnService_Capstone.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ServiceController : ControllerBase
    {
        private readonly IServiceRepository _serviceRepository;
        public ServiceController(IServiceRepository serviceRepository)
        {
            _serviceRepository = serviceRepository;
        }

        /// <summary>
        /// customer tạo request service
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("[action]")]
        public async Task<IActionResult> CreateRequestService([FromBody] CreateService model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            bool serviceDetail = false;
            bool media = false;
            
            var reqService = await _serviceRepository.CreateRequestService(model);
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
                return Ok("Create Successfull");
            }
            return BadRequest(new ErrorResponse("Create Fail"));
        }

        /// <summary>
        /// lấy thông tin request service bằng request service id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("[action]")]
        /*[Authorize(Roles = "Customer")]*/
        public async Task<IActionResult> GetRequestServiceByID(int id)
        {
            if (id == 0)
            {
                return BadRequest(new ErrorResponse("Please enter id"));
            }

            var service = await _serviceRepository.GetRequestServiceByID(id);
            if (service == null)
            {
                return NotFound(new ErrorResponse("No Record"));
            }
            return Ok(service);
        }

        /// <summary>
        /// lấy danh sách request service có trong db
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("[action]")]
        /*[Authorize(Roles = "Customer")]*/
        public async Task<IActionResult> GetAllRequestService()
        {
            var service = await _serviceRepository.GetAllRequestService2();
            if (service == null)
            {
                return BadRequest();
            }
            return Ok(service);
        }

        /// <summary>
        /// lấy request service của 1 customer thông qua customerid
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("[action]")]
        /*[Authorize(Roles = "Customer")]*/
        public async Task<IActionResult> GetAllRequestServiceByUserID(int id)
        {
            if (id == 0)
            {
                return BadRequest(new ErrorResponse("Please enter id"));
            }

            var service = await _serviceRepository.GetAllRequestServiceByUserID(id);
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
        /// điều phối nhân viên vào service của khách hàng đã đặt
        /// </summary>
        /// <param name="job"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("[action]")]
        public async Task<IActionResult> AssignMasonToRequest(AssignJob job)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var result = await _serviceRepository.AssignMasonToRequest(job);
            if (result)
            {
                return Ok("Create Successfull");
            }
            return BadRequest(new ErrorResponse("Create Fail"));
        }

        /// <summary>
        /// lấy danh sách request service mà mason được điều phối bằng masonid
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("[action]")]
        public async Task<IActionResult> GetAllRequestServiceByMasonID(int id)
        {
            if (id == 0)
            {
                return BadRequest(new ErrorResponse("Please enter id"));
            }

            var result = await _serviceRepository.GetAllRequestServiceByMasonID(id);

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
        public async Task<IActionResult> GetRequestServiceDetailsByRequestServiceID(int id)
        {
            if (id == 0)
            {
                return BadRequest(new ErrorResponse("Please enter id"));
            }

            var result = await _serviceRepository.GetRequestServiceDetailsByRequestServiceID(id);

            if (result == null)
            {
                return NotFound(new ErrorResponse("No Request Service Availabe"));
            }
            return Ok(result);
        }

        /// <summary>
        /// lấy detail của request service bằng request service id và mason id
        /// </summary>
        /// <param name="requestID"></param>
        /// <param name="masonID"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("[action]")]
        public async Task<IActionResult> GetRequestServiceDetailsByRequestServiceIDAndMasonID(int requestID, int masonID)
        {
            if (requestID == 0)
            {
                return BadRequest(new ErrorResponse("Please enter request id"));
            }

            if (masonID == 0)
            {
                return BadRequest(new ErrorResponse("Please enter mason id"));
            }

            var result = await _serviceRepository.GetRequestServiceDetailsByRequestServiceIDAndMasonID(requestID, masonID);

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
        public async Task<IActionResult> GetRequestServiceByUserIDAndStatus(int id, int status)
        {
            if (id == 0)
            {
                return BadRequest(new ErrorResponse("Please enter id"));
            }

            if (status == 0)
            {
                return BadRequest(new ErrorResponse("Please enter status"));
            }

            var result = await _serviceRepository.GetAllServiceByStatusAndUserID(id, status);

            if (result == null)
            {
                return NotFound(new ErrorResponse("No Request Service Availabe"));
            }
            return Ok(result);
        }

        /// <summary>
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
        }

        /// <summary>
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
        }

        /// <summary>
        /// Từ chối hoặc hủy bỏ request service
        /// </summary>
        /// <param name="id">request service</param>
        /// <returns></returns>
        [HttpPut]
        [Route("[action]")]
        public async Task<IActionResult> CancelRequestService(int id)
        {
            if (id == 0)
            {
                return BadRequest(new ErrorResponse("Please enter id"));
            }

            var result = await _serviceRepository.CancelRequestServiceByID(id);

            if (!result)
            {
                return NotFound(new ErrorResponse("Cancel Fail"));
            }
            return Ok("Cancel Successful");
        }
    }
}
