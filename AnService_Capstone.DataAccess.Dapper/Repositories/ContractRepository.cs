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
    public class ContractRepository : IContractRepository
    {
        private readonly DapperContext _context;

        public ContractRepository(DapperContext context)
        {
            _context = context;
        }

        public async Task<TblContract> CheckContractExist(int requestID)
        {
            var query = "select * from tblContract where RequestServiceID = @RequestServiceID";

            using (var connection = _context.CreateConnection())
            {
                connection.Open();
                var res = await connection.QueryAsync<TblContract>(query, new { @RequestServiceID = requestID});
                connection.Close();
                if (!res.Any())
                {
                    return null;
                }
                return res.First();
            }
        }

        public async Task<bool> ApproveContract(int id)
        {
            var query = "update tblContract set ContractStatus = @ContractStatus, ContractUpdateDate = @ContractUpdateDate  where ContractID = @ContractID";

            using (var connection = _context.CreateConnection())
            {
                connection.Open();
                var res = await connection.ExecuteAsync(query, new { @ContractStatus = 3, @ContractID = id, @ContractUpdateDate = DateTime.Now }); ;
                connection.Close();
                if (res == 0)
                {
                    return false;
                }
                return true;
            }
        }

        public async Task<bool> CreateContract(int id, string name, string url, int requestID)
        {
            var query = "insert into tblContract(CustomerID,RequestServiceID,ContractTitle,ContractUrl,ContractStatus,ContractCreateDate) " +
                "values (@CustomerID,@RequestServiceID,@ContractTitle,@ContractUrl,@ContractStatus,@ContractCreateDate)";

            var parameters = new DynamicParameters();
            parameters.Add("CustomerID", id, DbType.Int32);
            parameters.Add("RequestServiceID", requestID, DbType.Int32);
            parameters.Add("ContractTitle", "Hợp đồng " + name, DbType.String);
            parameters.Add("ContractUrl", url, DbType.String);
            parameters.Add("ContractStatus", 2, DbType.Int32);
            parameters.Add("ContractCreateDate", DateTime.Now, DbType.DateTime);

            using(var connection = _context.CreateConnection())
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

        public async Task<bool> DenyContract(int id)
        {
            var query = "update tblContract set ContractStatus = @ContractStatus, ContractUpdateDate = @ContractUpdateDate  where ContractID = @ContractID";

            using (var connection = _context.CreateConnection())
            {
                connection.Open();
                var res = await connection.ExecuteAsync(query, new { @ContractStatus = 1, @ContractID = id, @ContractUpdateDate = DateTime.Now }); ;
                connection.Close();
                if (res == 0)
                {
                    return false;
                }
                return true;
            }
        }

        public async Task<IEnumerable<TblContract>> GetContractListByUserID(int id)
        {
            var query = "select * from tblContract where CustomerID = @CustomerID";

            using (var connection = _context.CreateConnection())
            {
                connection.Open();
                var res = await connection.QueryAsync<TblContract>(query, new { @CustomerID = id});
                connection.Close();
                /*if (!res.Any())
                {
                    return null;
                }*/
                return res;
            }
        }

        public async Task<bool> RequestUpdateContract(int id)
        {
            var query = "update tblContract set ContractStatus = @ContractStatus, ContractUpdateDate = @ContractUpdateDate  where ContractID = @ContractID";

            using (var connection = _context.CreateConnection())
            {
                connection.Open();
                var res = await connection.ExecuteAsync(query, new { @ContractStatus = 7, @ContractID = id, @ContractUpdateDate = DateTime.Now }); ;
                connection.Close();
                if (res == 0)
                {
                    return false;
                }
                return true;
            }
        }

        public async Task<bool> UpdateStatusContract(int id, int status)
        {
            var query = "update tblContract set ContractStatus = @ContractStatus, ContractUpdateDate = @ContractUpdateDate  where ContractID = @ContractID";

            using (var connection = _context.CreateConnection())
            {
                connection.Open();
                var res = await connection.ExecuteAsync(query, new { @ContractStatus = status, @ContractID = id, @ContractUpdateDate = DateTime.Now }); ;
                connection.Close();
                if (res == 0)
                {
                    return false;
                }
                return true;
            }
        }

        public async Task<bool> UpdateContractURL(string url, int contractID)
        {
            var query = "update tblContract set ContractUrl = @ContractUrl, ContractUpdateDate = @ContractUpdateDate  where ContractID = @ContractID";

            using (var connection = _context.CreateConnection())
            {
                connection.Open();
                var res = await connection.ExecuteAsync(query, new { ContractUrl = url, @ContractID = contractID, @ContractUpdateDate = DateTime.Now }); ;
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
