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
        private readonly IPromotionRepository _promotionRepository;

        public UserController(IUserRepository userRepository, AccessTokenGenerator accessTokenGenerator, 
            RefreshTokenGenerator refreshTokenGenerator, ITwilioRestClient client, OTPGenerator otpGenerator,
            IPromotionRepository promotionRepository)
        {
            _userRepository = userRepository;
            _accessTokenGenerator = accessTokenGenerator;
            _refreshTokenGenerator = refreshTokenGenerator;
            _client = client;
            _otpGenerator = otpGenerator;
            _promotionRepository = promotionRepository;
        }

        [HttpPost]
        [Route("[action]")]
        public async Task<IActionResult> LoginStaff([FromForm] UserLogin login)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var user = await _userRepository.LoginStaff(login);

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
        public async Task<IActionResult> LoginCustomerOrManson(string phoneNumber)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            if (phoneNumber.Equals(""))
            {
                return BadRequest(new ErrorResponse("Phone number is required"));
            }

            var user = await _userRepository.CheckPhoneNumberExist(phoneNumber);

            if (user == null)
            {
                return NotFound(new ErrorResponse("Phone number is not exists"));
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
                from: new PhoneNumber("+17752695428"),
                body: "Your OTP: " + code,
                client: _client); // pass in the custom client
            return Ok(code);
        }

        [HttpPost]
        [Route("[action]")]
        public async Task<IActionResult> CreateCustomerAccount(CreateCustomer model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            /*var code = _otpGenerator.GeneratorOTP();
            var checkCode = await _userRepository.CheckInviteCodeExist(code);
            if (checkCode)
            {
                code = _otpGenerator.GeneratorOTP();
            }*/
            string code;
            bool checkCode = false;
            do
            {
                code = _otpGenerator.GeneratorOTP();
                checkCode = await _userRepository.CheckInviteCodeExist(code);
            } while (checkCode);

            var user = await _userRepository.CreateAccountCustomer(model, code);
            var promotion = await _promotionRepository.InsertPromotion(code);
            var promotionDetail = await _promotionRepository.InsertPromotionDetail(user, promotion);

            if (promotionDetail)
            {
                return Ok("Create Successfull");
            }
            return BadRequest(new ErrorResponse("Create Fail"));
        }
    }
}

