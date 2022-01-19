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
    public class ServiceRepository : IServiceRepository
    {
        private readonly DapperContext _context;

        public ServiceRepository(DapperContext context)
        {
            _context = context;
        }

        public async Task<bool> AssignMansonToRequest(AssignJob job)
        {
            var query = "insert into tblRepairDetail(RequestDetailID, MansonID, RepairStatus) values(@RequestDetailID, @MansonID, @RepairStatus)";
            int row;

            foreach (var manson in job.MansonList)
            {
                var parameters = new DynamicParameters();
                parameters.Add("RequestDetailID", job.RequestDetail, DbType.Int32);
                parameters.Add("MansonID", manson, DbType.String);
                parameters.Add("RepairStatus", 2, DbType.Int32);

                using (var connection = _context.CreateConnection())
                {
                    connection.Open();
                    row = await connection.ExecuteAsync(query, parameters);
                    connection.Close();
                    if (row == 0)
                    {
                        return false;
                    }
                }
            }
            return true;
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
            var query = "INSERT INTO tblRequestServices(CustomerID, CustomerName, CustomerPhone, CustomerAddress, RequestServiceDescription, RequestServiceStatus, RequestServiceCreateDate) " +
                "VALUES (@CustomerID, @CustomerName, @CustomerPhone, @CustomerAddress, @RequestServiceDescription, 2, @RequestServiceCreateDate) " +
                "SELECT CAST(SCOPE_IDENTITY() as int)";

            var parameters = new DynamicParameters();
            parameters.Add("CustomerID", model.CustomerId, DbType.Int32);
            parameters.Add("CustomerName", model.CustomerName, DbType.String);
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

        /*public async Task<IEnumerable<TblRequestService>> GetAllRequestService()
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
        }*/

        public async Task<IEnumerable<RequestService>> GetAllRequestService2()
        {
            var query = "select rs.RequestServiceID, CustomerID, CustomerName, CustomerPhone, CustomerAddress, RequestServiceDescription, RequestServiceCreateDate, UserID, FullName, PhoneNumber, Address, Email, StatusID, StatusName, MediaID, MediaUrl " +
                "from ((tblRequestServices rs join tblUsers u on rs.CustomerID = u.UserID) join tblStatus sta on rs.RequestServiceStatus = sta.StatusID) join tblMedia media on rs.RequestServiceID = media.RequestServiceID";

            using (var connection = _context.CreateConnection())
            {
                /*connection.Open();
                var res = await connection.QueryAsync<RequestService, UserViewModel, TblStatus, TblMedium, RequestService>(query, (requestService, user, status, media) =>
                {
                    requestService.User = user;
                    requestService.RequestServiceStatus = status;
                    requestService.Media.Add(media);
                    return requestService;
                }, splitOn: "UserID, StatusID, MediaID");
                connection.Close();
                if (res.Count() == 0)
                {
                    return null;
                }
                return res;*/

                connection.Open();
                var requestDict = new Dictionary<int, RequestService>();
                var res = await connection.QueryAsync<RequestService, UserViewModel, TblStatus, TblMedium, RequestService>(query, (requestService, user, status, media) =>
                {
                    RequestService currentRequest;
                    if(!requestDict.TryGetValue(requestService.RequestServiceId, out currentRequest))
                    {
                        currentRequest = requestService;
                        currentRequest.User = user;
                        currentRequest.RequestServiceStatus = status;
                        currentRequest.Media = new List<TblMedium>();
                        requestDict.Add(currentRequest.RequestServiceId, currentRequest);
                    }
                    currentRequest.Media.Add(media);
                    return currentRequest;
                }, splitOn: "UserID, StatusID, MediaID");
                connection.Close();
                if (res.Count() == 0)
                {
                    return null;
                }
                return res.Distinct().ToList();
            }

        }

        public async Task<IEnumerable<RequestService>> GetAllRequestServiceByMansonID(int id)
        {
            var query = "select rs.RequestServiceID, CustomerID, CustomerName, CustomerPhone, CustomerAddress, RequestServiceDescription, RequestServiceCreateDate, UserID, FullName, PhoneNumber, Address, Email, StatusID, StatusName, MediaID, MediaUrl " +
                "from ((((tblRequestServices rs join tblRequestDetails rd on rs.RequestServiceID = rd.RequestServiceID) join tblRepairDetail repair on rd.RequestDetaiID = repair.RequestDetailID) " +
                "join tblUsers u on u.UserID = rs.CustomerID) join tblStatus sta on rs.RequestServiceStatus = sta.StatusID) join tblMedia media on rs.RequestServiceID = media.RequestServiceID " +
                "where MansonID = @MansonID";

            using (var connection = _context.CreateConnection())
            {
                /*connection.Open();
                var service = await connection.QueryAsync<RequestService, UserViewModel, TblStatus, RequestService>(query, (requestService, user, status) =>
                {
                    requestService.User = user;
                    requestService.RequestServiceStatus = status;
                    return requestService;
                }, param: new { @MansonID = id}, splitOn: "UserID, StatusID");

                if (service.Count() == 0)
                {
                    return null;
                }
                return service;*/

                connection.Open();
                var requestDict = new Dictionary<int, RequestService>();
                var res = await connection.QueryAsync<RequestService, UserViewModel, TblStatus, TblMedium, RequestService>(query, (requestService, user, status, media) =>
                {
                    RequestService currentRequest;
                    if (!requestDict.TryGetValue(requestService.RequestServiceId, out currentRequest))
                    {
                        currentRequest = requestService;
                        currentRequest.User = user;
                        currentRequest.RequestServiceStatus = status;
                        currentRequest.Media = new List<TblMedium>();
                        requestDict.Add(currentRequest.RequestServiceId, currentRequest);
                    }
                    currentRequest.Media.Add(media);
                    return currentRequest;
                }, param: new { @MansonID = id }, splitOn: "UserID, StatusID, MediaID");
                connection.Close();
                if (res.Count() == 0)
                {
                    return null;
                }
                return res.Distinct().ToList();
            }
        }

        public async Task<IEnumerable<RequestService>> GetAllRequestServiceByUserID(int id)
        {
            var query = "select rs.RequestServiceID, CustomerID, CustomerName, CustomerPhone, CustomerAddress, RequestServiceDescription, RequestServiceCreateDate, UserID, FullName, PhoneNumber, Address, Email, StatusID, StatusName, MediaID, MediaUrl " +
                "from ((tblRequestServices rs join tblUsers u on rs.CustomerID = u.UserID) join tblStatus sta on rs.RequestServiceStatus = sta.StatusID) join tblMedia media on rs.RequestServiceID = media.RequestServiceID " +
                "where CustomerID = @CustomerID";

            /*var query = "select RequestServiceID, CustomerID, CustomerName, CustomerPhone, CustomerAddress, RequestServiceDescription, RequestServiceStatus, RequestServiceCreateDate " +
                "from tblRequestServices " +
                "where CustomerID = @CustomerID";*/

            using (var connection = _context.CreateConnection())
            {
                /*connection.Open();
                var service = await connection.QueryAsync<RequestService, UserViewModel, TblStatus, RequestService>(query, (requestService, user, status) =>
                {
                    requestService.User = user;
                    requestService.RequestServiceStatus = status;
                    return requestService;
                }, param: new { @CustomerID = id }, splitOn: "UserID, StatusID");

                if (service.Count() == 0)
                {
                    return null;
                }
                return service;*/

                connection.Open();
                var requestDict = new Dictionary<int, RequestService>();
                var res = await connection.QueryAsync<RequestService, UserViewModel, TblStatus, TblMedium, RequestService>(query, (requestService, user, status, media) =>
                {
                    RequestService currentRequest;
                    if (!requestDict.TryGetValue(requestService.RequestServiceId, out currentRequest))
                    {
                        currentRequest = requestService;
                        currentRequest.User = user;
                        currentRequest.RequestServiceStatus = status;
                        currentRequest.Media = new List<TblMedium>();
                        requestDict.Add(currentRequest.RequestServiceId, currentRequest);
                    }
                    currentRequest.Media.Add(media);
                    return currentRequest;
                }, param: new { @CustomerID = id }, splitOn: "UserID, StatusID, MediaID");
                connection.Close();
                if (res.Count() == 0)
                {
                    return null;
                }
                return res.Distinct().ToList();
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

        public async Task<IEnumerable<RequestService>> GetAllServiceByDate(DateTime? date)
        {
            var query = "select rs.RequestServiceID, CustomerID, CustomerName, CustomerPhone, CustomerAddress, RequestServiceDescription, RequestServiceCreateDate, UserID, FullName, PhoneNumber, Address, Email, StatusID, StatusName, MediaID, MediaUrl " +
                "from ((tblRequestServices rs join tblUsers u on rs.CustomerID = u.UserID) join tblStatus sta on rs.RequestServiceStatus = sta.StatusID) join tblMedia media on rs.RequestServiceID = media.RequestServiceID " +
                "where RequestServiceCreateDate = @RequestServiceCreateDate";

            using (var connection = _context.CreateConnection())
            {
                connection.Open();
                var requestDict = new Dictionary<int, RequestService>();
                var res = await connection.QueryAsync<RequestService, UserViewModel, TblStatus, TblMedium, RequestService>(query, (requestService, user, status, media) =>
                {
                    RequestService currentRequest;
                    if (!requestDict.TryGetValue(requestService.RequestServiceId, out currentRequest))
                    {
                        currentRequest = requestService;
                        currentRequest.User = user;
                        currentRequest.RequestServiceStatus = status;
                        currentRequest.Media = new List<TblMedium>();
                        requestDict.Add(currentRequest.RequestServiceId, currentRequest);
                    }
                    currentRequest.Media.Add(media);
                    return currentRequest;
                }, param: new { @RequestServiceCreateDate = date }, splitOn: "UserID, StatusID, MediaID");
                connection.Close();
                if (res.Count() == 0)
                {
                    return null;
                }
                return res.Distinct().ToList();
            }
        }

        public async Task<IEnumerable<RequestService>> GetAllServiceByStatus(int status)
        {
            var query = "select rs.RequestServiceID, CustomerID, CustomerName, CustomerPhone, CustomerAddress, RequestServiceDescription, RequestServiceCreateDate, UserID, FullName, PhoneNumber, Address, Email, StatusID, StatusName, MediaID, MediaUrl " +
                "from ((tblRequestServices rs join tblUsers u on rs.CustomerID = u.UserID) join tblStatus sta on rs.RequestServiceStatus = sta.StatusID) join tblMedia media on rs.RequestServiceID = media.RequestServiceID " +
                "where RequestServiceStatus = @RequestServiceStatus";

            using (var connection = _context.CreateConnection())
            {
                connection.Open();
                var requestDict = new Dictionary<int, RequestService>();
                var res = await connection.QueryAsync<RequestService, UserViewModel, TblStatus, TblMedium, RequestService>(query, (requestService, user, status, media) =>
                {
                    RequestService currentRequest;
                    if (!requestDict.TryGetValue(requestService.RequestServiceId, out currentRequest))
                    {
                        currentRequest = requestService;
                        currentRequest.User = user;
                        currentRequest.RequestServiceStatus = status;
                        currentRequest.Media = new List<TblMedium>();
                        requestDict.Add(currentRequest.RequestServiceId, currentRequest);
                    }
                    currentRequest.Media.Add(media);
                    return currentRequest;
                }, param: new { @RequestServiceStatus = status }, splitOn: "UserID, StatusID, MediaID");
                connection.Close();
                if (res.Count() == 0)
                {
                    return null;
                }
                return res.Distinct().ToList();
            }
        }

        public async Task<IEnumerable<RequestService>> GetAllServiceByStatusAndUserID(int user, int status)
        {
            var query = "select rs.RequestServiceID, CustomerID, CustomerName, CustomerPhone, CustomerAddress, RequestServiceDescription, RequestServiceCreateDate, UserID, FullName, PhoneNumber, Address, Email, StatusID, StatusName, MediaID, MediaUrl " +
                "from ((tblRequestServices rs join tblUsers u on rs.CustomerID = u.UserID) join tblStatus sta on rs.RequestServiceStatus = sta.StatusID) join tblMedia media on rs.RequestServiceID = media.RequestServiceID " +
                "where CustomerID = @CustomerID and RequestServiceStatus = @RequestServiceStatus";

            using (var connection = _context.CreateConnection())
            {
                connection.Open();
                var requestDict = new Dictionary<int, RequestService>();
                var res = await connection.QueryAsync<RequestService, UserViewModel, TblStatus, TblMedium, RequestService>(query, (requestService, user, status, media) =>
                {
                    RequestService currentRequest;
                    if (!requestDict.TryGetValue(requestService.RequestServiceId, out currentRequest))
                    {
                        currentRequest = requestService;
                        currentRequest.User = user;
                        currentRequest.RequestServiceStatus = status;
                        currentRequest.Media = new List<TblMedium>();
                        requestDict.Add(currentRequest.RequestServiceId, currentRequest);
                    }
                    currentRequest.Media.Add(media);
                    return currentRequest;
                }, param: new { @CustomerID = user, @RequestServiceStatus = status }, splitOn: "UserID, StatusID, MediaID");
                connection.Close();
                if (res.Count() == 0)
                {
                    return null;
                }
                return res.Distinct().ToList();
            }
        }

        public async Task<RequestService> GetRequestServiceByID(int id)
        {
            var query = "select rs.RequestServiceID, CustomerID, CustomerName, CustomerPhone, CustomerAddress, RequestServiceDescription, RequestServiceCreateDate, UserID, FullName, PhoneNumber, Address, Email, StatusID, StatusName, MediaID, MediaUrl " +
                "from ((tblRequestServices rs join tblUsers u on rs.CustomerID = u.UserID) join tblStatus sta on rs.RequestServiceStatus = sta.StatusID) join tblMedia media on rs.RequestServiceID = media.RequestServiceID " +
                "where rs.RequestServiceID = @RequestServiceID";

            using (var connection = _context.CreateConnection())
            {
                connection.Open();
                var requestDict = new Dictionary<int, RequestService>();
                var res = await connection.QueryAsync<RequestService, UserViewModel, TblStatus, TblMedium, RequestService>(query, (requestService, user, status, media) =>
                {
                    RequestService currentRequest;
                    if (!requestDict.TryGetValue(requestService.RequestServiceId, out currentRequest))
                    {
                        currentRequest = requestService;
                        currentRequest.User = user;
                        currentRequest.RequestServiceStatus = status;
                        currentRequest.Media = new List<TblMedium>();
                        requestDict.Add(currentRequest.RequestServiceId, currentRequest);
                    }
                    currentRequest.Media.Add(media);
                    return currentRequest;
                }, param: new { @RequestServiceID = id }, splitOn: "UserID, StatusID, MediaID");
                connection.Close();
                if (res.Count() == 0)
                {
                    return null;
                }
                return res.First();
            }
        }

        public async Task<IEnumerable<RequestServiceDetailViewModel>> GetRequestServiceDetailsByRequestServiceID(int id)
        {
            var query = "select RequestDetaiID, RequestServiceID, detail.ServiceID, ser.ServiceID, ServiceName " +
                "from tblRequestDetails detail join tblServices ser on detail.ServiceID = ser.ServiceID " +
                "where RequestServiceID = @RequestServiceID";

            using (var connection = _context.CreateConnection())
            {
                connection.Open();
                var res = await connection.QueryAsync<RequestServiceDetailViewModel, TblService, RequestServiceDetailViewModel>(query, (requestDetail, service) =>
                {
                    requestDetail.Service = service;
                    return requestDetail;
                }, param: new { @RequestServiceID = id }, splitOn: "ServiceID");
                connection.Close();
                if (res.Count() == 0)
                {
                    return null;
                }
                return res;
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

        public async Task<IEnumerable<TblService>> GetServiceByName(string name)
        {
            var query = "select ServiceID, ServiceName, ServiceDescription, ServicePrice, ServiceStatus, TypeMansonJob " +
                "from tblServices " +
                "where ServiceName like @ServiceName";

            using (var connection = _context.CreateConnection())
            {
                connection.Open();
                var service = await connection.QueryAsync<TblService>(query, new { @ServiceName = "%" + name + "%"});
                connection.Close();
                return service;
            }
        }
    }
}
