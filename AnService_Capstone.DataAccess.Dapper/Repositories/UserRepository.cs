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
            var query = "select UserID, Username, Password, FullName, PhoneNumber, Address, Email, RoleName, TypeJob, CreateDate, Status " +
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
            /*var query = "select UserID, Username, Password, FullName, PhoneNumber, Address, Email, InviteCode, RoleName, CreateDate, Status, TypeJobID, TypeJobName " +
                "from (tblUsers u join tblRoles r on u.Role = r.RoleID) " +
                "join tblTypeJobs job on u.TypeJob = job.TypeJobID " +
                "where PhoneNumber = @PhoneNumber and Status = 4";*/
            var query = "select UserID, Username, Password, FullName, PhoneNumber, Address, Email, RoleName, CreateDate, Status " +
                "from (tblUsers u join tblRoles r on u.Role = r.RoleID) " +
                "where PhoneNumber = @PhoneNumber";
            using (var connection = _context.CreateConnection())
            {
                connection.Open();
                var user = await connection.QuerySingleOrDefaultAsync<UserViewModel>(query, new { @PhoneNumber = phoneNumber });
                connection.Close();
                return user;
            }
            /*using (var connections = _context.CreateConnection())
            {
                connections.Open();
                var res = await connections.QueryAsync<UserViewModel, TblTypeJob, UserViewModel>(query, (user, typeJob) =>
                {
                    user.TypeJob = typeJob;
                    return user;
                }, param: new { @PhoneNumber = phoneNumber}, splitOn: "TypeJobID");
                connections.Close();
                if (res.Count() == 0)
                {
                    return null;
                }
                return res.FirstOrDefault();
            }*/
        }

        public async Task<int> CreateAccountCustomer(CreateCustomer customer)
        {
            var query = "insert into tblUsers(FullName, PhoneNumber, Address, Email, Role, CreateDate, Status) " +
                "values(@FullName, @PhoneNumber, @Address, @Email, @Role, @CreateDate, @Status) " +
                "SELECT CAST(SCOPE_IDENTITY() as int)";

            var parameters = new DynamicParameters();
            parameters.Add("FullName", customer.FullName, DbType.String);
            parameters.Add("PhoneNumber", customer.PhoneNumber, DbType.String);
            parameters.Add("Address", customer.Address, DbType.String);
            parameters.Add("Email", customer.Email, DbType.String);
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

        /*public async Task<bool> CheckInviteCodeExist(string code)
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
        }*/

        public async Task<IEnumerable<TblUser>> GetWorkerByServiceID(int id)
        {
            var query = "select UserID, FullName, PhoneNumber, Status " +
                "from (tblUsers u join tblTypeJobs t on u.TypeJob = t.TypeJobID) join tblServices s on s.TypeWorkerJob = t.TypeJobID " +
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

        /*public async Task<IEnumerable<UserViewModel>> GetAllWorker()
        {
            var query = "select UserID, FullName, PhoneNumber, Address, Email, CreateDate, Status, TypeJobID, TypeJobName " +
                "from tblUsers u join tblTypeJobs job on u.TypeJob = job.TypeJobID " +
                "where Role = 2 and Status = 4";
            using (var connections = _context.CreateConnection())
            {
                connections.Open();
                var res = await connections.QueryAsync<UserViewModel, TblTypeJob, UserViewModel>(query, (user, typeJob) =>
                {
                    user.TypeJob = typeJob;
                    return user;
                }, splitOn: "TypeJobID");
                connections.Close();
                if (res.Count() == 0)
                {
                    return null;
                }
                return res;
            }
        }*/

        public async Task<UserViewModel> GetWorkerByID(int id)
        {
            var query = "select UserID, FullName, PhoneNumber, Address, Email, CreateDate, Status, TypeJobID, TypeJobName " +
                "from tblUsers u join tblTypeJobs job on u.TypeJob = job.TypeJobID " +
                "where Role = 2 and UserID = @UserID";
            using (var connections = _context.CreateConnection())
            {
                connections.Open();
                var res = await connections.QueryAsync<UserViewModel, TblTypeJob, UserViewModel>(query, (user, typeJob) =>
                {
                    user.TypeJob = typeJob;
                    return user;
                }, param: new { @UserID = id} , splitOn: "TypeJobID");
                if (res == null)
                {
                    return null;
                }
                return res.FirstOrDefault();
            }
        }

        public async Task<bool> RemoveWorker(int id)
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

        public async Task<bool> UpdateWorker(UpdateWorker worker)
        {
            var query = "update tblUsers set FullName = @FullName, PhoneNumber = @PhoneNumber, Address = @Address, Email = @Email, TypeJob = @TypeJob, UpdateDate = @UpdateDate " +
                "where UserID = @UserID";

            var parameters = new DynamicParameters();
            parameters.Add("FullName", worker.WorkerName, DbType.String);
            parameters.Add("PhoneNumber", worker.WorkerPhoneNumber, DbType.String);
            parameters.Add("Address", worker.WorkerAddress, DbType.String);
            parameters.Add("Email", worker.WorkerEmail, DbType.String);
            parameters.Add("TypeJob", worker.TypeJob.TypeJobId, DbType.Int32);
            parameters.Add("UpdateDate", DateTime.Now, DbType.DateTime);
            parameters.Add("UserID", worker.WorkerId, DbType.Int32);

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

        public async Task<bool> CreateAccountWorker(CreateWorker worker)
        {
            var query = "insert into tblUsers(FullName, PhoneNumber, Address, Email, Role, TypeJob, CreateDate, Status) " +
                "values(@FullName, @PhoneNumber, @Address, @Email, @Role, @TypeJob, @CreateDate, @Status) ";

            var parameters = new DynamicParameters();
            parameters.Add("FullName", worker.FullName, DbType.String);
            parameters.Add("PhoneNumber", worker.PhoneNumber, DbType.String);
            parameters.Add("Address", worker.Address, DbType.String);
            parameters.Add("Email", worker.Email, DbType.String);
            parameters.Add("TypeJob", worker.TypeJobId, DbType.String);
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

        /*public async Task<IEnumerable<UserViewModel>> GetAllWorkerByTypeJob(int id)
        {
            var query = "select UserID, FullName, PhoneNumber, Address, Email, CreateDate, Status, TypeJobID, TypeJobName " +
                "from tblUsers u join tblTypeJobs job on u.TypeJob = job.TypeJobID " +
                "where Role = 2 and Status = 4 and TypeJobID = @TypeJobID";
            using (var connections = _context.CreateConnection())
            {
                connections.Open();
                var res = await connections.QueryAsync<UserViewModel, TblTypeJob, UserViewModel>(query, (user, typeJob) =>
                {
                    user.TypeJob = typeJob;
                    return user;
                }, param: new { @TypeJobID = id}, splitOn: "TypeJobID");
                connections.Close();
                if (res.Count() == 0)
                {
                    return null;
                }
                return res;
            }
        }*/

        /*public async Task<IEnumerable<UserViewModel>> GetAllWorkerByName(string name)
        {
            var query = "select UserID, FullName, PhoneNumber, Address, Email, CreateDate, Status, TypeJobID, TypeJobName " +
                "from tblUsers u join tblTypeJobs job on u.TypeJob = job.TypeJobID " +
                "where Role = 2 and Status = 4 and FullName like @FullName";
            using (var connections = _context.CreateConnection())
            {
                connections.Open();
                var res = await connections.QueryAsync<UserViewModel, TblTypeJob, UserViewModel>(query, (user, typeJob) =>
                {
                    user.TypeJob = typeJob;
                    return user;
                }, param: new { @FullName = "%" + name + "%" }, splitOn: "TypeJobID");
                connections.Close();
                *//*if (res.Count() == 0)
                {
                    return null;
                }*//*
                return res;
            }
        }*/

        /*public async Task<IEnumerable<UserViewModel>> GetAllWorkerByPhone(string phone)
        {
            var query = "select UserID, FullName, PhoneNumber, Address, Email, CreateDate, Status, TypeJobID, TypeJobName " +
                "from tblUsers u join tblTypeJobs job on u.TypeJob = job.TypeJobID " +
                "where Role = 2 and Status = 4 and PhoneNumber like @PhoneNumber";
            using (var connections = _context.CreateConnection())
            {
                connections.Open();
                var res = await connections.QueryAsync<UserViewModel, TblTypeJob, UserViewModel>(query, (user, typeJob) =>
                {
                    user.TypeJob = typeJob;
                    return user;
                }, param: new { @PhoneNumber = "%" + phone + "%"}, splitOn: "TypeJobID");
                connections.Close();
                *//*if (res.Count() == 0)
                {
                    return null;
                }*//*
                return res;
            }
        }*/

        public async Task<UserViewModel> GetCustomerByID(int id)
        {
            var query = "select UserID, FullName, PhoneNumber, Address, Email, CreateDate, Status " +
                "from tblUsers " +
                "where Role = 3 and UserID = @UserID";
            using (var connections = _context.CreateConnection())
            {
                connections.Open();
                var res = await connections.QueryAsync<UserViewModel>(query, new { @UserID = id});
                if (!res.Any())
                {
                    return null;
                }
                return res.FirstOrDefault();
            }
        }

        public async Task<bool> UpdateStatusUserByID(int id, int status)
        {
            var query = "update tblUsers set Status = @Status where UserID = @UserID";

            using (var connections = _context.CreateConnection())
            {
                connections.Open();
                var res = await connections.ExecuteAsync(query, new { @Status = status, @UserID = id });
                if (res == 0)
                {
                    return false;
                }
                return true;
            }
        }

        public async Task<IEnumerable<UserViewModel>> GetAllCustomers(string id, string name, string phone)
        {
            var query = "select UserID, FullName, PhoneNumber, Address, Email, CreateDate, Status " +
                "from tblUsers " +
                "where Role = 3 and FullName like @FullName and PhoneNumber like @PhoneNumber and Status = COALESCE(@Status, Status)";

            using (var connection = _context.CreateConnection())
            {
                connection.Open();
                var res = await connection.QueryAsync<UserViewModel>(query, new { @FullName = "%" + name + "%", @PhoneNumber = "%" + phone + "%", @Status = id });
                connection.Close();
                /*if (!res.Any())
                {
                    return null;
                }*/
                return res;
            }
        }

        /*public async Task<IEnumerable<UserViewModel>> GetAllCustomersByName(string name)
        {
            var query = "select UserID, FullName, PhoneNumber, Address, Email, CreateDate, Status " +
                "from tblUsers " +
                "where Role = 3 and Status = 4 and FullName like @FullName";

            using (var connection = _context.CreateConnection())
            {
                connection.Open();
                var res = await connection.QueryAsync<UserViewModel>(query, new { @FullName = "%" + name + "%"});
                connection.Close();
                *//*if (!res.Any())
                {
                    return null;
                }*//*
                return res;
            }
        }

        public async Task<IEnumerable<UserViewModel>> GetAllCustomersByPhone(string phone)
        {
            var query = "select UserID, FullName, PhoneNumber, Address, Email, CreateDate, Status " +
                "from tblUsers " +
                "where Role = 3 and Status = 4 and PhoneNumber like @PhoneNumber";

            using (var connection = _context.CreateConnection())
            {
                connection.Open();
                var res = await connection.QueryAsync<UserViewModel>(query, new { @PhoneNumber = "%" + phone + "%" });
                connection.Close();
                *//*if (!res.Any())
                {
                    return null;
                }*//*
                return res;
            }
        }*/

        /*public async Task<IEnumerable<UserViewModel>> GetAllCustomersByPhoneAndName(string phone, string name)
        {
            var query = "select UserID, FullName, PhoneNumber, Address, Email, CreateDate, Status " +
                "from tblUsers " +
                "where Role = 3 and Status = 4 and (PhoneNumber like @PhoneNumber and FullName like @FullName)";

            using (var connection = _context.CreateConnection())
            {
                connection.Open();
                var res = await connection.QueryAsync<UserViewModel>(query, new { @PhoneNumber = "%" + phone + "%" });
                connection.Close();
                *//*if (!res.Any())
                {
                    return null;
                }*//*
                return res;
            }
        }*/

        public async Task<IEnumerable<UserViewModel>> GetAllWorker(string id, string phone, string name)
        {
            var query = "select UserID, FullName, PhoneNumber, Address, Email, CreateDate, Status, TypeJobID, TypeJobName " +
                "from tblUsers u join tblTypeJobs job on u.TypeJob = job.TypeJobID " +
                "where Role = 2 and Status = 4 and PhoneNumber like @PhoneNumber and FullName like @FullName and TypeJobID = COALESCE(@TypeJobID, TypeJobID) ";
            using (var connections = _context.CreateConnection())
            {
                connections.Open();
                var res = await connections.QueryAsync<UserViewModel, TblTypeJob, UserViewModel>(query, (user, typeJob) =>
                {
                    user.TypeJob = typeJob;
                    return user;
                }, param: new { @PhoneNumber = "%" + phone + "%", FullName = "%" + name + "%", @TypeJobID = id }, splitOn: "TypeJobID");
                connections.Close();
                if (res.Count() == 0)
                {
                    return null;
                }
                return res;
            }
        }

        public async Task<IEnumerable<UserViewModel>> GetAllNewUsersInMonth(int month, int role, int status)
        {
            var query = "select * from tblUsers where Role = @Role and Status = @Status and MONTH(CreateDate) = @CreateDate";

            using(var connections = _context.CreateConnection())
            {
                connections.Open();
                var res = await connections.QueryAsync<UserViewModel>(query, new { @CreateDate = month, @Role = role, @Status = status });
                connections.Close();
                return res;
            }
        }

        public async Task<bool> ChangePhoneNumber(int userID, string phoneNumber)
        {
            var query = "update tblUsers set PhoneNumber = @PhoneNumber where UserID = @UserID ";

            using(var connection = _context.CreateConnection())
            {
                connection.Open();
                var res = await connection.ExecuteAsync(query, new { @PhoneNumber = phoneNumber, @UserId = userID });
                connection.Close();
                if (res != 0)
                {
                    return true;
                }
                return false;
            }
        }

        /*public async Task<bool> CreateInviteCode(int userID, string code)
        {
            var query = "insert into tblInviteCode(CustomerID, Code, IsUsed, ExpireDate) " +
                "values (@CustomerID, @Code, @IsUsed, @ExpireDate)";
            
            var time = DateTime.Now.AddDays(30);

            var parameters = new DynamicParameters();
            parameters.Add("CustomerID", userID, DbType.Int32);
            parameters.Add("CustCodeomerID", code, DbType.String);
            parameters.Add("IsUsed", 0, DbType.Boolean);
            parameters.Add("ExpireDate", time, DbType.DateTime);

            using (var connection = _context.CreateConnection())
            {
                connection.Open();
                var res = await connection.ExecuteAsync(query, parameters);
                connection.Close();
                if (res == 0)
                {
                    return false;
                }
                return true;
            }
        }*/

        /*public async Task<UserViewModel> GetCustomerByInviteCode(string inviteCode)
        {
            var query = "select UserID, FullName, PhoneNumber, Address, Email, InviteCode, CreateDate, Status " +
                "from tblUsers " +
                "where InviteCode = @InviteCode";
            using (var connections = _context.CreateConnection())
            {
                connections.Open();
                var res = await connections.QueryAsync<UserViewModel>(query, new { InviteCode = inviteCode });
                if (!res.Any())
                {
                    return null;
                }
                return res.FirstOrDefault();
            }
        }*/
    }
}
