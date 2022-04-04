using AnService_Capstone.Core.Entities;
using AnService_Capstone.Core.Interfaces;
using AnService_Capstone.Core.Models.Request;
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
            var query = "select * from tblContract where ServiceRequestID = @ServiceRequestID";

            using (var connection = _context.CreateConnection())
            {
                connection.Open();
                var res = await connection.QueryAsync<TblContract>(query, new { @ServiceRequestID = requestID});
                connection.Close();
                if (!res.Any())
                {
                    return null;
                }
                return res.First();
            }
        }

        /*public async Task<bool> ApproveContract(int id)
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
        }*/

        public async Task<bool> CreateContract(CreateContract contract)
        {
            var query = "insert into tblContract(CustomerID,ServiceRequestID,ContractTitle,ContractUrl,ContractStartDate,ContractEndDate,ContractDeposit,ContractTotalPrice,ContractStatus,ContractCreateDate) " +
                "values (@CustomerID,@ServiceRequestID,@ContractTitle,@ContractUrl,@ContractStartDate,@ContractEndDate,@ContractDeposit,@ContractTotalPrice,@ContractStatus,@ContractCreateDate) " +
                "SELECT CAST(SCOPE_IDENTITY() as int)";

            var parameters = new DynamicParameters();
            parameters.Add("CustomerID", contract.UserId, DbType.Int32);
            parameters.Add("ServiceRequestID", contract.RequestId, DbType.Int32);
            parameters.Add("ContractTitle", "Hợp đồng " + contract.Username, DbType.String);
            parameters.Add("ContractUrl", contract.ContractUrl, DbType.String);
            parameters.Add("ContractStartDate", contract.ContractStartDate, DbType.DateTime);
            parameters.Add("ContractEndDate", contract.ContractEndDate, DbType.DateTime);
            parameters.Add("ContractDeposit", contract.ContractDeposit, DbType.Double);
            parameters.Add("ContractTotalPrice", contract.ContractTotalPrice, DbType.Double);
            parameters.Add("ContractStatus", 2, DbType.Int32);
            parameters.Add("ContractCreateDate", DateTime.Now, DbType.DateTime);

            /*if (contract.ContractReference == 0)
            {
                parameters.Add("ContractReference", null, DbType.Int32);
            }
            else
            {
                parameters.Add("ContractReference", contract.ContractReference, DbType.Int32);
            }*/

            using (var connection = _context.CreateConnection())
            {
                connection.Open();
                var res = await connection.QueryAsync(query, parameters);
                connection.Close();
                if (!res.Any())
                {
                    return false;
                }
                return true;
            }
        }

        /*public async Task<bool> DenyContract(int id)
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
        }*/

        public async Task<IEnumerable<TblContract>> GetContractListByUserID(int id)
        {
            var query = "select * from tblContract where CustomerID = @CustomerID order by ContractCreateDate desc";

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

        /*public async Task<bool> RequestUpdateContract(int id)
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
        }*/

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

        public async Task<bool> UpdateContract(CreateContract contract, int contractID)
        {
            var query = "update tblContract set ContractUrl = @ContractUrl, ContractStartDate = @ContractStartDate, ContractEndDate = @ContractEndDate, ContractDeposit = @ContractDeposit, ContractTotalPrice = @ContractTotalPrice, ContractUpdateDate = @ContractUpdateDate where ContractID = @ContractID";

            var parameters = new DynamicParameters();
            
            parameters.Add("ContractUrl", contract.ContractUrl, DbType.String);
            parameters.Add("ContractStartDate", contract.ContractStartDate, DbType.DateTime);
            parameters.Add("ContractEndDate", contract.ContractEndDate, DbType.DateTime);
            parameters.Add("ContractDeposit", contract.ContractDeposit, DbType.Double);
            parameters.Add("ContractTotalPrice", contract.ContractTotalPrice, DbType.Double);
            parameters.Add("ContractStatus", 2, DbType.Int32);
            parameters.Add("ContractUpdateDate", DateTime.Now, DbType.DateTime);
            /*if (contract.ContractReference == 0)
            {
                parameters.Add("ContractReference", null, DbType.Int32);
            }
            else
            {
                parameters.Add("ContractReference", contract.ContractReference, DbType.Int32);
            }*/
            parameters.Add("ContractID", contractID, DbType.Int32); 

            using (var connection = _context.CreateConnection())
            {
                connection.Open();
                var res = await connection.ExecuteAsync(query, parameters); ;
                connection.Close();
                if (res == 0)
                {
                    return false;
                }
                return true;
            }
        }

        public async Task<TblContract> GetContractByServiceRequestID(int id)
        {
            var query = "select ContractID, CustomerID, ServiceRequestID, ContractTitle, ContractUrl, ContractStartDate, ContractEndDate, ContractDeposit, ContractTotalPrice, ContractStatus, ContractCreateDate, ContractUpdateDate " +
                "from tblContract " +
                "where ServiceRequestID = @ServiceRequestID";

            using (var connection = _context.CreateConnection())
            {
                connection.Open();
                var res = await connection.QueryFirstOrDefaultAsync<TblContract>(query, new { @ServiceRequestID = id});
                connection.Close();
                return res;
            }
        }

        public async Task<TblContract> GetContractByID(int id)
        {
            var query = "select * from tblContract where ContractID = @ContractID";

            using (var conn = _context.CreateConnection())
            {
                conn.Open();
                var res = await conn.QueryAsync<TblContract>(query, new { @ContractID = id });
                conn.Close();
                if (!res.Any())
                {
                    return null;
                }
                return res.FirstOrDefault();
            }
        }
    }
}
