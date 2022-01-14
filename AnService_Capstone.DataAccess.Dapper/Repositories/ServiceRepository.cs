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
    public class ServiceRepository : IServiceRepository
    {
        private readonly DapperContext _context;

        public ServiceRepository(DapperContext context)
        {
            _context = context;
        }

        public async Task<bool> CreateMedia(int requestID, string url)
        {
            var query = "insert into tblMedia (RequestServiceID, MediaUrl) values (@RequestServiceID, @MediaUrl)";

            var parameters = new DynamicParameters();
            parameters.Add("RequestServiceID", requestID, DbType.Int32);
            parameters.Add("MediaUrl", url, DbType.String);

            using (var connection = _context.CreateConnection())
            {
                connection.Open();
                var result = await connection.ExecuteAsync(query, parameters);
                connection.Close();
                if (result > 0)
                {
                    return true;
                }
                return false;
            }
        }

        public async Task<bool> CreateRequestDetai(int requestID, int serviceID)
        {
            var query = "insert into tblRequestDetails (RequestServiceID, ServiceID) values (@RequestServiceID, @ServiceID)";

            var parameters = new DynamicParameters();
            parameters.Add("RequestServiceID", requestID, DbType.Int32);
            parameters.Add("ServiceID", serviceID, DbType.Int32);

            using (var connection = _context.CreateConnection())
            {
                connection.Open();
                var result = await connection.ExecuteAsync(query, parameters);
                connection.Close();
                if (result > 0)
                {
                    return true;
                }
                return false;
            }
        }

        public async Task<int> CreateRequestService(CreateService model)
        {
            var query = "INSERT INTO tblRequestServices(CustomerID, CustomerPhone, CustomerAddress, RequestServiceDescription, RequestServiceStatus, RequestServiceCreateDate) " +
                "VALUES (@CustomerID, @CustomerPhone, @CustomerAddress, @RequestServiceDescription, 2, @RequestServiceCreateDate) " +
                "SELECT CAST(SCOPE_IDENTITY() as int)";

            var parameters = new DynamicParameters();
            parameters.Add("CustomerID", model.CustomerId, DbType.Int32);
            parameters.Add("CustomerPhone", model.CustomerPhone, DbType.String);
            parameters.Add("CustomerAddress", model.CustomerAddress, DbType.String);
            parameters.Add("RequestServiceDescription", model.RequestServiceDescription, DbType.String);
            parameters.Add("RequestServiceCreateDate", DateTime.Now, DbType.DateTime);

            using (var connection = _context.CreateConnection())
            {
                connection.Open();
                var id = await connection.QuerySingleAsync<int>(query, parameters);
                connection.Close();
                return id;
            }
        }

        public async Task<IEnumerable<TblRequestService>> GetAllRequestService()
        {
            var query = "select RequestServiceID, CustomerID, CustomerPhone, CustomerAddress, RequestServiceDescription, RequestServiceStatus, RequestServiceCreateDate " +
                "from tblRequestServices";

            using (var connection = _context.CreateConnection())
            {
                connection.Open();
                var service = await connection.QueryAsync<TblRequestService>(query);
                connection.Close();
                return service;
            }
        }

        public async Task<IEnumerable<TblRequestService>> GetAllRequestServiceByUserID(int id)
        {
            var query = "select RequestServiceID, CustomerID, CustomerPhone, CustomerAddress, RequestServiceDescription, RequestServiceStatus, RequestServiceCreateDate " +
                "from tblRequestServices " +
                "where CustomerID = @CustomerID";

            using (var connection = _context.CreateConnection())
            {
                connection.Open();
                var service = await connection.QueryAsync<TblRequestService>(query, new { @CustomerID = id });
                connection.Close();
                if (service.Count() == 0)
                {
                    return null;
                }
                return service;
            }
        }

        public async Task<IEnumerable<TblService>> GetAllService()
        {
            var query = "select ServiceID, ServiceName, ServiceDescription, ServicePrice, ServiceStatus " +
                "from tblServices";

            using (var connection = _context.CreateConnection())
            {
                connection.Open();
                var service = await connection.QueryAsync<TblService>(query);
                connection.Close();
                return service;
            }
        }

        public async Task<TblService> GetServiceByID(int id)
        {
            var query = "select ServiceID, ServiceName, ServiceDescription, ServicePrice, ServiceStatus " +
                "from tblServices " +
                "where ServiceID = @ServiceID";

            using (var connection = _context.CreateConnection())
            {
                connection.Open();
                var service = await connection.QuerySingleOrDefaultAsync<TblService>(query, new { @ServiceID = id });
                connection.Close();
                return service;
            }
        }
    }
}
