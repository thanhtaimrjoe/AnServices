using AnService_Capstone.Core.Entities;
using AnService_Capstone.Core.Interfaces;
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
    public class InviteCodeRepository : IInviteCodeRepository
    {
        private readonly DapperContext _dapperContext;

        public InviteCodeRepository(DapperContext dapperContext)
        {
            _dapperContext = dapperContext;
        }

        public async Task<TblInviteCode> CheckInviteCode(string code)
        {
            var query = "select * from tblInviteCode where Code = @Code and IsUsed = 1";

            using (var connection = _dapperContext.CreateConnection())
            {
                connection.Open();
                var res = await connection.QueryAsync<TblInviteCode>(query, new { @Code = code });
                connection.Close();
                if (!res.Any())
                {
                    return null;
                }
                return res.FirstOrDefault();
            }
        }

        public async Task<bool> CreateInviteCode(int userID, string code)
        {
            var query = "insert into tblInviteCode(CustomerID, Code, IsUsed, ExpireDate) " +
                "values (@CustomerID, @Code, @IsUsed, @ExpireDate)";

            var time = DateTime.Now.AddDays(30);

            var parameters = new DynamicParameters();
            parameters.Add("CustomerID", userID, DbType.Int32);
            parameters.Add("Code", code, DbType.String);
            parameters.Add("IsUsed", 1, DbType.Boolean);
            parameters.Add("ExpireDate", time, DbType.DateTime);

            using (var connection = _dapperContext.CreateConnection())
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
        }

        public async Task<bool> UpdateIsUsedInviteCode(int id)
        {
            var query = "update tblInviteCode set IsUsed = 0 where InviteCodeID = @InviteCodeID";

            using (var connection = _dapperContext.CreateConnection())
            {
                connection.Open();
                var res = await connection.ExecuteAsync(query, new { @InviteCodeID = id});
                connection.Close();
                if (res == 0)
                {
                    return false;
                }
                return true;
            }
        }
    }
}
