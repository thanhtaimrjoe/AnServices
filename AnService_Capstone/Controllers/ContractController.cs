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
        public async Task<IActionResult> GetContractListByUserID([FromQuery]int id)
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
    }
}
