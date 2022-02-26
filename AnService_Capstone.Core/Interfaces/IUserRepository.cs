using AnService_Capstone.Core.Entities;
using AnService_Capstone.Core.Models.Request;
using AnService_Capstone.Core.Models.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AnService_Capstone.Core.Interfaces
{
    public interface IUserRepository
    {
        public Task<UserViewModel> LoginStaff(UserLogin login);

        public Task<UserViewModel> CheckPhoneNumberExist(string phoneNumber);

        public Task<int> CreateAccountCustomer(CreateCustomer customer, string inviteCode);

        public Task<bool> CheckInviteCodeExist(string code);

        public Task<IEnumerable<TblUser>> GetMasonByServiceID(int id);

        public Task<IEnumerable<UserViewModel>> GetAllMason();

        public Task<IEnumerable<UserViewModel>> GetAllMasonByTypeJob(int id);

        public Task<IEnumerable<UserViewModel>> GetAllMasonByName(string name);

        public Task<IEnumerable<UserViewModel>> GetAllMasonByPhone(string phone);

        public Task<UserViewModel> GetMasonByID(int id);

        public Task<bool> RemoveMason(int id);

        public Task<bool> UpdateMason(UpdateMason mason);

        /*public Task<bool> ChangeMasonPhoneNumber();*/

        public Task<bool> CreateAccountMason(CreateMason mason);

        public Task<UserViewModel> GetCustomerByID(int id);
    }
}
