using AnService_Capstone.Core.Interfaces;
using AnService_Capstone.Core.Interfaces.Services;
using AnService_Capstone.Core.Models.Response;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace AnService_Capstone.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TypeJobController : ControllerBase
    {
        /*private readonly ITypeJobRepository _typeJobRepository;*/
        private readonly ITypeJobService _typeJobService;

        /*public TypeJobController(ITypeJobRepository typeJobRepository)
        {
            _typeJobRepository = typeJobRepository;
        }*/

        public TypeJobController(ITypeJobService typeJobService)
        {
            _typeJobService = typeJobService;
        }

        /// <summary>
        /// lấy danh sách nghề của worker
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("[action]")]
        [Authorize(Roles = "Staff")]
        public async Task<IActionResult> GetAll()
        {
            var res = await _typeJobService.GetAll();
            if (res == null)
            {
                return NotFound(new ErrorResponse("No record"));
            }
            return Ok(res);
        }
    }
}
