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

        public async Task<bool> AssignWorkerToRequest(int RequestDetailId, int workerID, int status, int priority)
        {
            var query = "insert into tblRepairDetail(RequestDetailID, WorkerID, RepairDateBegin, IsPrimary, RequestDetailPriority) values(@RequestDetailID, @WorkerID, @RepairDateBegin, @IsPrimary, @RequestDetailPriority)";
            int row;

            var parameters = new DynamicParameters();
            parameters.Add("RequestDetailID", RequestDetailId, DbType.Int32);
            parameters.Add("WorkerID", workerID, DbType.String);
            parameters.Add("RepairDateBegin", DateTime.Now, DbType.DateTime);
            parameters.Add("IsPrimary", status, DbType.Boolean);
            parameters.Add("RequestDetailPriority", priority, DbType.Int32);

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
            return true;
        }

        /*public async Task<bool> CancelRequestServiceByIDForCustomer(int id)
        {
            var query = "update tblRequestServices set RequestServiceStatus = 8 where RequestServiceID = @RequestServiceID";

            using(var connection = _context.CreateConnection())
            {
                connection.Open();
                var res = await connection.ExecuteAsync(query, new { @RequestServiceID = id });
                connection.Close();
                if (res == 0)
                {
                    return false;
                }
                return true;
            }
        }*/

        /*public async Task<bool> CancelRequestServiceByIDForStaff(int id)
        {
            var query = "update tblRequestServices set RequestServiceStatus = 1 where RequestServiceID = @RequestServiceID";

            using (var connection = _context.CreateConnection())
            {
                connection.Open();
                var res = await connection.ExecuteAsync(query, new { @RequestServiceID = id });
                connection.Close();
                if (res == 0)
                {
                    return false;
                }
                return true;
            }
        }*/

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
            var query = "insert into tblRequestDetails (RequestServiceID, ServiceID, RequestDetailStatus) values (@RequestServiceID, @ServiceID, @RequestDetailStatus)";

            var parameters = new DynamicParameters();
            parameters.Add("RequestServiceID", requestID, DbType.Int32);
            parameters.Add("ServiceID", serviceID, DbType.Int32);
            parameters.Add("RequestDetailStatus", 2, DbType.Int32);

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
            var query = "INSERT INTO tblRequestServices(CustomerID, CustomerName, CustomerPhone, CustomerAddress, RequestServiceDescription, RequestServiceStatus, RequestServiceCreateDate, RequestServicePackage) " +
                "VALUES (@CustomerID, @CustomerName, @CustomerPhone, @CustomerAddress, @RequestServiceDescription, 2, @RequestServiceCreateDate, @RequestServicePackage) " +
                "SELECT CAST(SCOPE_IDENTITY() as int)";

            var parameters = new DynamicParameters();
            parameters.Add("CustomerID", model.CustomerId, DbType.Int32);
            parameters.Add("CustomerName", model.CustomerName, DbType.String);
            parameters.Add("CustomerPhone", model.CustomerPhone, DbType.String);
            parameters.Add("CustomerAddress", model.CustomerAddress, DbType.String);
            parameters.Add("RequestServiceDescription", model.RequestServiceDescription, DbType.String);
            parameters.Add("RequestServiceCreateDate", DateTime.Now, DbType.DateTime);
            parameters.Add("RequestServicePackage", model.RequestServicePackage, DbType.Int32);

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

        public async Task<IEnumerable<RequestService>> GetAllRequestService()
        {
            var query = "select rs.RequestServiceID, CustomerID, CustomerName, CustomerPhone, CustomerAddress, RequestServiceDescription, RequestServiceCreateDate, RequestServicePackage, UserID, FullName, PhoneNumber, Address, Email, CreateDate, sta.StatusID, StatusName, MediaID, MediaUrl " +
                "from ((tblRequestServices rs join tblUsers u on rs.CustomerID = u.UserID) join tblStatus sta on rs.RequestServiceStatus = sta.StatusID) join tblMedia media on rs.RequestServiceID = media.RequestServiceID " +
                "order by case " +
                "when RequestServiceStatus = 2 then 0 " +
                "when RequestServiceStatus = 3 then 1 " +
                "when RequestServiceStatus = 6 then 2 " +
                "when RequestServiceStatus = 8 then 3 " +
                "when RequestServiceStatus = 1 then 4 end, RequestServiceCreateDate DESC";

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
                /*if (res.Count() == 0)
                {
                    return null;
                }*/
                return res.Distinct().ToList();
            }

        }

        public async Task<IEnumerable<RequestService>> GetAllRequestServiceByWorkerID(int id)
        {
            var query = "select distinct rs.RequestServiceID, CustomerID, CustomerName, CustomerPhone, CustomerAddress, RequestServiceDescription, RequestServiceCreateDate, RequestServicePackage, UserID, FullName, PhoneNumber, Address, Email, StatusID, StatusName, MediaID, MediaUrl " +
                "from ((((tblRequestServices rs join tblRequestDetails rd on rs.RequestServiceID = rd.RequestServiceID) join tblRepairDetail repair on rd.RequestDetailID = repair.RequestDetailID) " +
                "join tblUsers u on u.UserID = rs.CustomerID) join tblStatus sta on rs.RequestServiceStatus = sta.StatusID) join tblMedia media on rs.RequestServiceID = media.RequestServiceID " +
                "where WorkerID = @WorkerID " +
                "order by StatusID ASC, RequestServiceCreateDate DESC";

            using (var connection = _context.CreateConnection())
            {
                /*connection.Open();
                var service = await connection.QueryAsync<RequestService, UserViewModel, TblStatus, RequestService>(query, (requestService, user, status) =>
                {
                    requestService.User = user;
                    requestService.RequestServiceStatus = status;
                    return requestService;
                }, param: new { @WorkerID = id}, splitOn: "UserID, StatusID");

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
                }, param: new { @WorkerID = id }, splitOn: "UserID, StatusID, MediaID");
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
            var query = "select rs.RequestServiceID, CustomerID, CustomerName, CustomerPhone, CustomerAddress, RequestServiceDescription, RequestServiceCreateDate, RequestServicePackage, UserID, FullName, PhoneNumber, Address, Email, StatusID, StatusName, MediaID, MediaUrl " +
                "from ((tblRequestServices rs join tblUsers u on rs.CustomerID = u.UserID) join tblStatus sta on rs.RequestServiceStatus = sta.StatusID) join tblMedia media on rs.RequestServiceID = media.RequestServiceID " +
                "where CustomerID = @CustomerID " +
                "order by RequestServiceStatus asc, RequestServiceCreateDate desc";

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
            var query = "select ServiceID, ServiceName, ServiceDescription, ServiceStatus, ServiceImg " +
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
            var query = "select rs.RequestServiceID, CustomerID, CustomerName, CustomerPhone, CustomerAddress, RequestServiceDescription, RequestServiceCreateDate, UserID, FullName, PhoneNumber, Address, Email, CreateDate, StatusID, StatusName, MediaID, MediaUrl " +
                "from ((tblRequestServices rs join tblUsers u on rs.CustomerID = u.UserID) join tblStatus sta on rs.RequestServiceStatus = sta.StatusID) join tblMedia media on rs.RequestServiceID = media.RequestServiceID " +
                "where RequestServiceCreateDate = @RequestServiceCreateDate " +
                "order by RequestServiceStatus asc, RequestServiceCreateDate desc";

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
                /*if (res.Count() == 0)
                {
                    return null;
                }*/
                return res.Distinct().ToList();
            }
        }

        public async Task<IEnumerable<RequestService>> GetAllServiceByStatus(int status)
        {
            var query = "select rs.RequestServiceID, CustomerID, CustomerName, CustomerPhone, CustomerAddress, RequestServiceDescription, RequestServiceCreateDate, RequestServicePackage, UserID, FullName, PhoneNumber, Address, Email, CreateDate, StatusID, StatusName, MediaID, MediaUrl " +
                "from ((tblRequestServices rs join tblUsers u on rs.CustomerID = u.UserID) join tblStatus sta on rs.RequestServiceStatus = sta.StatusID) join tblMedia media on rs.RequestServiceID = media.RequestServiceID " +
                "where RequestServiceStatus = @RequestServiceStatus " +
                "order by RequestServiceStatus asc, RequestServiceCreateDate desc";

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
                /*if (res.Count() == 0)
                {
                    return null;
                }*/
                return res.Distinct().ToList();
            }
        }

        public async Task<IEnumerable<RequestService>> GetAllServiceByStatusAndUserID(int user, int status)
        {
            var query = "select rs.RequestServiceID, CustomerID, CustomerName, CustomerPhone, CustomerAddress, RequestServiceDescription, RequestServiceCreateDate, RequestServicePackage, UserID, FullName, PhoneNumber, Address, Email, StatusID, StatusName, MediaID, MediaUrl " +
                "from ((tblRequestServices rs join tblUsers u on rs.CustomerID = u.UserID) join tblStatus sta on rs.RequestServiceStatus = sta.StatusID) join tblMedia media on rs.RequestServiceID = media.RequestServiceID " +
                "where CustomerID = @CustomerID and RequestServiceStatus = @RequestServiceStatus " +
                "order by RequestServiceCreateDate desc";

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
            var query = "select rs.RequestServiceID, rs.CustomerID, RequestServiceStatus as 'Status', CustomerName, CustomerPhone, CustomerAddress, RequestServiceDescription, RequestServiceCreateDate, RequestServicePackage, UserID, FullName, PhoneNumber, Address, Email, StatusID, StatusName, MediaID, MediaUrl " +
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
                /*if (res.Count() == 0)
                {
                    return null;
                }*/
                return res.FirstOrDefault();
            }
        }

        public async Task<IEnumerable<TblRequestDetail>> GetAllRequestServiceDetailsByRequestServiceID(int id)
        {
            var query = "select detail.RequestDetailID, RequestServiceID, RequestDetailStatus, RequestDetailPrice, detail.ServiceID, ser.ServiceID, ServiceName, ServiceDescription, ServiceImg, StatusID, StatusName " +
                "from (tblRequestDetails detail join tblServices ser on detail.ServiceID = ser.ServiceID) " +
                "join tblStatus sta on detail.RequestDetailStatus = sta.StatusID " +
                "where RequestServiceID = @RequestServiceID";

            using (var connection = _context.CreateConnection())
            {
                connection.Open();
                var res = await connection.QueryAsync<TblRequestDetail, TblService, TblStatus, TblRequestDetail >(query, (requestDetail, service, status) =>
                {
                    requestDetail.Service = service;
                    requestDetail.RequestDetailStatusNavigation = status;
                    return requestDetail;

                }, param: new { @RequestServiceID = id }, splitOn: "ServiceID, StatusID");
                connection.Close();
                /*if (res.Count() == 0)
                {
                    return null;
                }*/
                return res.Distinct().ToList();
            }
        }

        public async Task<IEnumerable<TblRequestDetail>> GetAllRequestServiceDetailsByRequestServiceIDAndWorkerID(int request, int worker)
        {
            var query = "select detail.RequestDetailID, RequestServiceID, RequestDetailStatus, RequestDetailPrice, detail.ServiceID, ser.ServiceID, ServiceName, ServiceDescription, ServiceImg, StatusID, StatusName, RepairDetailID, IsPrimary " +
                "from ((tblRequestDetails detail join tblServices ser on detail.ServiceID = ser.ServiceID) " +
                "join tblRepairDetail repair on detail.RequestDetailID = repair.RequestDetailID)" +
                "join tblStatus sta on detail.RequestDetailStatus = sta.StatusID " +
                "where RequestServiceID = @RequestServiceID and WorkerID = @WorkerID";

            using (var connection = _context.CreateConnection())
            {
                connection.Open();
                var requestDict = new Dictionary<int, TblRequestDetail>();
                var res = await connection.QueryAsync<TblRequestDetail, TblService, TblStatus, TblRepairDetail, TblRequestDetail>(query, (requestDetail, service, status, repair) =>
                {
                    /*requestDetail.Service = service;
                    return requestDetail;*/

                    TblRequestDetail currentRequest;
                    if (!requestDict.TryGetValue(requestDetail.RequestDetailId, out currentRequest))
                    {
                        currentRequest = requestDetail;
                        currentRequest.Service = service;
                        requestDetail.RequestDetailStatusNavigation = status;
                        currentRequest.TblRepairDetails = new List<TblRepairDetail>();
                        requestDict.Add(currentRequest.RequestDetailId, currentRequest);
                    }
                    currentRequest.TblRepairDetails.Add(repair);
                    return currentRequest;

                }, param: new { @RequestServiceID = request, @WorkerID = worker }, splitOn: "ServiceID, StatusID, RepairDetailID");
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
            var query = "select ServiceID, ServiceName, ServiceDescription, ServiceStatus " +
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
            var query = "select ServiceID, ServiceName, ServiceDescription, ServiceStatus, TypeWorkerJob " +
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

        public async Task<IEnumerable<RequestService>> GetAllServiceByDateAndStatus(DateTime? date, int status)
        {
            var query = "select rs.RequestServiceID, CustomerID, CustomerName, CustomerPhone, CustomerAddress, RequestServiceDescription, RequestServiceCreateDate, RequestServicePackage, RequestServicePackage, UserID, FullName, PhoneNumber, Address, Email, CreateDate, StatusID, StatusName, MediaID, MediaUrl " +
                "from ((tblRequestServices rs join tblUsers u on rs.CustomerID = u.UserID) join tblStatus sta on rs.RequestServiceStatus = sta.StatusID) join tblMedia media on rs.RequestServiceID = media.RequestServiceID " +
                "where RequestServiceStatus = @RequestServiceStatus and RequestServiceCreateDate = @RequestServiceCreateDate " +
                "order by RequestServiceStatus asc, RequestServiceCreateDate desc";

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
                }, param: new { @RequestServiceStatus = status, @RequestServiceCreateDate = date }, splitOn: "UserID, StatusID, MediaID");
                connection.Close();
                /*if (res.Count() == 0)
                {
                    return null;
                }*/
                return res.Distinct().ToList();
            }
        }

        public async Task<bool> UpdateStatusRequestServiceDetail(int id, int status)
        {
            var query = "update tblRequestDetails set RequestDetailStatus = @RequestDetailStatus where RequestDetailID = @RequestDetailID";

            using (var connection = _context.CreateConnection())
            {
                connection.Open();
                var res = await connection.ExecuteAsync(query, new { @RequestDetailStatus = status, @RequestDetailID = id });
                connection.Close();
                if (res == 0)
                {
                    return false;
                }
                return true;
            }
        }

        public async Task<bool> UpdatePriceRequestServiceDetail(int id, float price)
        {
            var query = "update tblRequestDetails set RequestDetailPrice = @RequestDetailPrice where RequestDetailID = @RequestDetailID";

            using (var connection = _context.CreateConnection())
            {
                connection.Open();
                var res = await connection.ExecuteAsync(query, new { @RequestDetailPrice = price, @RequestDetailID = id });
                connection.Close();
                if (res == 0)
                {
                    return false;
                }
                return true;
            }
        }

        public async Task<bool> UpdateStatusRequestService(int id, int status)
        {
            var query = "update tblRequestServices set RequestServiceStatus = @RequestServiceStatus where RequestServiceID = @RequestServiceID";

            using (var connection = _context.CreateConnection())
            {
                connection.Open();
                var res = await connection.ExecuteAsync(query, new { @RequestServiceStatus = status, @RequestServiceID = id });
                connection.Close();
                if (res == 0)
                {
                    return false;
                }
                return true;
            }
        }

        public async Task<bool> CheckRequestServiceByUserIDOfTheDay(int id)
        {
            var query = "select RequestServiceID, CustomerID, CustomerName, CustomerPhone, CustomerAddress, RequestServiceDescription, RequestServiceCreateDate, RequestServicePackage " +
                "from tblRequestServices " +
                "where CustomerID = @CustomerID and RequestServiceCreateDate = @RequestServiceCreateDate";

            using (var connection = _context.CreateConnection())
            {
                connection.Open();
                var res = await connection.QueryAsync(query, new { @CustomerID = id, @RequestServiceCreateDate = DateTime.Today.ToString("d") });
                connection.Close();
                if (res.Count() < 3)
                {
                    return true;
                }
                return false;
            }
        }

        public async Task<TblRequestDetail> GetRequestDetailByID(int id)
        {
            var query = "select * from tblRequestDetails where RequestDetailID = @RequestDetailID";

            using (var conn = _context.CreateConnection())
            {
                conn.Open();
                var res = await conn.QueryFirstOrDefaultAsync<TblRequestDetail>(query, new { @RequestDetailID = id });
                conn.Close();
                if (res == null)
                {
                    return null;
                }
                return res;
            }
        }
    }
}
