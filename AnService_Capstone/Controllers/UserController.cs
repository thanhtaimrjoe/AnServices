using AnService_Capstone.Core.Interfaces;
using AnService_Capstone.Core.Models.Request;
using AnService_Capstone.Core.Models.Response;
using AnService_Capstone.DataAccess.Dapper.Customize;
using AnService_Capstone.DataAccess.Dapper.Services.SendSMS;
using AnService_Capstone.DataAccess.Dapper.TokenGenerator;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Text.Json;
using System.Threading.Tasks;

using Twilio;
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
        private readonly UtilHelper _otpGenerator;
        private readonly IPromotionRepository _promotionRepository;
        private readonly TwilioService _twilioService;

        public UserController(IUserRepository userRepository, AccessTokenGenerator accessTokenGenerator, 
            RefreshTokenGenerator refreshTokenGenerator, ITwilioRestClient client, UtilHelper otpGenerator,
            IPromotionRepository promotionRepository, TwilioService twilioService)
        {
            _userRepository = userRepository;
            _accessTokenGenerator = accessTokenGenerator;
            _refreshTokenGenerator = refreshTokenGenerator;
            _client = client;
            _otpGenerator = otpGenerator;
            _promotionRepository = promotionRepository;
            _twilioService = twilioService;
        }


        /// <summary>
        /// login cho staff với username và password
        /// </summary>
        /// <param name="login"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("[action]")]
        public async Task<IActionResult> LoginStaff([FromBody] UserLogin login)
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

        /// <summary>
        /// login bằng số điện thoại cho customer hoặc mason
        /// </summary>
        /// <param name="phoneNumber"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("[action]")]
        public async Task<IActionResult> LoginCustomerOrMason(string phoneNumber)
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
        
        /// <summary>
        /// gửi otp qua tin nhắn
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
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

        /// <summary>
        /// thêm số điện để được gửi otp (chưa dùng đc)
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("[action]")]
        public IActionResult AddNewOutgoingCallerID([FromBody] SmsMessage model)
        {
            return Ok(_twilioService.AddNewOutgoingCallerID(model.To));
        }

        /// <summary>
        /// tạo tài khoản customer
        /// </summary>
        /// <param name="model">bao gồm tên, số điện thoại, địa chỉ, email</param>
        /// <returns></returns>
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

        /// <summary>
        /// lấy danh sách manson theo service id, mason làm cho service nào
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("[action]")]
        //get mason group by job by service id
        public async Task<IActionResult> GetMasonByServiceID(int id)
        {
            var mason = await _userRepository.GetMasonByServiceID(id);

            if (mason == null)
            {
                return NotFound(new ErrorResponse("No Mason Is Available"));
            }
            return Ok(mason);
        }

        /// <summary>
        /// lấy dữ liệu mason theo id của mason
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("[action]")]
        public async Task<IActionResult> GetMasonById(int id)
        {
            if (id == 0)
            {
                return BadRequest(new ErrorResponse("Please enter id"));
            }

            var res = await _userRepository.GetMasonByID(id);
            if (res == null)
            {
                return NotFound(new ErrorResponse("No record"));
            }
            return Ok(res);
        }

        /*/// <summary>
        /// lấy tất cả mason có trong db
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("[action]")]
        public async Task<IActionResult> GetAllMason()
        {
            var res = await _userRepository.GetAllMason();
            if (res == null)
            {
                return NotFound(new ErrorResponse("No record"));
            }
            return Ok(res);
        }*/

        /// <summary>
        /// lấy danh sách mason (note: hiện chỉ filter từng param)
        /// </summary>
        /// <param name="typeJobId">của nghề</param>
        /// <param name="fullName">full name mason</param>
        /// <param name="phoneNumber">số điện thoại mason</param>
        /// <returns></returns>
        [HttpGet]
        [Route("[action]")]
        public async Task<IActionResult> GetAllMason(int typeJobId, string fullName, string phoneNumber)
        {
            IEnumerable<UserViewModel> res;

            if (typeJobId == 0 && fullName == null && phoneNumber == null)
            {
                res = await _userRepository.GetAllMason();
            }
            else if (typeJobId != 0 && fullName == null && phoneNumber == null)
            {
                res = await _userRepository.GetAllMasonByTypeJob(typeJobId);
            }
            else if (typeJobId == 0 && fullName != null && phoneNumber == null)
            {
                res = await _userRepository.GetAllMasonByName(fullName);
            }
            else
            {
                res = await _userRepository.GetAllMasonByPhone(phoneNumber);
            }

            /*if (res == null)
            {
                return NotFound(new ErrorResponse("No record"));
            }*/
            return Ok(res);
        }

        /// <summary>
        /// xóa tài khoản của mason
        /// </summary>
        /// <param name="id">id của mason cần xóa</param>
        /// <returns></returns>
        [HttpPut]
        [Route("[action]")]
        public async Task<IActionResult> RemoveMason(int id)
        {
            if (id == 0)
            {
                return BadRequest(new ErrorResponse("Please enter id"));
            }

            var res = await _userRepository.RemoveMason(id);

            if (res)
            {
                return Ok("Remove Successful");
            }
            return BadRequest(new ErrorResponse("Remove Fail"));
        }

        /// <summary>
        /// update mason
        /// </summary>
        /// <param name="mason"></param>
        /// <returns></returns>
        [HttpPut]
        [Route("[action]")]
        public async Task<IActionResult> UpdateMason([FromBody]UpdateMason mason)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var check = await _userRepository.CheckPhoneNumberExist(mason.MasonPhoneNumber);

            if (check != null)
            {
                return BadRequest(new ErrorResponse("Phone number is existed"));
            }

            var res = await _userRepository.UpdateMason(mason);

            if (res)
            {
                return Ok("Update Successful");
            }
            return BadRequest(new ErrorResponse("Update Fail"));
        }

        /// <summary>
        /// tạo tài khoản mason
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("[action]")]
        public async Task<IActionResult> CreateMasonAccount([FromBody]CreateMason model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            
            var res = await _userRepository.CreateAccountMason(model);

            if (res)
            {
                return Ok("Create Successfull");
            }
            return BadRequest(new ErrorResponse("Create Fail"));
        }
    }
}

