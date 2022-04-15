using AnService_Capstone.Core.Interfaces;
using AnService_Capstone.Core.Interfaces.Services;
using AnService_Capstone.Core.Models.Response;
using AnService_Capstone.DataAccess.Dapper.Customize;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace AnService_Capstone.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InviteCodeController : ControllerBase
    {
        /*private readonly IInviteCodeRepository _inviteCodeRepository;
        private readonly UtilHelper _utilHelper;*/
        private readonly IInviteCodeService _inviteCodeService;

        /*public InviteCodeController(IInviteCodeRepository inviteCodeRepository, UtilHelper utilHelper)
        {
            _inviteCodeRepository = inviteCodeRepository;
            _utilHelper = utilHelper;
        }*/
        public InviteCodeController(IInviteCodeService inviteCodeService)
        {
            _inviteCodeService = inviteCodeService;
        }

        [HttpPost]
        [Route("[action]")]
        [Authorize(Roles = "Customer")]
        public async Task<IActionResult> CreateInviteCode(int userID)
        {
            if (userID == 0)
            {
                return BadRequest(new ErrorResponse("Please enter userID"));
            }
            return Ok(await _inviteCodeService.CreateInviteCode(userID));
            /*var inviteCode = _utilHelper.RandomString(10);

            var res = await _inviteCodeRepository.CreateInviteCode(userID, inviteCode);

            return Ok(inviteCode);*/
        }
    }
}
