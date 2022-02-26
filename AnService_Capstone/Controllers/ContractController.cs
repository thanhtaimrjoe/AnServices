using AnService_Capstone.Core.Interfaces;
using AnService_Capstone.Core.Models.Request;
using AnService_Capstone.Core.Models.Response;
using AnService_Capstone.DataAccess.Dapper.Services.Firebase;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace AnService_Capstone.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContractController : ControllerBase
    {
        private readonly IContractRepository _contractRepository;
        private readonly FirebaseService _firebaseService;

        public ContractController(IContractRepository contractRepository, FirebaseService firebaseService)
        {
            _contractRepository = contractRepository;
            _firebaseService = firebaseService;
        }

        [HttpGet]
        [Route("[action]")]
        public async Task<IActionResult> GetContractListByUserID(int id)
        {
            if (id == 0)
            {
                return BadRequest(new ErrorResponse("Please enter id"));
            }

            var res = await _contractRepository.GetContractListByUserID(id);

            /*if (res == null)
            {
                return NotFound(new ErrorResponse("No record"));
            }*/
            return Ok(res);
        }

        /// <summary>
        /// update status contract
        /// </summary>
        /// <param name="id">của contract</param>
        /// <param name="status">đồng ý - 3, từ chối - 1, yêu cầu sửa lại - 7</param>
        /// <returns></returns>
        [HttpPut]
        [Route("[action]")]
        public async Task<IActionResult> UpdateStatusContract(int id, int status)
        {
            if (id == 0)
            {
                return BadRequest(new ErrorResponse("Please enter id"));
            }

            if (status == 0)
            {
                return BadRequest(new ErrorResponse("Please enter status"));
            }

            var res = await _contractRepository.UpdateStatusContract(id, status);
            if (res)
            {
                return Ok("Update successfull");
            }
            return BadRequest(new ErrorResponse("Update fail"));
        }

        /// <summary>
        /// đồng ý hợp đồng
        /// </summary>
        /// <param name="id">của contract</param>
        /// <returns></returns>
        [HttpPut]
        [Route("[action]")]
        public async Task<IActionResult> ApproveContract(int id)
        {
            if (id == 0)
            {
                return BadRequest(new ErrorResponse("Please enter id"));
            }

            var res = await _contractRepository.ApproveContract(id);
            if (res)
            {
                return Ok("Update successfull");
            }
            return BadRequest(new ErrorResponse("Update fail"));
        }

        /// <summary>
        /// từ chối/hủy bỏ hợp đồng
        /// </summary>
        /// <param name="id">của contract</param>
        /// <returns></returns>
        [HttpPut]
        [Route("[action]")]
        public async Task<IActionResult> DenyContract(int id)
        {
            if (id == 0)
            {
                return BadRequest(new ErrorResponse("Please enter id"));
            }

            var res = await _contractRepository.DenyContract(id);
            if (res)
            {
                return Ok("Update successfull");
            }
            return BadRequest(new ErrorResponse("Update fail"));
        }

        /// <summary>
        /// yêu cầu sửa lại hợp đồng
        /// </summary>
        /// <param name="id">của contract</param>
        /// <returns></returns>
        [HttpPut]
        [Route("[action]")]
        public async Task<IActionResult> RequestUpdateContract(int id)
        {
            if (id == 0)
            {
                return BadRequest(new ErrorResponse("Please enter id"));
            }

            var res = await _contractRepository.RequestUpdateContract(id);
            if (res)
            {
                return Ok("Update successfull");
            }
            return BadRequest(new ErrorResponse("Update fail"));
        }

        /// <summary>
        /// tạo contract
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        [Route("[action]")]
        public async Task<IActionResult> CreateContract(CreateContract contract)
        {
            bool res = false;

            if (contract.UserId == 0)
            {
                return BadRequest(new ErrorResponse("Please enter id"));
            }

            if (contract.RequestId == 0)
            {
                return BadRequest(new ErrorResponse("Please enter requestID"));
            }

            if (contract.Username.Equals(""))
            {
                return BadRequest(new ErrorResponse("Please enter name"));
            }

            if (contract.ContractUrl.Equals(""))
            {
                return BadRequest(new ErrorResponse("Please enter url"));
            }

            var check = await _contractRepository.CheckContractExist(contract.RequestId);

            if (check != null)
            {
                res = await _contractRepository.UpdateContractURL(contract.ContractUrl, check.ContractId);
            }
            else
            {
                res = await _contractRepository.CreateContract(contract.UserId, contract.Username, contract.ContractUrl, contract.RequestId);
            }

            if (res)
            {
                return Ok("Create successfull");
            }
            return BadRequest(new ErrorResponse("Create fail"));
        }

        [HttpPost]
        [Route("[action]")]
        public async Task<IActionResult> CreateContract2(int id, string name, int requestID, IFormFile file)
        {
            bool res = false;

            if (id == 0)
            {
                return BadRequest(new ErrorResponse("Please enter id"));
            }

            if (requestID == 0)
            {
                return BadRequest(new ErrorResponse("Please enter requestID"));
            }

            if (name.Equals(""))
            {
                return BadRequest(new ErrorResponse("Please enter name"));
            }

            string url = await _firebaseService.Upload(file.OpenReadStream(), file.FileName, "Contracts");

            var check = await _contractRepository.CheckContractExist(requestID);

            if (check != null)
            {
                res = await _contractRepository.UpdateContractURL(url, check.ContractId);
            }
            else
            {
                res = await _contractRepository.CreateContract(id, name, url, requestID);
            }

            if (res)
            {
                return Ok("Create successfull");
            }
            return BadRequest(new ErrorResponse("Create fail"));
        }

        [HttpPost]
        [Route("[action]")]
        public async Task<IActionResult> Test([FromForm(Name = "file")]List<IFormFile> files)
        {
            List<string> stringFile = new List<string>();
            foreach (var file in files)
            {
                var t = file.OpenReadStream();
                string res = await _firebaseService.Upload(file.OpenReadStream(), file.FileName, "RequestServices");
                stringFile.Add(res);
            }

            return Ok(stringFile);
        }

        /*[HttpPost]
        [Route("[action]")]
        public async Task<IActionResult> Test([FromForm] UploadMedia files)
        {
            *//*List<string> stringFile = new List<string>();
            foreach (var file in files)
            {
                var req = System.Net.WebRequest.Create(file.File.Uri);
                using (Stream stream = req.GetResponse().GetResponseStream())
                {
                    string res = await _firebaseService.Upload(stream, file.File.Name, "RequestServices");
                    stringFile.Add(res);
                }
            }*/

        /*return Ok(stringFile);*//*
        string res;
        var req = System.Net.WebRequest.Create(files.Uri);
        using (Stream stream = req.GetResponse().GetResponseStream())
        {
            res = await _firebaseService.Upload(stream, files.Name, "RequestServices");
        }
        return Ok(res);
    }*/
    }
}
