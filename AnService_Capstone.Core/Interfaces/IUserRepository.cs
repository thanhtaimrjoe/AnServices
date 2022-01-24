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
    }
}
