using AnService_Capstone.Core.Entities;
using AnService_Capstone.Core.Interfaces;
using AnService_Capstone.Core.Models.Request;
using AnService_Capstone.Core.Models.Response;
using AnService_Capstone.DataAccess.Dapper.Context;
using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AnService_Capstone.DataAccess.Dapper.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly DapperContext _context;

        public UserRepository(DapperContext context)
        {
            _context = context;
        }

        public async Task<UserViewModel> LoginStaff(UserLogin login)
        {
            var query = "select UserID, Username, Password, FullName, PhoneNumber, Address, Email, InviteCode, RoleName, TypeJob, CreateDate, Status " +
                "from tblUsers u join tblRoles r on u.Role = r.RoleID " +
                "where Username = @Username and Password = @Password and Status = 1";
            using (var connection = _context.CreateConnection())
            {
                connection.Open();
                var user = await connection.QuerySingleOrDefaultAsync<UserViewModel>(query, new { @Username = login.UserName, @Password = login.Password });
                connection.Close();
                return user;
            }
        }

        public async Task<UserViewModel> CheckPhoneNumberExist(string phoneNumber)
        {
            var query = "select UserID, Username, Password, FullName, PhoneNumber, Address, Email, InviteCode, RoleName, TypeJob, CreateDate, Status " +
                "from tblUsers u join tblRoles r on u.Role = r.RoleID " +
                "where PhoneNumber = @PhoneNumber and Status = 4";
            using (var connection = _context.CreateConnection())
            {
                connection.Open();
                var user = await connection.QuerySingleOrDefaultAsync<UserViewModel>(query, new { @PhoneNumber = phoneNumber});
                connection.Close();
                return user;
            }
        }

        public async Task<int> CreateAccountCustomer(CreateCustomer customer, string inviteCode)
        {
            var query = "insert into tblUsers(FullName, PhoneNumber, Address, Email, InviteCode, Role, CreateDate, Status) " +
                "values(@FullName, @PhoneNumber, @Address, @Email, @InviteCode, @Role, @CreateDate, @Status) " +
                "SELECT CAST(SCOPE_IDENTITY() as int)";

            var parameters = new DynamicParameters();
            parameters.Add("FullName", customer.FullName, DbType.String);
            parameters.Add("PhoneNumber", customer.PhoneNumber, DbType.String);
            parameters.Add("Address", customer.Address, DbType.String);
            parameters.Add("Email", customer.Email, DbType.String);
            parameters.Add("InviteCode", inviteCode, DbType.String);
            parameters.Add("Role", 3, DbType.Int32);
            parameters.Add("CreateDate", DateTime.Now, DbType.DateTime);
            parameters.Add("Status", 4, DbType.Int32);

            using (var connection = _context.CreateConnection())
            {
                connection.Open();
                var check = await connection.QuerySingleAsync<int>(query, parameters);
                connection.Close();
                return check;
            }
        }

        public async Task<bool> CheckInviteCodeExist(string code)
        {
            var query = "select UserID from tblUsers where InviteCode = @InviteCode";

            using (var connection = _context.CreateConnection())
            {
                connection.Open();
                var result = await connection.QueryAsync(query, new { InviteCode = code });
                connection.Close();
                if (result.Count() == 0)
                {
                    return false;
                }
                return true;
            }
        }

        public async Task<IEnumerable<TblUser>> GetMansonByServiceID(int id)
        {
            var query = "select UserID, FullName, PhoneNumber, Status " +
                "from (tblUsers u join tblTypeJobs t on u.TypeJob = t.TypeJobID) join tblServices s on s.TypeMansonJob = t.TypeJobID " +
                "where s.ServiceID = @ServiceID";

            using(var connection = _context.CreateConnection())
            {
                connection.Open();
                var user = await connection.QueryAsync<TblUser>(query, new { @ServiceID = id });
                if (user.Count() == 0)
                {
                    return null;
                }
                return user;
            }
        }
    }
}
