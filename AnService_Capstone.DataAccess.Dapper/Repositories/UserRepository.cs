using AnService_Capstone.Core.Interfaces;
using AnService_Capstone.Core.Models.Request;
using AnService_Capstone.Core.Models.Response;
using AnService_Capstone.DataAccess.Dapper.Context;
using Dapper;
using System;
using System.Collections.Generic;
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

        public async Task<UserViewModel> Login(UserLogin login)
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
    }
}
