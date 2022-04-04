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

        public Task<int> CreateAccountCustomer(CreateCustomer customer);

        /*public Task<bool> CheckInviteCodeExist(string code);*/

        public Task<IEnumerable<TblUser>> GetWorkerByServiceID(int id);

        /*public Task<IEnumerable<UserViewModel>> GetAllWorker();*/

        /*public Task<IEnumerable<UserViewModel>> GetAllWorkerByTypeJob(int id);

        public Task<IEnumerable<UserViewModel>> GetAllWorkerByName(string name);

        public Task<IEnumerable<UserViewModel>> GetAllWorkerByPhone(string phone);*/

        public Task<IEnumerable<UserViewModel>> GetAllWorker(string id, string phone, string name);

        public Task<UserViewModel> GetWorkerByID(int id);

        public Task<bool> RemoveWorker(int id);

        public Task<bool> UpdateWorker(UpdateWorker worker);

        /*public Task<bool> ChangeWorkerPhoneNumber();*/

        public Task<bool> CreateAccountWorker(CreateWorker worker);

        public Task<UserViewModel> GetCustomerByID(int id);

        public Task<UserViewModel> GetCustomerByEmail(string email);

        public Task<bool> UpdateStatusUserByID(int id, int status);

        public Task<bool> ChangePhoneNumber(int userID, string phoneNumber);

        public Task<IEnumerable<UserViewModel>> GetAllCustomers(string id, string name, string phone);

        public Task<IEnumerable<UserViewModel>> GetAllNewUsersInMonth(int month, int role, int status);

        public Task<IEnumerable<UserViewModel>> GetAllNewBanUsersInMonth(int month);

        /*public Task<bool> CreateInviteCode(int userID, string code);*/

        /*public Task<IEnumerable<UserViewModel>> GetAllCustomersByName(string name);

        public Task<IEnumerable<UserViewModel>> GetAllCustomersByPhone(string phone);
*/
        /*public Task<IEnumerable<UserViewModel>> GetAllCustomersByPhoneAndName(string phone, string name);*/

        /*public Task<UserViewModel> GetCustomerByInviteCode(string inviteCode);*/
    }
}
