using AnService_Capstone.Core.Interfaces;
using AnService_Capstone.Core.Models.Request;
using AnService_Capstone.Core.Models.Response;
using AnService_Capstone.DataAccess.Dapper.Customize;
using AnService_Capstone.DataAccess.Dapper.TokenGenerator;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Twilio.Clients;
using Twilio.Rest.Api.V2010.Account;
using Twilio.Types;

namespace AnService_Capstone.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly AccessTokenGenerator _accessTokenGenerator;
        private readonly RefreshTokenGenerator _refreshTokenGenerator;
        private readonly ITwilioRestClient _client;
        private readonly OTPGenerator _otpGenerator;

        public UserController(IUserRepository userRepository, AccessTokenGenerator accessTokenGenerator, 
            RefreshTokenGenerator refreshTokenGenerator, ITwilioRestClient client, OTPGenerator otpGenerator)
        {
            _userRepository = userRepository;
            _accessTokenGenerator = accessTokenGenerator;
            _refreshTokenGenerator = refreshTokenGenerator;
            _client = client;
            _otpGenerator = otpGenerator;
        }

        [HttpPost]
        [Route("[action]")]
        public async Task<IActionResult> Login([FromForm] UserLogin login)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var user = await _userRepository.Login(login);

            if (user == null)
            {
                return NotFound(new ErrorResponse("Username or Password incorrect"));
            }

            var refreshToken = _refreshTokenGenerator.GenerateToken();
            var token = _accessTokenGenerator.GenerateToken(user, refreshToken);
            return Ok(token);
        }

        [HttpPost]
        [Route("[action]")]
        public IActionResult SendSms([FromBody] SmsMessage model)
        {
            var code = _otpGenerator.GeneratorOTP();
            var message = MessageResource.Create(
                to: new PhoneNumber(model.To),
                from: new PhoneNumber(model.From),
                body: "Your OTP: " + code,
                client: _client); // pass in the custom client
            return Ok(code);
        }
    }
}

