using AnService_Capstone.Core.Interfaces;
using AnService_Capstone.Core.Models.Response;
using AnService_Capstone.DataAccess.Dapper.Customize;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace AnService_Capstone.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PromotionController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly IPromotionRepository _promotionRepository;
        private readonly UtilHelper _helper;

        public PromotionController(IUserRepository userRepository, IPromotionRepository promotionRepository, UtilHelper helper)
        {
            _userRepository = userRepository;
            _promotionRepository = promotionRepository;
            _helper = helper;
        }

        /*[HttpPost]
        [Route("[action]")]
        public async Task<IActionResult> GetPromotionCode(string inviteCode)
        {
            *//*if (inviteCode == null)
            {
                return BadRequest(new ErrorResponse("Please enter InviteCode")); 
            }*//*

            return Ok();
        }*/

        [HttpGet]
        [Route("[action]")]
        public async Task<IActionResult> GetAllPromotionByUserID(int userID)
        {
            if (userID == 0)
            {
                return BadRequest(new ErrorResponse("Please enter userID"));
            }

            var res = await _promotionRepository.GetAllPromotionByUserID(userID);
            if (res == null)
            {
                return NotFound(new ErrorResponse("No record"));
            }
            return Ok(res);
        }

        [HttpGet]
        [Route("[action]")]
        public async Task<IActionResult> GetAllPromotionValidByUserID(int userID)
        {
            if (userID == 0)
            {
                return BadRequest(new ErrorResponse("Please enter userID"));
            }

            var res = await _promotionRepository.GetAllPromotionValidByUserID(userID);
            if (res == null)
            {
                return NotFound(new ErrorResponse("No record"));
            }
            return Ok(res);
        }

        [HttpGet]
        [Route("[action]")]
        public async Task<IActionResult> GetInformationPromotionByID(int promotionID)
        {
            if (promotionID == 0)
            {
                return BadRequest(new ErrorResponse("Please enter promotionID"));
            }

            var res = await _promotionRepository.GetInformationPromotionByID(promotionID);
            if (res == null)
            {
                return NotFound(new ErrorResponse("No record"));
            }
            return Ok(res);
        }
    }
}
