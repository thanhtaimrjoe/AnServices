using AnService_Capstone.Core.Interfaces;
using AnService_Capstone.Core.Models.Request;
using AnService_Capstone.Core.Models.Response;
using AnService_Capstone.DataAccess.Dapper.Customize;
using AnService_Capstone.DataAccess.Dapper.Services.SendEmail;
using AnService_Capstone.DataAccess.Dapper.Services.SendSMS;
using AnService_Capstone.DataAccess.Dapper.TokenGenerator;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
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
        private readonly UtilHelper _otpGenerator;
        private readonly IPromotionRepository _promotionRepository;
        private readonly TwilioService _twilioService;
        private readonly UtilHelper _utilHelper;
        private readonly IInviteCodeRepository _inviteCodeRepository;
        private readonly IEmailSender _emailSender;

        public UserController(IUserRepository userRepository, AccessTokenGenerator accessTokenGenerator, 
            RefreshTokenGenerator refreshTokenGenerator, UtilHelper otpGenerator,
            IPromotionRepository promotionRepository, TwilioService twilioService, UtilHelper   utilHelper, IInviteCodeRepository inviteCodeRepository, 
            IEmailSender emailSender)
        {
            _userRepository = userRepository;
            _accessTokenGenerator = accessTokenGenerator;
            _refreshTokenGenerator = refreshTokenGenerator;
            _otpGenerator = otpGenerator;
            _promotionRepository = promotionRepository;
            _twilioService = twilioService;
            _utilHelper = utilHelper;
            _inviteCodeRepository = inviteCodeRepository;
            _emailSender = emailSender;
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

        [HttpPost]
        [Route("[action]")]
        public async Task<IActionResult> SendEmail(IFormFileCollection files, int userID)
        {
            /*files = Request.Form.Files.Any() ? Request.Form.Files : new FormFileCollection();*/
            var customer = await _userRepository.GetCustomerByID(userID);
            var message = new Message(customer.Email, "Hóa đơn cho dịch vụ sửa chữa", "Chào " + customer.FullName + "<br>AnService gửi đến anh/chị hóa đơn dịch vụ sửa chữa", files);
            await _emailSender.SendEmailAsync(message);
            return Ok();
        }

        /// <summary>
        /// login bằng số điện thoại cho customer hoặc worker
        /// </summary>
        /// <param name="phoneNumber"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("[action]")]
        public async Task<IActionResult> LoginCustomerOrWorker(string phoneNumber)
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

            if (user.Status == 10)
            {
                return BadRequest(new ErrorResponse("Your account have been banned"));
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
            /*var message = MessageResource.Create(
                to: new PhoneNumber(model.To),
                from: new PhoneNumber("+17752695428"),
                body: "Your OTP: " + code,
                client: _client); // pass in the custom client*/
            _twilioService.SendSMS(model.To, "Your OTP: " + code);
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
            /*string code;
            bool checkCode = false;
            do
            {
                code = _otpGenerator.GeneratorOTP(); // cre
                checkCode = await _userRepository.CheckInviteCodeExist(code);
            } while (checkCode);*/

            if (model.Email == null)
            {
                model.Email = "";
            }

            if (model.Address == null)
            {
                model.Address = "";
            }

            if (model.InviteCode == null)
            {
                model.InviteCode = "";
            }

            if (!model.Email.Equals(""))
            {
                var validEmail = _otpGenerator.IsValidEmail(model.Email);

                if (!validEmail)
                {
                    return BadRequest(new ErrorResponse("Email is not valid"));
                }
            }

            if (!model.InviteCode.Equals(""))
            {
                var check = await _inviteCodeRepository.CheckInviteCode(model.InviteCode);

                if (check != null)
                {
                    if (DateTime.Now.Subtract((DateTime)check.ExpireDate).Days < 0)
                    {
                        var code = _utilHelper.RandomString(10);
                        var res = await _promotionRepository.GeneratorPromotionCode(check.CustomerId, code, "Mã Giảm Giá Giới Thiệu - 5%", 0.05);

                        if (res)
                        {
                            _ = await _inviteCodeRepository.UpdateIsUsedInviteCode(check.InviteCodeId);
                            _ = await _userRepository.CreateAccountCustomer(model);
                            return Ok("Create Successfull");
                        }
                    }
                    return BadRequest(new ErrorResponse("Your invite code is expired"));
                }

                return BadRequest(new ErrorResponse("Your invite code is valid"));
            }

            _ = await _userRepository.CreateAccountCustomer(model);

            /*var promotion = await _promotionRepository.InsertPromotion(code);
            var promotionDetail = await _promotionRepository.InsertPromotionDetail(user, promotion);*/
            
            return Ok("Create Successfull");
        }

        /// <summary>
        /// lấy danh sách manson theo service id, worker làm cho service nào
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("[action]")]
        //get worker group by job by service id
        public async Task<IActionResult> GetWorkerByServiceID(int id)
        {
            var worker = await _userRepository.GetWorkerByServiceID(id);

            /*if (worker == null)
            {
                return NotFound(new ErrorResponse("No Worker Is Available"));
            }*/
            return Ok(worker);
        }

        /// <summary>
        /// lấy dữ liệu worker theo id của worker
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("[action]")]
        public async Task<IActionResult> GetWorkerById(int id)
        {
            if (id == 0)
            {
                return BadRequest(new ErrorResponse("Please enter id"));
            }

            var res = await _userRepository.GetWorkerByID(id);
            if (res == null)
            {
                return NotFound(new ErrorResponse("No record"));
            }
            return Ok(res);
        }

        /*/// <summary>
        /// lấy tất cả worker có trong db
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("[action]")]
        public async Task<IActionResult> GetAllWorker()
        {
            var res = await _userRepository.GetAllWorker();
            if (res == null)
            {
                return NotFound(new ErrorResponse("No record"));
            }
            return Ok(res);
        }*/

        /// <summary>
        /// lấy danh sách worker (note: hiện chỉ filter từng param)
        /// </summary>
        /// <param name="typeJobId">của nghề</param>
        /// <param name="fullName">full name worker</param>
        /// <param name="phoneNumber">số điện thoại worker</param>
        /// <returns></returns>
        [HttpGet]
        [Route("[action]")]
        public async Task<IActionResult> GetAllWorker(int typeJobId, string fullName, string phoneNumber)
        {
            IEnumerable<UserViewModel> res;

            string typeJobIdString = null;

            if (typeJobId != 0)
            {
                typeJobIdString = typeJobId.ToString();
            }

            if (typeJobId == 0)
            {
                res = await _userRepository.GetAllWorker(null, phoneNumber, fullName);
            }
            else
            {
                res = await _userRepository.GetAllWorker(typeJobIdString, phoneNumber, fullName);
            }

            /*if (typeJobId == 0 && fullName == null && phoneNumber == null)
            {
                res = await _userRepository.GetAllWorker();
            }
            else if (typeJobId != 0 && fullName == null && phoneNumber == null)
            {
                res = await _userRepository.GetAllWorkerByTypeJob(typeJobId);
            }
            else if (typeJobId == 0 && fullName != null && phoneNumber == null)
            {
                res = await _userRepository.GetAllWorkerByName(fullName);
            }
            else
            {
                res = await _userRepository.GetAllWorkerByPhone(phoneNumber);
            }*/

            /*if (res == null)
            {
                return NotFound(new ErrorResponse("No record"));
            }*/

            return Ok(res);
        }

        /// <summary>
        /// xóa tài khoản của worker
        /// </summary>
        /// <param name="id">id của worker cần xóa</param>
        /// <returns></returns>
        [HttpPut]
        [Route("[action]")]
        public async Task<IActionResult> RemoveWorker(int id)
        {
            if (id == 0)
            {
                return BadRequest(new ErrorResponse("Please enter id"));
            }

            var res = await _userRepository.RemoveWorker(id);

            if (res)
            {
                return Ok("Remove Successful");
            }
            return BadRequest(new ErrorResponse("Remove Fail"));
        }

        /// <summary>
        /// update worker
        /// </summary>
        /// <param name="worker"></param>
        /// <returns></returns>
        [HttpPut]
        [Route("[action]")]
        public async Task<IActionResult> UpdateWorker([FromBody]UpdateWorker worker)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            if (worker.WorkerEmail == null)
            {
                worker.WorkerEmail = "";
            }

            if (worker.WorkerAddress == null)
            {
                worker.WorkerAddress = "";
            }

            if (!worker.WorkerEmail.Equals(""))
            {
                var validEmail = _otpGenerator.IsValidEmail(worker.WorkerEmail);

                if (!validEmail)
                {
                    return BadRequest(new ErrorResponse("Email is not valid"));
                }
            }

            var user = await _userRepository.GetWorkerByID(worker.WorkerId);

            var check = await _userRepository.CheckPhoneNumberExist(worker.WorkerPhoneNumber);

            if (check.PhoneNumber.Equals(user.PhoneNumber))
            {
                /*return BadRequest(new ErrorResponse("Phone number is existed"));*/
                var res = await _userRepository.UpdateWorker(worker);

                if (res)
                {
                    return Ok("Update Successful");
                }
                return BadRequest(new ErrorResponse("Update Fail"));
            }

            return BadRequest(new ErrorResponse("Phone number is existed"));
        }

        /// <summary>
        /// tạo tài khoản worker
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("[action]")]
        public async Task<IActionResult> CreateWorkerAccount([FromBody]CreateWorker model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            
            var res = await _userRepository.CreateAccountWorker(model);

            if (res)
            {
                return Ok("Create Successfull");
            }
            return BadRequest(new ErrorResponse("Create Fail"));
        }

        /*[HttpPost]
        [Route("[action]")]
        public async Task<IActionResult> CreateInviteCode(int userID)
        {
            if (userID == 0)
            {
                return BadRequest(new ErrorResponse("Please enter userID"));
            }

            var inviteCode = _utilHelper.RandomString(10);

            var res = await _userRepository.CreateInviteCode(userID, inviteCode);

            if (res)
            {
                return Ok("Create Successful");
            }
            return BadRequest("Create Fail");
        }*/

        /// <summary>
        /// lấy danh sách customer account
        /// </summary>
        /// <param name="status">tên khách hàng</param>
        /// <param name="fullname">tên khách hàng</param>
        /// <param name="phoneNumber">số điện thoại</param>
        /// <returns></returns>
        [HttpGet]
        [Route("[action]")]
        public async Task<IActionResult> GetAllCustomers(int status, string fullname, string phoneNumber)
        {
            IEnumerable<UserViewModel> res;

            string statusIdString = null;

            if (status != 0)
            {
                statusIdString = status.ToString();
            }

            /*IEnumerable<UserViewModel> res;

            if (name == null && phoneNumber == null)
            {
                res = await _userRepository.GetAllCustomers();
            }
            else if (name != null && phoneNumber == null)
            {
                res = await _userRepository.GetAllCustomersByName(name);
            }
            else if (name == null && phoneNumber != null)
            {
                res = await _userRepository.GetAllCustomersByPhone(phoneNumber);
            }
            else
            {
                res = await _userRepository.GetAllCustomersByPhoneAndName(phoneNumber, name);
            }*/
            if (status != 0)
            {
                res = await _userRepository.GetAllCustomers(statusIdString, fullname, phoneNumber);
            }
            else
            {
                res = await _userRepository.GetAllCustomers(null, fullname, phoneNumber);
            }

            return Ok(res);
        }

        /// <summary>
        /// lấy thông tin customer qua id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("[action]")]
        public async Task<IActionResult> GetCustomerById(int id)
        {
            if (id == 0)
            {
                return BadRequest(new ErrorResponse("Please enter id"));
            }

            var res = await _userRepository.GetCustomerByID(id);
            if (res == null)
            {
                return NotFound(new ErrorResponse("No record"));
            }
            return Ok(res);
        }


        /// <summary>
        /// ban customer qua id (status = 10)
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpPut]
        [Route("[action]")]
        public async Task<IActionResult> BanUserByUserID(int id)
        {
            if (id == 0)
            {
                return BadRequest(new ErrorResponse("Please enter id"));
            }

            var res = await _userRepository.UpdateStatusUserByID(id, 10);
            if (res)
            {
                var user = await _userRepository.GetCustomerByID(id);
                var formatPhone = _utilHelper.FormatPhoneNumber(user.PhoneNumber);
                _twilioService.SendSMS(formatPhone, "Your account has been blocked because you have submitted more than 3 service requests. ");
                return Ok("Update Successful");
            }

            return BadRequest(new ErrorResponse("Update Fail"));
        }

        /// <summary>
        /// ban customer qua id (status = 4)
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpPut]
        [Route("[action]")]
        public async Task<IActionResult> UnBanUserByUserID(int id)
        {
            if (id == 0)
            {
                return BadRequest(new ErrorResponse("Please enter id"));
            }

            var res = await _userRepository.UpdateStatusUserByID(id, 4);
            if (!res)
            {
                return BadRequest(new ErrorResponse("Update Fail"));
            }
            return Ok("Update Successful");
        }

        [HttpPut]
        [Route("[action]")]
        public async Task<IActionResult> ChangePhoneNumber(int userID, string phoneNumber)
        {
            if (userID == 0)
            {
                return BadRequest(new ErrorResponse("Please enter id"));
            }

            if (phoneNumber == null || phoneNumber.Equals(""))
            {
                return BadRequest(new ErrorResponse("Please enter phoneNumber"));
            }

            var check = await _userRepository.CheckPhoneNumberExist(phoneNumber);
            if (check != null)
            {
                return BadRequest(new ErrorResponse("Phone number is exist"));
            }

            var res = await _userRepository.ChangePhoneNumber(userID, phoneNumber);
            if (!res)
            {
                return BadRequest(new ErrorResponse("Update Fail"));
            }
            return Ok("Update Successful");
        }
    }
}

