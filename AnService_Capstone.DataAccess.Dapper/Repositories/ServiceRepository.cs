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
            var query = "insert into tblMedia (ServiceRequestID, MediaUrl) values (@ServiceRequestID, @MediaUrl)";

            var parameters = new DynamicParameters();
            parameters.Add("ServiceRequestID", requestID, DbType.Int32);
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
            var query = "insert into tblRequestDetails (ServiceRequestID, ServiceID, RequestDetailStatus) values (@ServiceRequestID, @ServiceID, @RequestDetailStatus)";

            var parameters = new DynamicParameters();
            parameters.Add("ServiceRequestID", requestID, DbType.Int32);
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

        public async Task<int> CreateServiceRequest(CreateService model)
        {
            var query = "INSERT INTO tblServiceRequest(CustomerID, CustomerName, CustomerPhone, CustomerAddress, ServiceRequestDescription, ServiceRequestStatus, ServiceRequestCreateDate, ServiceRequestPackage) " +
                "VALUES (@CustomerID, @CustomerName, @CustomerPhone, @CustomerAddress, @ServiceRequestDescription, 2, @ServiceRequestCreateDate, @ServiceRequestPackage) " +
                "SELECT CAST(SCOPE_IDENTITY() as int)";

            var parameters = new DynamicParameters();
            parameters.Add("CustomerID", model.CustomerId, DbType.Int32);
            parameters.Add("CustomerName", model.CustomerName, DbType.String);
            parameters.Add("CustomerPhone", model.CustomerPhone, DbType.String);
            parameters.Add("CustomerAddress", model.CustomerAddress, DbType.String);
            parameters.Add("ServiceRequestDescription", model.ServiceRequestDescription, DbType.String);
            parameters.Add("ServiceRequestCreateDate", DateTime.Now, DbType.DateTime);
            parameters.Add("ServiceRequestPackage", model.ServiceRequestPackage, DbType.Int32);

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

        public async Task<IEnumerable<TblServiceRequest>> GetAllServiceRequest()
        {
            var query = "select rs.ServiceRequestID, CustomerID, CustomerName, CustomerPhone, CustomerAddress, ServiceRequestDescription, ServiceRequestStatus, ServiceRequestCreateDate, ServiceRequestPackage, UserID, FullName, PhoneNumber, Address, Email, CreateDate, sta.StatusID, StatusName, MediaID, MediaUrl " +
                "from ((tblServiceRequest rs join tblUsers u on rs.CustomerID = u.UserID) join tblStatus sta on rs.ServiceRequestStatus = sta.StatusID) join tblMedia media on rs.ServiceRequestID = media.ServiceRequestID " +
                "order by case " +
                "when ServiceRequestStatus = 2 then 0 " +
                "when ServiceRequestStatus = 9 then 1 " +
                "when ServiceRequestStatus = 14 then 2 " +
                "when ServiceRequestStatus = 6 then 3 " +
                "when ServiceRequestStatus = 3 then 4 " +
                "when ServiceRequestStatus = 8 then 5 " +
                "when ServiceRequestStatus = 1 then 6 " +
                " end, ServiceRequestCreateDate DESC";

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
                var requestDict = new Dictionary<int, TblServiceRequest>();
                var res = await connection.QueryAsync<TblServiceRequest, TblUser, TblStatus, TblMedium, TblServiceRequest>(query, (requestService, user, status, media) =>
                {
                    TblServiceRequest currentRequest;
                    if(!requestDict.TryGetValue(requestService.ServiceRequestId, out currentRequest))
                    {
                        currentRequest = requestService;
                        currentRequest.Customer = user;
                        currentRequest.ServiceRequestStatusNavigation = status;
                        currentRequest.TblMedia = new List<TblMedium>();
                        requestDict.Add(currentRequest.ServiceRequestId, currentRequest);
                    }
                    currentRequest.TblMedia.Add(media);
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

        public async Task<IEnumerable<TblServiceRequest>> GetAllServiceRequestByWorkerID(int id)
        {
            var query = "select distinct rs.ServiceRequestID, CustomerID, CustomerName, CustomerPhone, CustomerAddress, ServiceRequestDescription, ServiceRequestStatus, ServiceRequestCreateDate, ServiceRequestPackage, UserID, FullName, PhoneNumber, Address, Email, StatusID, StatusName, MediaID, MediaUrl " +
                "from ((((tblServiceRequest rs join tblRequestDetails rd on rs.ServiceRequestID = rd.ServiceRequestID) join tblRepairDetail repair on rd.RequestDetailID = repair.RequestDetailID) " +
                "join tblUsers u on u.UserID = rs.CustomerID) join tblStatus sta on rs.ServiceRequestStatus = sta.StatusID) join tblMedia media on rs.ServiceRequestID = media.ServiceRequestID " +
                "where WorkerID = @WorkerID " +
                "order by StatusID ASC, ServiceRequestCreateDate DESC";

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
                var requestDict = new Dictionary<int, TblServiceRequest>();
                var res = await connection.QueryAsync<TblServiceRequest, TblUser, TblStatus, TblMedium, TblServiceRequest>(query, (requestService, user, status, media) =>
                {
                    TblServiceRequest currentRequest;
                    if (!requestDict.TryGetValue(requestService.ServiceRequestId, out currentRequest))
                    {
                        currentRequest = requestService;
                        currentRequest.Customer = user;
                        currentRequest.ServiceRequestStatusNavigation = status;
                        currentRequest.TblMedia = new List<TblMedium>();
                        requestDict.Add(currentRequest.ServiceRequestId, currentRequest);
                    }
                    currentRequest.TblMedia.Add(media);
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

        public async Task<IEnumerable<TblServiceRequest>> GetAllServiceRequestByUserID(int id)
        {
            var query = "select rs.ServiceRequestID, CustomerID, CustomerName, CustomerPhone, CustomerAddress, ServiceRequestDescription, ServiceRequestStatus, ServiceRequestCreateDate, ServiceRequestPackage, UserID, FullName, PhoneNumber, Address, Email, StatusID, StatusName, MediaID, MediaUrl " +
                "from ((tblServiceRequest rs join tblUsers u on rs.CustomerID = u.UserID) join tblStatus sta on rs.ServiceRequestStatus = sta.StatusID) join tblMedia media on rs.ServiceRequestID = media.ServiceRequestID " +
                "where CustomerID = @CustomerID " +
                "order by ServiceRequestStatus asc, ServiceRequestCreateDate desc";

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
                var requestDict = new Dictionary<int, TblServiceRequest>();
                var res = await connection.QueryAsync<TblServiceRequest, TblUser, TblStatus, TblMedium, TblServiceRequest>(query, (requestService, user, status, media) =>
                {
                    TblServiceRequest currentRequest;
                    if (!requestDict.TryGetValue(requestService.ServiceRequestId, out currentRequest))
                    {
                        currentRequest = requestService;
                        currentRequest.Customer = user;
                        currentRequest.ServiceRequestStatusNavigation = status;
                        currentRequest.TblMedia = new List<TblMedium>();
                        requestDict.Add(currentRequest.ServiceRequestId, currentRequest);
                    }
                    currentRequest.TblMedia.Add(media);
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

        public async Task<IEnumerable<TblServiceRequest>> GetAllServiceRequestByDate(string date)
        {
            var query = "select rs.ServiceRequestID, CustomerID, CustomerName, CustomerPhone, CustomerAddress, ServiceRequestDescription, ServiceRequestCreateDate, UserID, FullName, PhoneNumber, Address, Email, CreateDate, StatusID, StatusName, MediaID, MediaUrl " +
                "from ((tblServiceRequest rs join tblUsers u on rs.CustomerID = u.UserID) join tblStatus sta on rs.ServiceRequestStatus = sta.StatusID) join tblMedia media on rs.ServiceRequestID = media.ServiceRequestID " +
                "where ServiceRequestCreateDate between @ServiceRequestCreateDateStart and @ServiceRequestCreateDateEnd " +
                "order by ServiceRequestStatus asc, ServiceRequestCreateDate desc";

            using (var connection = _context.CreateConnection())
            {
                connection.Open();
                var requestDict = new Dictionary<int, TblServiceRequest>();
                var res = await connection.QueryAsync<TblServiceRequest, TblUser, TblStatus, TblMedium, TblServiceRequest>(query, (requestService, user, status, media) =>
                {
                    TblServiceRequest currentRequest;
                    if (!requestDict.TryGetValue(requestService.ServiceRequestId, out currentRequest))
                    {
                        currentRequest = requestService;
                        currentRequest.Customer = user;
                        currentRequest.ServiceRequestStatusNavigation = status;
                        currentRequest.TblMedia = new List<TblMedium>();
                        requestDict.Add(currentRequest.ServiceRequestId, currentRequest);
                    }
                    currentRequest.TblMedia.Add(media);
                    return currentRequest;
                }, param: new { @ServiceRequestCreateDateStart = date + " 00:00:00", @ServiceRequestCreateDateEnd = date + " 23:59:59" }, splitOn: "UserID, StatusID, MediaID");
                connection.Close();
                /*if (res.Count() == 0)
                {
                    return null;
                }*/
                return res.Distinct().ToList();
            }
        }

        public async Task<IEnumerable<TblServiceRequest>> GetAllServiceRequestByStatus(int status)
        {
            var query = "select rs.ServiceRequestID, CustomerID, CustomerName, CustomerPhone, CustomerAddress, ServiceRequestDescription, ServiceRequestStatus, ServiceRequestCreateDate, ServiceRequestPackage, UserID, FullName, PhoneNumber, Address, Email, CreateDate, StatusID, StatusName, MediaID, MediaUrl " +
                "from ((tblServiceRequest rs join tblUsers u on rs.CustomerID = u.UserID) join tblStatus sta on rs.ServiceRequestStatus = sta.StatusID) join tblMedia media on rs.ServiceRequestID = media.ServiceRequestID " +
                "where ServiceRequestStatus = @ServiceRequestStatus " +
                "order by ServiceRequestStatus asc, ServiceRequestCreateDate desc";

            using (var connection = _context.CreateConnection())
            {
                connection.Open();
                var requestDict = new Dictionary<int, TblServiceRequest>();
                var res = await connection.QueryAsync<TblServiceRequest, TblUser, TblStatus, TblMedium, TblServiceRequest>(query, (requestService, user, status, media) =>
                {
                    TblServiceRequest currentRequest;
                    if (!requestDict.TryGetValue(requestService.ServiceRequestId, out currentRequest))
                    {
                        currentRequest = requestService;
                        currentRequest.Customer = user;
                        currentRequest.ServiceRequestStatusNavigation = status;
                        currentRequest.TblMedia = new List<TblMedium>();
                        requestDict.Add(currentRequest.ServiceRequestId, currentRequest);
                    }
                    currentRequest.TblMedia.Add(media);
                    return currentRequest;
                }, param: new { @ServiceRequestStatus = status }, splitOn: "UserID, StatusID, MediaID");
                connection.Close();
                /*if (res.Count() == 0)
                {
                    return null;
                }*/
                return res.Distinct().ToList();
            }
        }

        public async Task<IEnumerable<TblServiceRequest>> GetServiceRequestByUserIDAndStatus(int user, int status)
        {
            var query = "select rs.ServiceRequestID, CustomerID, CustomerName, CustomerPhone, CustomerAddress, ServiceRequestDescription, ServiceRequestStatus, ServiceRequestCreateDate, ServiceRequestPackage, UserID, FullName, PhoneNumber, Address, Email, StatusID, StatusName, MediaID, MediaUrl " +
                "from ((tblServiceRequest rs join tblUsers u on rs.CustomerID = u.UserID) join tblStatus sta on rs.ServiceRequestStatus = sta.StatusID) join tblMedia media on rs.ServiceRequestID = media.ServiceRequestID " +
                "where CustomerID = @CustomerID and ServiceRequestStatus = @ServiceRequestStatus " +
                "order by ServiceRequestCreateDate desc";

            using (var connection = _context.CreateConnection())
            {
                connection.Open();
                var requestDict = new Dictionary<int, TblServiceRequest>();
                var res = await connection.QueryAsync<TblServiceRequest, TblUser, TblStatus, TblMedium, TblServiceRequest>(query, (requestService, user, status, media) =>
                {
                    TblServiceRequest currentRequest;
                    if (!requestDict.TryGetValue(requestService.ServiceRequestId, out currentRequest))
                    {
                        currentRequest = requestService;
                        currentRequest.Customer = user;
                        currentRequest.ServiceRequestStatusNavigation = status;
                        currentRequest.TblMedia = new List<TblMedium>();
                        requestDict.Add(currentRequest.ServiceRequestId, currentRequest);
                    }
                    currentRequest.TblMedia.Add(media);
                    return currentRequest;
                }, param: new { @CustomerID = user, @ServiceRequestStatus = status }, splitOn: "UserID, StatusID, MediaID");
                connection.Close();
                if (res.Count() == 0)
                {
                    return null;
                }
                return res.Distinct().ToList();
            }
        }

        public async Task<TblServiceRequest> GetServiceRequestByID(int id)
        {
            var query = "select rs.ServiceRequestID, rs.CustomerID, ServiceRequestStatus, CustomerName, CustomerPhone, CustomerAddress, ServiceRequestDescription, ServiceRequestCreateDate, ServiceRequestPackage, UserID, FullName, PhoneNumber, Address, Email, StatusID, StatusName, MediaID, MediaUrl " +
                "from ((tblServiceRequest rs join tblUsers u on rs.CustomerID = u.UserID) join tblStatus sta on rs.ServiceRequestStatus = sta.StatusID) join tblMedia media on rs.ServiceRequestID = media.ServiceRequestID " +

                "where rs.ServiceRequestID = @ServiceRequestID";

            using (var connection = _context.CreateConnection())
            {
                connection.Open();
                var requestDict = new Dictionary<int, TblServiceRequest>();
                var res = await connection.QueryAsync<TblServiceRequest, TblUser, TblStatus, TblMedium, TblServiceRequest>(query, (requestService, user, status, media) =>
                {
                    TblServiceRequest currentRequest;
                    if (!requestDict.TryGetValue(requestService.ServiceRequestId, out currentRequest))
                    {
                        currentRequest = requestService;
                        currentRequest.Customer = user;
                        currentRequest.ServiceRequestStatusNavigation = status;
                        currentRequest.TblMedia = new List<TblMedium>();
                        requestDict.Add(currentRequest.ServiceRequestId, currentRequest);
                    }
                    currentRequest.TblMedia.Add(media);
                    return currentRequest;
                }, param: new { @ServiceRequestID = id }, splitOn: "UserID, StatusID, MediaID");
                connection.Close();
                /*if (res.Count() == 0)
                {
                    return null;
                }*/
                return res.FirstOrDefault();
            }
        }

        public async Task<IEnumerable<TblRequestDetail>> GetAllServiceRequestDetailsByServiceRequestID(int id)
        {
            var query = "select detail.RequestDetailID, ServiceRequestID, RequestDetailStatus, RequestDetailPrice, detail.ServiceID, ser.ServiceID, ServiceName, ServiceDescription, ServiceImg, StatusID, StatusName " +
                "from (tblRequestDetails detail join tblServices ser on detail.ServiceID = ser.ServiceID) " +
                "join tblStatus sta on detail.RequestDetailStatus = sta.StatusID " +
                "where ServiceRequestID = @ServiceRequestID";

            using (var connection = _context.CreateConnection())
            {
                connection.Open();
                var res = await connection.QueryAsync<TblRequestDetail, TblService, TblStatus, TblRequestDetail >(query, (requestDetail, service, status) =>
                {
                    requestDetail.Service = service;
                    requestDetail.RequestDetailStatusNavigation = status;
                    return requestDetail;

                }, param: new { @ServiceRequestID = id }, splitOn: "ServiceID, StatusID");
                connection.Close();
                /*if (res.Count() == 0)
                {
                    return null;
                }*/
                return res.Distinct().ToList();
            }
        }

        public async Task<IEnumerable<TblRequestDetail>> GetAllServiceRequestDetailsByServiceRequestIDAndWorkerID(int request, int worker)
        {
            var query = "select detail.RequestDetailID, ServiceRequestID, RequestDetailStatus, RequestDetailPrice, detail.ServiceID, ser.ServiceID, ServiceName, ServiceDescription, ServiceImg, StatusID, StatusName, RepairDetailID, IsPrimary, RequestDetailPriority " +
                "from ((tblRequestDetails detail join tblServices ser on detail.ServiceID = ser.ServiceID) " +
                "join tblRepairDetail repair on detail.RequestDetailID = repair.RequestDetailID)" +
                "join tblStatus sta on detail.RequestDetailStatus = sta.StatusID " +
                "where ServiceRequestID = @ServiceRequestID and WorkerID = @WorkerID";

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

                }, param: new { @ServiceRequestID = request, @WorkerID = worker }, splitOn: "ServiceID, StatusID, RepairDetailID");
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

        public async Task<IEnumerable<TblServiceRequest>> GetAllServiceRequestByDateAndStatus(string date, int status)
        {
            var query = "select rs.ServiceRequestID, CustomerID, CustomerName, CustomerPhone, CustomerAddress, ServiceRequestDescription, ServiceRequestStatus, ServiceRequestCreateDate, ServiceRequestPackage, UserID, FullName, PhoneNumber, Address, Email, CreateDate, StatusID, StatusName, MediaID, MediaUrl " +
                "from ((tblServiceRequest rs join tblUsers u on rs.CustomerID = u.UserID) join tblStatus sta on rs.ServiceRequestStatus = sta.StatusID) join tblMedia media on rs.ServiceRequestID = media.ServiceRequestID " +
                "where ServiceRequestStatus = @ServiceRequestStatus and ServiceRequestCreateDate between @ServiceRequestCreateDateStart and @ServiceRequestCreateDateEnd " +
                "order by ServiceRequestStatus asc, ServiceRequestCreateDate desc";

            using (var connection = _context.CreateConnection())
            {
                connection.Open();
                var requestDict = new Dictionary<int, TblServiceRequest>();
                var res = await connection.QueryAsync<TblServiceRequest, TblUser, TblStatus, TblMedium, TblServiceRequest>(query, (requestService, user, status, media) =>
                {
                    TblServiceRequest currentRequest;
                    if (!requestDict.TryGetValue(requestService.ServiceRequestId, out currentRequest))
                    {
                        currentRequest = requestService;
                        currentRequest.Customer = user;
                        currentRequest.ServiceRequestStatusNavigation = status;
                        currentRequest.TblMedia = new List<TblMedium>();
                        requestDict.Add(currentRequest.ServiceRequestId, currentRequest);
                    }
                    currentRequest.TblMedia.Add(media);
                    return currentRequest;
                }, param: new { @ServiceRequestStatus = status, @ServiceRequestCreateDateStart = date + " 00:00:00", @ServiceRequestCreateDateEnd = date + " 23:59:59" }, splitOn: "UserID, StatusID, MediaID");
                connection.Close();
                /*if (res.Count() == 0)
                {
                    return null;
                }*/
                return res.Distinct().ToList();
            }
        }

        public async Task<bool> UpdateStatusServiceRequestDetail(int id, int status)
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

        public async Task<bool> UpdatePriceServiceRequestDetail(int id, float price, string des)
        {
            var query = "update tblRequestDetails set RequestDetailPrice = @RequestDetailPrice, RequestDetailDescription = @RequestDetailDescription where RequestDetailID = @RequestDetailID";

            using (var connection = _context.CreateConnection())
            {
                connection.Open();
                var res = await connection.ExecuteAsync(query, new { @RequestDetailPrice = price, @RequestDetailDescription = des, @RequestDetailID = id });
                connection.Close();
                if (res == 0)
                {
                    return false;
                }
                return true;
            }
        }

        public async Task<bool> UpdateStatusServiceRequest(int id, int status)
        {
            var query = "update tblServiceRequest set ServiceRequestStatus = @ServiceRequestStatus where ServiceRequestID = @ServiceRequestID";

            using (var connection = _context.CreateConnection())
            {
                connection.Open();
                var res = await connection.ExecuteAsync(query, new { @ServiceRequestStatus = status, @ServiceRequestID = id });
                connection.Close();
                if (res == 0)
                {
                    return false;
                }
                return true;
            }
        }

        public async Task<bool> CheckServiceRequestByUserIDOfTheDay(int id)
        {
            var query = "select ServiceRequestID, CustomerID, CustomerName, CustomerPhone, CustomerAddress, ServiceRequestDescription, ServiceRequestCreateDate, ServiceRequestPackage " +
                "from tblRequestServices " +
                "where CustomerID = @CustomerID and ServiceRequestCreateDate = @ServiceRequestCreateDate";

            using (var connection = _context.CreateConnection())
            {
                connection.Open();
                var res = await connection.QueryAsync(query, new { @CustomerID = id, @ServiceRequestCreateDate = DateTime.Today.ToString("d") });
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

        public async Task<IEnumerable<TblRequestDetail>> GetAllInformationServiceRequestDetailsByServiceRequestID(int id)
        {
            var query = "select detail.RequestDetailID, ServiceRequestID, RequestDetailStatus, RequestDetailPrice, detail.ServiceID, ser.ServiceID, ServiceName, ServiceDescription, ServiceImg, StatusID, StatusName, RepairDetailID, IsPrimary, RequestDetailPriority, UserID, FullName " +
                "from (((tblRequestDetails detail join tblServices ser on detail.ServiceID = ser.ServiceID) " +
                "join tblStatus sta on detail.RequestDetailStatus = sta.StatusID)" +
                "join tblRepairDetail repair on repair.RequestDetailID = detail.RequestDetailID)" +
                "join tblUsers u on u.UserID = repair.WorkerID " +
                "where ServiceRequestID = @ServiceRequestID";

            using (var connection = _context.CreateConnection())
            {
                connection.Open();
                var requestDict = new Dictionary<int, TblRequestDetail>();
                var res = await connection.QueryAsync<TblRequestDetail, TblService, TblStatus, TblRepairDetail, TblUser, TblRequestDetail >(query, (requestDetail, service, status, repair, user) =>
                {
                    TblRequestDetail currentContract;
                    if (!requestDict.TryGetValue(requestDetail.RequestDetailId, out currentContract))
                    {
                        currentContract = requestDetail;
                        currentContract.Service = service;
                        currentContract.TblRepairDetails = new List<TblRepairDetail>();
                        requestDict.Add(requestDetail.RequestDetailId, currentContract);
                    }
                    repair.Worker = user;
                    currentContract.TblRepairDetails.Add(repair);
                    return currentContract;
                    /*requestDetail.Service = service;
                    requestDetail.RequestDetailStatusNavigation = status;
                    return requestDetail;*/

                }, param: new { @ServiceRequestID = id }, splitOn: "ServiceID, StatusID, RepairDetailID, UserID");
                connection.Close();
                if (res.Count() == 0)
                {
                    return null;
                }
                return res.Distinct().ToList();
            }
        }
    }
}
