using AnService_Capstone.Core.Entities;
using AnService_Capstone.Core.Interfaces;
using AnService_Capstone.Core.Interfaces.Services;
using AnService_Capstone.Core.Models.Request;
using AnService_Capstone.Core.Models.Response;
using AnService_Capstone.DataAccess.Dapper.Customize;
using AnService_Capstone.DataAccess.Dapper.Services.SendSMS;
using AnService_Capstone.DataAccess.Dapper.TokenGenerator;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AnService_Capstone.DataAccess.Dapper.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly AccessTokenGenerator _accessTokenGenerator;
        private readonly RefreshTokenGenerator _refreshTokenGenerator;
        private readonly TwilioService _twilioService;
        private readonly UtilHelper _utilHelper;
        private readonly IInviteCodeRepository _inviteCodeRepository;
        private readonly IPromotionRepository _promotionRepository;

        public UserService(IUserRepository userRepository, AccessTokenGenerator accessTokenGenerator, RefreshTokenGenerator refreshTokenGenerator,
            TwilioService twilioService, UtilHelper utilHelper, IInviteCodeRepository inviteCodeRepository, IPromotionRepository promotionRepository)
        {
            _userRepository = userRepository;
            _accessTokenGenerator = accessTokenGenerator;
            _refreshTokenGenerator = refreshTokenGenerator;
            _twilioService = twilioService;
            _utilHelper = utilHelper;
            _inviteCodeRepository = inviteCodeRepository;
            _promotionRepository = promotionRepository;
        }

        public async Task<ErrorResponse> BanUserByUserID(int id)
        {
            if (id == 0)
            {
                return new ErrorResponse("Please enter id");
            }

            var res = await _userRepository.UpdateStatusUserByID(id, 10);
            if (res)
            {
                var user = await _userRepository.GetCustomerByID(id);
                var formatPhone = _utilHelper.FormatPhoneNumber(user.PhoneNumber);
                _twilioService.SendSMS(formatPhone, "Your account has been blocked because you have submitted more than 3 service requests. ");
                return new ErrorResponse("Update Successful");
            }
            return new ErrorResponse("Update Fail");
        }

        public async Task<ErrorResponse> ChangePhoneNumber(int userID, string phoneNumber)
        {
            if (userID == 0)
            {
                return new ErrorResponse("Please enter id");
            }

            if (phoneNumber == null || phoneNumber.Equals(""))
            {
                return new ErrorResponse("Please enter phoneNumber");
            }

            var check = await _userRepository.CheckPhoneNumberExist(phoneNumber);
            if (check != null)
            {
                return new ErrorResponse("Please enter phoneNumber");
            }

            var res = await _userRepository.ChangePhoneNumber(userID, phoneNumber);
            if (!res)
            {
                return new ErrorResponse("Update Fail");
            }
            return new ErrorResponse("Update Successful");
        }

        public async Task<ErrorResponse> CreateCustomerAccount(CreateCustomer model)
        {
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
                var validEmail = _utilHelper.IsValidEmail(model.Email);

                if (!validEmail)
                {
                    return new ErrorResponse("Email is not valid");
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
                            return new ErrorResponse("Create Successfull");
                        }
                    }
                    return new ErrorResponse("Your invite code is expired");
                }
                return new ErrorResponse("Your invite code is invalid");
            }

            _ = await _userRepository.CreateAccountCustomer(model);
            return new ErrorResponse("Create Successfull");
        }

        public async Task<ErrorResponse> CreateWorkerAccount(CreateWorker model)
        {
            var check = await _userRepository.CheckPhoneNumberExist(model.PhoneNumber);

            if (check.PhoneNumber.Equals(model.PhoneNumber))
            {
                return new ErrorResponse("Phone number is existed");
            }
            var res = await _userRepository.CreateAccountWorker(model);

            if (res)
            {
                return new ErrorResponse("Create Successfull");
            }
            return new ErrorResponse("Create Fail");
        }

        public async Task<IEnumerable<UserViewModel>> GetAllCustomers(int status, string fullname, string phoneNumber)
        {
            IEnumerable<UserViewModel> res;

            string statusIdString = null;

            if (status != 0)
            {
                statusIdString = status.ToString();
            }

            if (status != 0)
            {
                res = await _userRepository.GetAllCustomers(statusIdString, fullname, phoneNumber);
            }
            else
            {
                res = await _userRepository.GetAllCustomers(null, fullname, phoneNumber);
            }

            return res;
        }

        public async Task<IEnumerable<UserViewModel>> GetAllWorker(int typeJobId, string fullName, string phoneNumber)
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
            return res;
        }

        public async Task<UserViewModel> GetCustomerById(int id)
        {
            var res = await _userRepository.GetCustomerByID(id);
            if (res == null)
            {
                return null;
            }
            return res;
        }

        public async Task<UserViewModel> GetWorkerById(int id)
        {
            var res = await _userRepository.GetWorkerByID(id);
            if (res == null)
            {
                return null;
            }
            return res;
        }

        public async Task<IEnumerable<TblUser>> GetWorkerByServiceID(int id)
        {
            List<TblUser> worker = (List<TblUser>) await _userRepository.GetAllInformationWorkerByServiceID(id);
            List<TblUser> worker2 = (List<TblUser>)await _userRepository.GetWorkerByServiceID(id);
            List<TblUser> worker3 = new List<TblUser>();

            if (worker.Count() == 0)
            {
                return worker2;
            }
            else if (worker.Count() < worker2.Count())
            {
                foreach(var item in worker)
                {
                    worker3.Add(item);
                    foreach (var item2 in worker2)
                    {
                        if (item.UserId != item2.UserId)
                        {
                            worker3.Add(item2);
                        }
                    }
                    if (worker3.Count() == worker2.Count())
                    {
                        return worker3;
                    }
                }
                
            }
            return worker;
        }

        public async Task<TokenViewModel> LoginCustomerOrWorker(string phoneNumber)
        {
            var user = await _userRepository.CheckPhoneNumberExist(phoneNumber);

            if (user == null)
            {
                return null;
            }
            var refreshToken = _refreshTokenGenerator.GenerateToken();
            var token = _accessTokenGenerator.GenerateToken(user, refreshToken);
            return token;
        }

        public async Task<TokenViewModel> LoginStaff(UserLogin login)
        {
            var user = await _userRepository.LoginStaff(login);
            if (user == null)
            {
                return null;
            }
            var refreshToken = _refreshTokenGenerator.GenerateToken();
            var token = _accessTokenGenerator.GenerateToken(user, refreshToken);
            return token;
        }

        public async Task<ErrorResponse> RemoveWorker(int id)
        {
            if (id == 0)
            {
                return new ErrorResponse("Please enter id");
            }

            var res = await _userRepository.RemoveWorker(id);

            if (res)
            {
                return new ErrorResponse("Remove Successful");
            }
            return new ErrorResponse("Remove Fail");
        }

        public string SendSms(SmsMessage model)
        {
            var code = _utilHelper.GeneratorOTP();
            _twilioService.SendSMS(model.To, "Your OTP: " + code);
            return code;

        }

        public async Task<ErrorResponse> UnBanUserByUserID(int id)
        {
            if (id == 0)
            {
                return new ErrorResponse("Please enter id");
            }

            var res = await _userRepository.UpdateStatusUserByID(id, 4);
            if (!res)
            {
                return new ErrorResponse("Update Fail");
            }
            return new ErrorResponse("Update Successful");
        }

        public async Task<ErrorResponse> UpdateCustomer(UpdateCustomer model)
        {
            if (model.Email == null)
            {
                model.Email = "";
            }

            if (model.Address == null)
            {
                model.Address = "";
            }

            if (model.FullName == null)
            {
                model.FullName = "";
            }

            if (model.CustomerId == 0)
            {
                return new ErrorResponse("Please enter id");
            }

            var res = await _userRepository.UpdateCustomer(model);
            if (res)
            {
                return new ErrorResponse("Update Successfull");
            }
            return new ErrorResponse("Update Fail");
        }

        public async Task<ErrorResponse> UpdateWorker(UpdateWorker worker)
        {
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
                var validEmail = _utilHelper.IsValidEmail(worker.WorkerEmail);

                if (!validEmail)
                {
                    return new ErrorResponse("Email is not valid");
                }
            }

            if (worker.WorkerPhoneNumber == null)
            {
                return new ErrorResponse("Phone can not null");
            }

            //lay thong tin worker
            var user = await _userRepository.GetWorkerByID(worker.WorkerId);

            //kiem tra so dien thoai co trong he thong
            var check = await _userRepository.CheckPhoneNumberExist(worker.WorkerPhoneNumber);

            if (check != null)
            {
                if (check.PhoneNumber.Equals(user.PhoneNumber))
                {
                    /*return BadRequest(new ErrorResponse("Phone number is existed"));*/
                    var res = await _userRepository.UpdateWorker(worker);

                    if (res)
                    {
                        return new ErrorResponse("Update Successful");
                    }
                    return new ErrorResponse("Update Fail");
                }
            }
            else if (check == null)
            {
                var res = await _userRepository.UpdateWorker(worker);

                if (res)
                {
                    return new ErrorResponse("Update Successful");
                }
                return new ErrorResponse("Update Fail");
            }
            return new ErrorResponse("Phone number is existed");
        }
    }
}
