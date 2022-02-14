using AnService_Capstone.Core.Interfaces;
using AnService_Capstone.Core.Models.Response;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace AnService_Capstone.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContractController : ControllerBase
    {
        private readonly IContractRepository _contractRepository;

        public ContractController(IContractRepository contractRepository)
        {
            _contractRepository = contractRepository;
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

            if (res == null)
            {
                return NotFound(new ErrorResponse("No record"));
            }
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
        /// <param name="id">của user đăng ký request</param>
        /// <param name="name">của user được đăng ký request</param>
        /// <param name="url">của contract</param>
        /// <returns></returns>
        [HttpPost]
        [Route("[action]")]
        public async Task<IActionResult> CreateContract(int id, string name, string url)
        {
            if (id == 0)
            {
                return BadRequest(new ErrorResponse("Please enter id"));
            }

            if (name.Equals(""))
            {
                return BadRequest(new ErrorResponse("Please enter name"));
            }

            if (url.Equals(""))
            {
                return BadRequest(new ErrorResponse("Please enter url"));
            }

            var res = await _contractRepository.CreateContract(id, name, url);
            if (res)
            {
                return Ok("Create successfull");
            }
            return BadRequest(new ErrorResponse("Create fail"));
        }
    }
}
