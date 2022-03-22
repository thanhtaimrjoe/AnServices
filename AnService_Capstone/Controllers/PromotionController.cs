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

        [HttpPost]
        [Route("[action]")]
        public async Task<IActionResult> GetPromotionCode(int userID, string inviteCode)
        {
            if (userID == 0)
            {
                return BadRequest(new ErrorResponse("Please enter userID"));
            }

            if (inviteCode.Equals(""))
            {
                return BadRequest(new ErrorResponse("Please enter userID"));
            }

            var check = await _promotionRepository.CheckEnteredCode(userID);

            if (!check)
            {
                return BadRequest(new ErrorResponse("You have been already enter invite code"));
            }

            var user = await _userRepository.GetCustomerByID(userID);
            var user2 = await _userRepository.GetCustomerByInviteCode(inviteCode);

            if (user2 == null)
            {
                return BadRequest(new ErrorResponse("Invite code invalid"));
            }

            if (user.InviteCode.Equals(inviteCode))
            {
                return BadRequest(new ErrorResponse("You cant input your invite code"));
            }

            string promotionCode = _helper.RandomString(10);
            string promotionCode2 = _helper.RandomString(10);


            var res = await _promotionRepository.GeneratorPromotionCode(userID, promotionCode, "MAGIAMGIANGUOIDUNGMOI", 0.05);
            var res2 = await _promotionRepository.GeneratorPromotionCode(user2.UserID, promotionCode2, "MAGIAMGIANGUOIGIOITHIEU", 0.1);

            if (res == true && res2 == true)
            {
                return Ok(promotionCode);
            }
            return BadRequest(new ErrorResponse("Error"));
        }

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
    }
}
