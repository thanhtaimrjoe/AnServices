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
                "where Username = @Username and Password = @Password and Status = 4";
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

        public async Task<IEnumerable<TblUser>> GetMasonByServiceID(int id)
        {
            var query = "select UserID, FullName, PhoneNumber, Status " +
                "from (tblUsers u join tblTypeJobs t on u.TypeJob = t.TypeJobID) join tblServices s on s.TypeMasonJob = t.TypeJobID " +
                "where s.ServiceID = @ServiceID";

            using(var connection = _context.CreateConnection())
            {
                connection.Open();
                var user = await connection.QueryAsync<TblUser>(query, new { @ServiceID = id });
                connection.Close();
                if (user.Count() == 0)
                {
                    return null;
                }
                return user;
            }
        }

        public async Task<IEnumerable<UserViewModel>> GetAllMason()
        {
            var query = "select UserID, FullName, PhoneNumber, Address, Email, Role, TypeJob, CreateDate, Status " +
                "from tblUsers " +
                "where Role = 2 and Status = 4";
            using (var connections = _context.CreateConnection())
            {
                connections.Open();
                var res = await connections.QueryAsync<UserViewModel>(query);
                connections.Close();
                if (res.Count() == 0)
                {
                    return null;
                }
                return res;
            }
        }

        public async Task<UserViewModel> GetMasonByID(int id)
        {
            var query = "select UserID, FullName, PhoneNumber, Address, Email, Role, TypeJobName as 'TypeJob', CreateDate, Status " +
                "from tblUsers u join tblTypeJobs job on u.TypeJob = job.TypeJobID " +
                "where Role = 2 and UserID = @UserID";
            using (var connections = _context.CreateConnection())
            {
                connections.Open();
                var res = await connections.QuerySingleOrDefaultAsync<UserViewModel>(query, new { @UserID = id});
                connections.Close();
                if (res == null)
                {
                    return null;
                }
                return res;
            }
        }

        public async Task<bool> RemoveMason(int id)
        {
            var query = "update tblUsers set Status = 5, UpdateDate = @UpdateDate where UserID = @UserID";
            var parameters = new DynamicParameters();
            
            parameters.Add("UpdateDate", DateTime.Now, DbType.DateTime);
            parameters.Add("UserID", id, DbType.Int32);

            using (var connections = _context.CreateConnection())
            {
                connections.Open();
                var res = await connections.ExecuteAsync(query, parameters);
                connections.Close();
                if (res == 0)
                {
                    return false;
                }
                return true;
            }
        }

        public async Task<bool> UpdateMason(UpdateMason mason)
        {
            var query = "update tblUsers set FullName = @FullName, PhoneNumber = @PhoneNumber, Address = @Address, Email = @Email, Role = 2, TypeJob = @TypeJob, UpdateDate = @UpdateDate, Status = 4 " +
                "where UserID = @UserID";

            var parameters = new DynamicParameters();
            parameters.Add("FullName", mason.MasonName, DbType.String);
            parameters.Add("PhoneNumber", mason.MasonPhoneNumber, DbType.String);
            parameters.Add("Address", mason.MasonAddress, DbType.String);
            parameters.Add("Email", mason.MasonEmail, DbType.String);
            parameters.Add("TypeJob", mason.TypeJob, DbType.Int32);
            parameters.Add("UpdateDate", DateTime.Now, DbType.DateTime);
            parameters.Add("UserID", mason.MasonId, DbType.Int32);

            using (var connections = _context.CreateConnection())
            {
                connections.Open();
                var res = await connections.ExecuteAsync(query, parameters);
                connections.Close();
                if (res == 0)
                {
                    return false;
                }
                return true;
            }
        }

        public async Task<bool> CreateAccountMason(CreateMason mason)
        {
            var query = "insert into tblUsers(FullName, PhoneNumber, Address, Email, Role, TypeJob, CreateDate, Status) " +
                "values(@FullName, @PhoneNumber, @Address, @Email, @Role, @TypeJob, @CreateDate, @Status) ";

            var parameters = new DynamicParameters();
            parameters.Add("FullName", mason.FullName, DbType.String);
            parameters.Add("PhoneNumber", mason.PhoneNumber, DbType.String);
            parameters.Add("Address", mason.Address, DbType.String);
            parameters.Add("Email", mason.Email, DbType.String);
            parameters.Add("TypeJob", mason.TypeJob, DbType.String);
            parameters.Add("Role", 2, DbType.Int32);
            parameters.Add("CreateDate", DateTime.Now, DbType.DateTime);
            parameters.Add("Status", 4, DbType.Int32);

            using (var connection = _context.CreateConnection())
            {
                connection.Open();
                var check = await connection.ExecuteAsync(query, parameters);
                connection.Close();
                if (check == 0)
                {
                    return false;
                }
                return true;
            }
        }
    }
}
