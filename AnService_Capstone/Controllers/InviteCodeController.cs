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
    public class InviteCodeController : ControllerBase
    {
        private readonly IInviteCodeRepository _inviteCodeRepository;
        private readonly UtilHelper _utilHelper;

        public InviteCodeController(IInviteCodeRepository inviteCodeRepository, UtilHelper utilHelper)
        {
            _inviteCodeRepository = inviteCodeRepository;
            _utilHelper = utilHelper;
        }

        [HttpPost]
        [Route("[action]")]
        public async Task<IActionResult> CreateInviteCode(int userID)
        {
            if (userID == 0)
            {
                return BadRequest(new ErrorResponse("Please enter userID"));
            }

            var inviteCode = _utilHelper.RandomString(10);

            var res = await _inviteCodeRepository.CreateInviteCode(userID, inviteCode);

            return Ok(inviteCode);
        }
    }
}
