using AnService_Capstone.Core.Entities;
using AnService_Capstone.Core.Models.Request;
using AnService_Capstone.Core.Models.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AnService_Capstone.Core.Interfaces.Services
{
    public interface IUserService
    {
        public Task<TokenViewModel> LoginCustomerOrWorker(string phoneNumber);

        public Task<TokenViewModel> LoginStaff(UserLogin login);

        public string SendSms(SmsMessage model);

        public Task<ErrorResponse> CreateCustomerAccount(CreateCustomer model);

        public Task<ErrorResponse> RemoveWorker(int id);

        public Task<ErrorResponse> UpdateWorker(UpdateWorker worker);

        public Task<ErrorResponse> CreateWorkerAccount(CreateWorker model);

        public Task<ErrorResponse> BanUserByUserID(int id);

        public Task<ErrorResponse> UnBanUserByUserID(int id);

        public Task<ErrorResponse> ChangePhoneNumber(int userID, string phoneNumber);

        public Task<ErrorResponse> UpdateCustomer(UpdateCustomer model);

        public Task<UserViewModel> GetCustomerById(int id);

        public Task<IEnumerable<TblUser>> GetWorkerByServiceID(int id);

        public Task<UserViewModel> GetWorkerById(int id);

        public Task<IEnumerable<UserViewModel>> GetAllWorker(int typeJobId, string fullName, string phoneNumber);

        public Task<IEnumerable<UserViewModel>> GetAllCustomers(int status, string fullname, string phoneNumber);
    }
}
