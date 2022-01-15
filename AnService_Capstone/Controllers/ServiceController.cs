using AnService_Capstone.Core.Entities;
using AnService_Capstone.Core.Interfaces;
using AnService_Capstone.Core.Models.Request;
using AnService_Capstone.Core.Models.Response;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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

        [HttpPost]
        [Route("[action]")]
        public async Task<IActionResult> CreateRequestService([FromForm] CreateService model)
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

        [HttpGet]
        [Route("[action]")]
        /*[Authorize(Roles = "Customer")]*/
        public async Task<IActionResult> GetAllRequestService()
        {
            var service = await _serviceRepository.GetAllRequestService();
            if (service == null)
            {
                return BadRequest();
            }
            return Ok(service);
        }

        [HttpGet]
        [Route("[action]")]
        /*[Authorize(Roles = "Customer")]*/
        public async Task<IActionResult> GetAllRequestServiceByUserID(int id)
        {
            var service = await _serviceRepository.GetAllRequestServiceByUserID(id);
            if (service == null)
            {
                return NotFound(new ErrorResponse("No Request Service"));
            }
            return Ok(service);
        }

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

        [HttpGet]
        [Route("[action]")]
        public async Task<IActionResult> GetRequestDetailByRequestID(int id)
        {
            var service = await _serviceRepository.GetRequestDetailsByRequestID(id);
            if (service == null)
            {
                return BadRequest(new ErrorResponse("Request service in not exist"));
            }
            return Ok(service);
        }

        [HttpPost]
        [Route("[action]")]
        public async Task<IActionResult> AssignMansonToRequest(AssignJob job)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var result = await _serviceRepository.AssignMansonToRequest(job);
            if (result)
            {
                return Ok("Create Successfull");
            }
            return BadRequest(new ErrorResponse("Create Fail"));
        }
    }
}
