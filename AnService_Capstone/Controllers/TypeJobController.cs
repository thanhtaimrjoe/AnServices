using AnService_Capstone.Core.Interfaces;
using AnService_Capstone.Core.Models.Response;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace AnService_Capstone.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TypeJobController : ControllerBase
    {
        private readonly ITypeJobRepository _typeJobRepository;

        public TypeJobController(ITypeJobRepository typeJobRepository)
        {
            _typeJobRepository = typeJobRepository;
        }

        /// <summary>
        /// lấy danh sách nghề của mason
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("[action]")]
        public async Task<IActionResult> GetAll()
        {
            var res = await _typeJobRepository.GetAll();
            if (res == null)
            {
                return NotFound(new ErrorResponse("No record"));
            }
            return Ok(res);
        }
    }
}
