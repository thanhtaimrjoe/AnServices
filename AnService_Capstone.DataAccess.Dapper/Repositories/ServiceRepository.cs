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
            var query = "INSERT INTO tblServiceRequest(CustomerID, CustomerName, CustomerPhone, CustomerAddress, ServiceRequestDescription, ServiceRequestStatus, ServiceRequestCreateDate, ServiceRequestPackage, PromotionID, ServiceRequestReference) " +
                "VALUES (@CustomerID, @CustomerName, @CustomerPhone, @CustomerAddress, @ServiceRequestDescription, 2, @ServiceRequestCreateDate, @ServiceRequestPackage, @PromotionID, @ServiceRequestReference) " +
                "SELECT CAST(SCOPE_IDENTITY() as int)";

            var parameters = new DynamicParameters();
            parameters.Add("CustomerID", model.CustomerId, DbType.Int32);
            parameters.Add("CustomerName", model.CustomerName, DbType.String);
            parameters.Add("CustomerPhone", model.CustomerPhone, DbType.String);
            parameters.Add("CustomerAddress", model.CustomerAddress, DbType.String);
            parameters.Add("ServiceRequestDescription", model.ServiceRequestDescription, DbType.String);
            parameters.Add("ServiceRequestCreateDate", DateTime.Now, DbType.DateTime);
            parameters.Add("ServiceRequestPackage", model.ServiceRequestPackage, DbType.Int32);
            parameters.Add("PromotionID", model.PromotionID, DbType.Double);
            if (model.ServiceRequestIDParent == 0)
            {
                parameters.Add("ServiceRequestReference", null, DbType.Int32);
            }
            else
            {
                parameters.Add("ServiceRequestReference", model.ServiceRequestIDParent, DbType.Int32);
            }

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
            var query = "select rs.ServiceRequestID, CustomerID, CustomerName, CustomerPhone, CustomerAddress, ServiceRequestDescription, ServiceRequestStatus, ServiceRequestCreateDate, ServiceRequestPackage, PromotionID, ServiceRequestReference, UserID, FullName, PhoneNumber, Address, Email, CreateDate, MediaID, MediaUrl " +
                "from (tblServiceRequest rs join tblUsers u on rs.CustomerID = u.UserID) join tblMedia media on rs.ServiceRequestID = media.ServiceRequestID " +
                "where ServiceRequestStatus != 5 " +
                "order by case " +
                "when ServiceRequestStatus = 2 then 0 " +
                "when ServiceRequestStatus = 15 then 1 " +
                "when ServiceRequestStatus = 3 then 2 " +
                "when ServiceRequestStatus = 6 then 3 " +
                "when ServiceRequestStatus = 17 then 4 " +
                "when ServiceRequestStatus = 14 then 5 " +
                "when ServiceRequestStatus = 13 then 6 " +
                "when ServiceRequestStatus = 8 then 7" +
                "when ServiceRequestStatus = 1 then 8 " +
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
                var res = await connection.QueryAsync<TblServiceRequest, TblUser, TblMedium, TblServiceRequest>(query, (requestService, user, media) =>
                {
                    TblServiceRequest currentRequest;
                    if(!requestDict.TryGetValue(requestService.ServiceRequestId, out currentRequest))
                    {
                        currentRequest = requestService;
                        currentRequest.Customer = user;
                        currentRequest.TblMedia = new List<TblMedium>();
                        requestDict.Add(currentRequest.ServiceRequestId, currentRequest);
                    }
                    currentRequest.TblMedia.Add(media);
                    return currentRequest;
                }, splitOn: "UserID, MediaID");
                connection.Close();
                /*if (res.Count() == 0)
                {
                    return null;
                }*/
                return res.Distinct().ToList();
            }

        }

        public async Task<IEnumerable<TblServiceRequest>> GetAllServiceRequestByWorkerID(int id, int status)
        {
            string query;

            if (status == 0)
            {
                query = "select distinct rs.ServiceRequestID, CustomerID, CustomerName, CustomerPhone, CustomerAddress, ServiceRequestDescription, ServiceRequestStatus, ServiceRequestCreateDate, ServiceRequestPackage, UserID, FullName, PhoneNumber, Address, Email, MediaID, MediaUrl " +
                    "from (((tblServiceRequest rs join tblRequestDetails rd on rs.ServiceRequestID = rd.ServiceRequestID) join tblRepairDetail repair on rd.RequestDetailID = repair.RequestDetailID) " +
                    "join tblUsers u on u.UserID = rs.CustomerID) join tblMedia media on rs.ServiceRequestID = media.ServiceRequestID " +
                    "where WorkerID = @WorkerID and ServiceRequestStatus != 13" +
                    "order by ServiceRequestStatus ASC, ServiceRequestCreateDate DESC";
            }
            else
            {
                query = "select distinct rs.ServiceRequestID, CustomerID, CustomerName, CustomerPhone, CustomerAddress, ServiceRequestDescription, ServiceRequestStatus, ServiceRequestCreateDate, ServiceRequestPackage, UserID, FullName, PhoneNumber, Address, Email, MediaID, MediaUrl " +
                    "from (((tblServiceRequest rs join tblRequestDetails rd on rs.ServiceRequestID = rd.ServiceRequestID) join tblRepairDetail repair on rd.RequestDetailID = repair.RequestDetailID) " +
                    "join tblUsers u on u.UserID = rs.CustomerID) join tblMedia media on rs.ServiceRequestID = media.ServiceRequestID " +
                    "where WorkerID = @WorkerID and ServiceRequestStatus = 13" +
                    "order by ServiceRequestStatus ASC, ServiceRequestCreateDate DESC";
            }
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
                var res = await connection.QueryAsync<TblServiceRequest, TblUser, TblMedium, TblServiceRequest>(query, (requestService, user, media) =>
                {
                    TblServiceRequest currentRequest;
                    if (!requestDict.TryGetValue(requestService.ServiceRequestId, out currentRequest))
                    {
                        currentRequest = requestService;
                        currentRequest.Customer = user;
                        currentRequest.TblMedia = new List<TblMedium>();
                        requestDict.Add(currentRequest.ServiceRequestId, currentRequest);
                    }
                    currentRequest.TblMedia.Add(media);
                    return currentRequest;
                }, param: new { @WorkerID = id }, splitOn: "UserID, MediaID");
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
            var query = "select rs.ServiceRequestID, CustomerID, CustomerName, CustomerPhone, CustomerAddress, ServiceRequestDescription, ServiceRequestStatus, ServiceRequestCreateDate, ServiceRequestPackage, UserID, FullName, PhoneNumber, Address, Email, MediaID, MediaUrl " +
                "from (tblServiceRequest rs join tblUsers u on rs.CustomerID = u.UserID) join tblMedia media on rs.ServiceRequestID = media.ServiceRequestID " +
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
                var res = await connection.QueryAsync<TblServiceRequest, TblUser, TblMedium, TblServiceRequest>(query, (requestService, user, media) =>
                {
                    TblServiceRequest currentRequest;
                    if (!requestDict.TryGetValue(requestService.ServiceRequestId, out currentRequest))
                    {
                        currentRequest = requestService;
                        currentRequest.Customer = user;
                        currentRequest.TblMedia = new List<TblMedium>();
                        requestDict.Add(currentRequest.ServiceRequestId, currentRequest);
                    }
                    currentRequest.TblMedia.Add(media);
                    return currentRequest;
                }, param: new { @CustomerID = id }, splitOn: "UserID, MediaID");
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
            var query = "select rs.ServiceRequestID, CustomerID, CustomerName, CustomerPhone, CustomerAddress, ServiceRequestDescription, ServiceRequestCreateDate, ServiceRequestStatus, ServiceRequestPackage, PromotionID, ServiceRequestReference, UserID, FullName, PhoneNumber, Address, Email, CreateDate, MediaID, MediaUrl " +
                "from (tblServiceRequest rs join tblUsers u on rs.CustomerID = u.UserID) join tblMedia media on rs.ServiceRequestID = media.ServiceRequestID " +
                "where ServiceRequestCreateDate between @ServiceRequestCreateDateStart and @ServiceRequestCreateDateEnd and ServiceRequestStatus != 5" +
                "order by case " +
                "when ServiceRequestStatus = 2 then 0 " +
                "when ServiceRequestStatus = 15 then 1 " +
                "when ServiceRequestStatus = 3 then 2 " +
                "when ServiceRequestStatus = 6 then 3 " +
                "when ServiceRequestStatus = 17 then 4 " +
                "when ServiceRequestStatus = 14 then 5 " +
                "when ServiceRequestStatus = 13 then 6 " +
                "when ServiceRequestStatus = 8 then 7" +
                "when ServiceRequestStatus = 1 then 8 " +
                " end, ServiceRequestCreateDate DESC";

            using (var connection = _context.CreateConnection())
            {
                connection.Open();
                var requestDict = new Dictionary<int, TblServiceRequest>();
                var res = await connection.QueryAsync<TblServiceRequest, TblUser, TblMedium, TblServiceRequest>(query, (requestService, user, media) =>
                {
                    TblServiceRequest currentRequest;
                    if (!requestDict.TryGetValue(requestService.ServiceRequestId, out currentRequest))
                    {
                        currentRequest = requestService;
                        currentRequest.Customer = user;
                        currentRequest.TblMedia = new List<TblMedium>();
                        requestDict.Add(currentRequest.ServiceRequestId, currentRequest);
                    }
                    currentRequest.TblMedia.Add(media);
                    return currentRequest;
                }, param: new { @ServiceRequestCreateDateStart = date + " 00:00:00", @ServiceRequestCreateDateEnd = date + " 23:59:59" }, splitOn: "UserID, MediaID");
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
            var query = "select rs.ServiceRequestID, CustomerID, CustomerName, CustomerPhone, CustomerAddress, ServiceRequestDescription, ServiceRequestStatus, ServiceRequestCreateDate, ServiceRequestPackage, PromotionID, ServiceRequestReference, UserID, FullName, PhoneNumber, Address, Email, CreateDate, MediaID, MediaUrl " +
                "from (tblServiceRequest rs join tblUsers u on rs.CustomerID = u.UserID) join tblMedia media on rs.ServiceRequestID = media.ServiceRequestID " +
                "where ServiceRequestStatus = @ServiceRequestStatus " +
                "order by ServiceRequestStatus asc, ServiceRequestCreateDate desc";

            using (var connection = _context.CreateConnection())
            {
                connection.Open();
                var requestDict = new Dictionary<int, TblServiceRequest>();
                var res = await connection.QueryAsync<TblServiceRequest, TblUser, TblMedium, TblServiceRequest>(query, (requestService, user, media) =>
                {
                    TblServiceRequest currentRequest;
                    if (!requestDict.TryGetValue(requestService.ServiceRequestId, out currentRequest))
                    {
                        currentRequest = requestService;
                        currentRequest.Customer = user;
                        currentRequest.TblMedia = new List<TblMedium>();
                        requestDict.Add(currentRequest.ServiceRequestId, currentRequest);
                    }
                    currentRequest.TblMedia.Add(media);
                    return currentRequest;
                }, param: new { @ServiceRequestStatus = status }, splitOn: "UserID, MediaID");
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
            var query = "select rs.ServiceRequestID, CustomerID, CustomerName, CustomerPhone, CustomerAddress, ServiceRequestDescription, ServiceRequestStatus, ServiceRequestCreateDate, ServiceRequestPackage, PromotionID, ServiceRequestReference, UserID, FullName, PhoneNumber, Address, Email, MediaID, MediaUrl " +
                "from (tblServiceRequest rs join tblUsers u on rs.CustomerID = u.UserID) join tblMedia media on rs.ServiceRequestID = media.ServiceRequestID " +
                "where CustomerID = @CustomerID and ServiceRequestStatus = @ServiceRequestStatus " +
                "order by ServiceRequestCreateDate desc";

            using (var connection = _context.CreateConnection())
            {
                connection.Open();
                var requestDict = new Dictionary<int, TblServiceRequest>();
                var res = await connection.QueryAsync<TblServiceRequest, TblUser, TblMedium, TblServiceRequest>(query, (requestService, user, media) =>
                {
                    TblServiceRequest currentRequest;
                    if (!requestDict.TryGetValue(requestService.ServiceRequestId, out currentRequest))
                    {
                        currentRequest = requestService;
                        currentRequest.Customer = user;
                        currentRequest.TblMedia = new List<TblMedium>();
                        requestDict.Add(currentRequest.ServiceRequestId, currentRequest);
                    }
                    currentRequest.TblMedia.Add(media);
                    return currentRequest;
                }, param: new { @CustomerID = user, @ServiceRequestStatus = status }, splitOn: "UserID, MediaID");
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
            var query = "select rs.ServiceRequestID, rs.CustomerID, ServiceRequestStatus, CustomerName, CustomerPhone, CustomerAddress, ServiceRequestDescription, ServiceRequestCreateDate, ServiceRequestPackage, PromotionID, ServiceRequestReference, UserID, FullName, PhoneNumber, Address, Email, MediaID, MediaUrl " +
                "from (tblServiceRequest rs join tblUsers u on rs.CustomerID = u.UserID) join tblMedia media on rs.ServiceRequestID = media.ServiceRequestID " +

                "where rs.ServiceRequestID = @ServiceRequestID";

            using (var connection = _context.CreateConnection())
            {
                connection.Open();
                var requestDict = new Dictionary<int, TblServiceRequest>();
                var res = await connection.QueryAsync<TblServiceRequest, TblUser, TblMedium, TblServiceRequest>(query, (requestService, user, media) =>
                {
                    TblServiceRequest currentRequest;
                    if (!requestDict.TryGetValue(requestService.ServiceRequestId, out currentRequest))
                    {
                        currentRequest = requestService;
                        currentRequest.Customer = user;
                        currentRequest.TblMedia = new List<TblMedium>();
                        requestDict.Add(currentRequest.ServiceRequestId, currentRequest);
                    }
                    currentRequest.TblMedia.Add(media);
                    return currentRequest;
                }, param: new { @ServiceRequestID = id }, splitOn: "UserID, MediaID");
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
            var query = "select detail.RequestDetailID, ServiceRequestID, RequestDetailStatus, RequestDetailPrice, detail.ServiceID, ser.ServiceID, ServiceName, ServiceDescription, ServiceImg, TypeServiceID, TypeServiceDecription  " +
                "from (tblRequestDetails detail join tblServices ser on detail.ServiceID = ser.ServiceID) " +
                "join tblTypeService typeser on typeser.TypeServiceID = ser.TypeService " +
                "where ServiceRequestID = @ServiceRequestID";

            using (var connection = _context.CreateConnection())
            {
                connection.Open();
                var res = await connection.QueryAsync<TblRequestDetail, TblService, TblTypeService, TblRequestDetail >(query, (requestDetail, service, type) =>
                {
                    requestDetail.Service = service;
                    requestDetail.Service.TypeServiceNavigation = type;
                    return requestDetail;

                }, param: new { @ServiceRequestID = id }, splitOn: "ServiceID, TypeServiceID");
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
            var query = "select detail.RequestDetailID, ServiceRequestID, RequestDetailStatus, RequestDetailPrice, detail.ServiceID, ser.ServiceID, ServiceName, ServiceDescription, ServiceImg, RepairDetailID, IsPrimary, RequestDetailPriority, RepairDateBegin " +
                "from (tblRequestDetails detail join tblServices ser on detail.ServiceID = ser.ServiceID) " +
                "join tblRepairDetail repair on detail.RequestDetailID = repair.RequestDetailID " +
                "where ServiceRequestID = @ServiceRequestID and WorkerID = @WorkerID";

            using (var connection = _context.CreateConnection())
            {
                connection.Open();
                var requestDict = new Dictionary<int, TblRequestDetail>();
                var res = await connection.QueryAsync<TblRequestDetail, TblService, TblRepairDetail, TblRequestDetail>(query, (requestDetail, service, repair) =>
                {
                    /*requestDetail.Service = service;
                    return requestDetail;*/

                    TblRequestDetail currentRequest;
                    if (!requestDict.TryGetValue(requestDetail.RequestDetailId, out currentRequest))
                    {
                        currentRequest = requestDetail;
                        currentRequest.Service = service;
                        currentRequest.TblRepairDetails = new List<TblRepairDetail>();
                        requestDict.Add(currentRequest.RequestDetailId, currentRequest);
                    }
                    currentRequest.TblRepairDetails.Add(repair);
                    return currentRequest;

                }, param: new { @ServiceRequestID = request, @WorkerID = worker }, splitOn: "ServiceID, RepairDetailID");
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
            var query = "select rs.ServiceRequestID, CustomerID, CustomerName, CustomerPhone, CustomerAddress, ServiceRequestDescription, ServiceRequestStatus, ServiceRequestCreateDate, ServiceRequestPackage, PromotionID, ServiceRequestReference, UserID, FullName, PhoneNumber, Address, Email, CreateDate, MediaID, MediaUrl " +
                "from (tblServiceRequest rs join tblUsers u on rs.CustomerID = u.UserID) join tblMedia media on rs.ServiceRequestID = media.ServiceRequestID " +
                "where ServiceRequestStatus = @ServiceRequestStatus and ServiceRequestCreateDate between @ServiceRequestCreateDateStart and @ServiceRequestCreateDateEnd " +
                "order by ServiceRequestStatus asc, ServiceRequestCreateDate desc";

            using (var connection = _context.CreateConnection())
            {
                connection.Open();
                var requestDict = new Dictionary<int, TblServiceRequest>();
                var res = await connection.QueryAsync<TblServiceRequest, TblUser, TblMedium, TblServiceRequest>(query, (requestService, user, media) =>
                {
                    TblServiceRequest currentRequest;
                    if (!requestDict.TryGetValue(requestService.ServiceRequestId, out currentRequest))
                    {
                        currentRequest = requestService;
                        currentRequest.Customer = user;
                        currentRequest.TblMedia = new List<TblMedium>();
                        requestDict.Add(currentRequest.ServiceRequestId, currentRequest);
                    }
                    currentRequest.TblMedia.Add(media);
                    return currentRequest;
                }, param: new { @ServiceRequestStatus = status, @ServiceRequestCreateDateStart = date + " 00:00:00", @ServiceRequestCreateDateEnd = date + " 23:59:59" }, splitOn: "UserID, MediaID");
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

        public async Task<bool> UpdatePriceServiceRequestDetail(int id, float price)
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
                "from tblServiceRequest " +
                "where CustomerID = @CustomerID and ServiceRequestCreateDate between @ServiceRequestCreateDateStart and @ServiceRequestCreateDateEnd";

            string dayStart = DateTime.Today.ToString("d") + " 00:00:00";
            string dayEnd = DateTime.Today.ToString("d") + " 23:59:59";

            using (var connection = _context.CreateConnection())
            {
                connection.Open();
                var res = await connection.QueryAsync(query, new { @CustomerID = id, @ServiceRequestCreateDateStart = dayStart, @ServiceRequestCreateDateEnd = dayEnd });
                connection.Close();
                if (res.Count() < 4)
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
            var query = "select detail.RequestDetailID, ServiceRequestID, RequestDetailStatus, RequestDetailPrice, detail.ServiceID, ser.ServiceID, ServiceName, ServiceDescription, ServiceImg, RepairDetailID, IsPrimary, RequestDetailPriority, UserID, FullName, TypeServiceID, TypeServiceDecription " +
                "from (((tblRequestDetails detail join tblServices ser on detail.ServiceID = ser.ServiceID) " +
                "join tblRepairDetail repair on repair.RequestDetailID = detail.RequestDetailID)" +
                "join tblUsers u on u.UserID = repair.WorkerID) " +
                "join tblTypeService typeser on typeser.TypeServiceID = ser.TypeService " +
                "where ServiceRequestID = @ServiceRequestID";

            using (var connection = _context.CreateConnection())
            {
                connection.Open();
                var requestDict = new Dictionary<int, TblRequestDetail>();
                var res = await connection.QueryAsync<TblRequestDetail, TblService, TblRepairDetail, TblUser, TblTypeService, TblRequestDetail >(query, (requestDetail, service, repair, user, typeService) =>
                {
                    TblRequestDetail currentContract;
                    if (!requestDict.TryGetValue(requestDetail.RequestDetailId, out currentContract))
                    {
                        currentContract = requestDetail;
                        currentContract.Service = service;
                        currentContract.TblRepairDetails = new List<TblRepairDetail>();
                        requestDetail.Service.TypeServiceNavigation = typeService;
                        requestDict.Add(requestDetail.RequestDetailId, currentContract);
                    }
                    repair.Worker = user;
                    currentContract.TblRepairDetails.Add(repair);
                    return currentContract;
                    /*requestDetail.Service = service;
                    requestDetail.RequestDetailStatusNavigation = status;
                    return requestDetail;*/

                }, param: new { @ServiceRequestID = id }, splitOn: "ServiceID, RepairDetailID, UserID, TypeServiceID");
                connection.Close();
                if (res.Count() == 0)
                {
                    return null;
                }
                return res.Distinct().ToList();
            }
        }

        public async void BackgroundServiceTask()
        {
            IEnumerable<TblRequestDetail> res = await GetAllRequestDetail();
            bool checkStatus = true;

            foreach (var detail in res)
            {
                int time = DateTime.Now.Subtract((DateTime)detail.TblReports.FirstOrDefault().ReportDate).Days;
                Console.WriteLine(time);
                if (detail.Service.TypeService.Value <= time)
                {
                    _ = await UpdateStatusServiceRequestDetail(detail.RequestDetailId, 11);

                    var services = await GetAllServiceRequestDetailsByServiceRequestID(detail.ServiceRequestId);

                    foreach (var serviceDetail in services)
                    {
                        if (serviceDetail.RequestDetailStatus != 11 && serviceDetail.RequestDetailStatus != 16)
                        {
                            checkStatus = false;
                        }
                    }

                    if (checkStatus)
                    {
                        _ = await UpdateStatusServiceRequest(detail.ServiceRequestId, 17);
                    }
                }
            }
        }

        private async Task<IEnumerable<TblRequestDetail>> GetAllRequestDetail()
        {
            IEnumerable<TblRequestDetail> res;
            var query = "select * " +
                "from ((tblRequestDetails detail join tblReport report on detail.RequestDetailID = report.RequestDetailID) " +
                "join tblServices ser on ser.ServiceID = detail.ServiceID) " +
                "join tblTypeService tser on tser.TypeServiceID = ser.TypeService " +
                "where RequestDetailStatus = 9 and ReportTitle = 'Báo cáo hoàn thành'";

            using (var connection = _context.CreateConnection())
            {
                connection.Open();
                res = await connection.QueryAsync<TblRequestDetail, TblReport, TblService, TblTypeService, TblRequestDetail>(query, (detail, report, service, type) =>
                {
                    detail.Service = service;
                    detail.Service.TypeServiceNavigation = type;
                    detail.TblReports.Add(report);
                    return detail;
                }, splitOn: "ReportID, ServiceID, TypeServiceID");
                connection.Close();
                return res;
            }
        }

        /*public Task<IEnumerable<TblServiceRequest>> GetAllServiceRequestByWorkerIDAndStatus(int id, IEnumerable<int> status)
        {
            throw new NotImplementedException();
        }*/

        public async Task<int> CountRequestServiceDetail(int status)
        {
            var query = "select count(*) from tblRequestDetails where RequestDetailStatus = @RequestDetailStatus";

            using (var conn = _context.CreateConnection())
            {
                conn.Open();
                var res = await conn.QueryFirstOrDefaultAsync<int>(query, new { @RequestDetailStatus = status });
                conn.Close();
                return res;
            }
        }

        /*public async Task<int> CountServiceRequest(int status)
        {
            var query = "select count(*) from tblServiceRequest where ServiceRequestStatus = @ServiceRequestStatus";

            using (var conn = _context.CreateConnection())
            {
                conn.Open();
                var res = await conn.QueryFirstOrDefaultAsync<int>(query, new { @ServiceRequestStatus = status });
                conn.Close();
                return res;
            }
        }*/

        public async Task<IEnumerable<Dashboard.AmountOfSalesInYear>> AmountOfSaleList(int year, int status)
        {
            string query;
            if (status == 0)
            {
                query = "SELECT * " +
                "FROM (SELECT " +
                "DATENAME(MONTH, ServiceRequestCreateDate) [Month], " +
                "COUNT(1) [Sales Count] " +
                "FROM tblServiceRequest " +
                "where ServiceRequestStatus != 2 and ServiceRequestStatus != 5 and ServiceRequestStatus != 1 and YEAR(ServiceRequestCreateDate) = @ServiceRequestCreateDate " +
                "GROUP BY " +
                "DATENAME(MONTH, ServiceRequestCreateDate)) AS MontlySalesData " +
                "PIVOT( SUM([Sales Count]) " +
                "FOR Month IN ([January],[February],[March],[April],[May]," +
                "[June],[July],[August],[September],[October],[November]," +
                "[December])) AS MNamePivot";
            }
            else if (status == 1)
            {
                query = "SELECT * " +
                "FROM (SELECT " +
                "DATENAME(MONTH, ServiceRequestCreateDate) [Month], " +
                "COUNT(1) [Sales Count] " +
                "FROM tblServiceRequest " +
                "where ServiceRequestStatus = 13 and YEAR(ServiceRequestCreateDate) = @ServiceRequestCreateDate " +
                "GROUP BY " +
                "DATENAME(MONTH, ServiceRequestCreateDate)) AS MontlySalesData " +
                "PIVOT( SUM([Sales Count]) " +
                "FOR Month IN ([January],[February],[March],[April],[May]," +
                "[June],[July],[August],[September],[October],[November]," +
                "[December])) AS MNamePivot";
            }
            else
            {
                query = "SELECT * " +
                "FROM (SELECT " +
                "DATENAME(MONTH, ServiceRequestCreateDate) [Month], " +
                "COUNT(1) [Sales Count] " +
                "FROM tblServiceRequest " +
                "where ServiceRequestStatus = 1 and YEAR(ServiceRequestCreateDate) = @ServiceRequestCreateDate " +
                "GROUP BY " +
                "DATENAME(MONTH, ServiceRequestCreateDate)) AS MontlySalesData " +
                "PIVOT( SUM([Sales Count]) " +
                "FOR Month IN ([January],[February],[March],[April],[May]," +
                "[June],[July],[August],[September],[October],[November]," +
                "[December])) AS MNamePivot";
            }

            using (var conn = _context.CreateConnection())
            {
                conn.Open();
                var res = await conn.QueryAsync<Dashboard.AmountOfSalesInYear>(query, new { @ServiceRequestCreateDate = year});
                conn.Close();
                return res;
            }
        }

        /*public async Task<IEnumerable<int>> AmountOfSaleList2(int year, int status)
        {
            string query;
            List<int> list = new List<int>();
            if (status == 0)
            {
                query = "SELECT * " +
                "FROM (SELECT " +
                "DATENAME(MONTH, ServiceRequestCreateDate) [Month], " +
                "COUNT(1) [Sales Count] " +
                "FROM tblServiceRequest " +
                "where ServiceRequestStatus != 2 and ServiceRequestStatus != 5 and ServiceRequestStatus != 1 and YEAR(ServiceRequestCreateDate) = @ServiceRequestCreateDate " +
                "GROUP BY " +
                "DATENAME(MONTH, ServiceRequestCreateDate)) AS MontlySalesData " +
                "PIVOT( SUM([Sales Count]) " +
                "FOR Month IN ([January],[February],[March],[April],[May]," +
                "[June],[July],[August],[September],[October],[November]," +
                "[December])) AS MNamePivot";
            }
            else if (status == 1)
            {
                query = "SELECT * " +
                "FROM (SELECT " +
                "DATENAME(MONTH, ServiceRequestCreateDate) [Month], " +
                "COUNT(1) [Sales Count] " +
                "FROM tblServiceRequest " +
                "where ServiceRequestStatus = 13 and YEAR(ServiceRequestCreateDate) = @ServiceRequestCreateDate " +
                "GROUP BY " +
                "DATENAME(MONTH, ServiceRequestCreateDate)) AS MontlySalesData " +
                "PIVOT( SUM([Sales Count]) " +
                "FOR Month IN ([January],[February],[March],[April],[May]," +
                "[June],[July],[August],[September],[October],[November]," +
                "[December])) AS MNamePivot";
            }
            else
            {
                query = "SELECT * " +
                "FROM (SELECT " +
                "DATENAME(MONTH, ServiceRequestCreateDate) [Month], " +
                "COUNT(1) [Sales Count] " +
                "FROM tblServiceRequest " +
                "where ServiceRequestStatus = 1 and YEAR(ServiceRequestCreateDate) = @ServiceRequestCreateDate " +
                "GROUP BY " +
                "DATENAME(MONTH, ServiceRequestCreateDate)) AS MontlySalesData " +
                "PIVOT( SUM([Sales Count]) " +
                "FOR Month IN ([January],[February],[March],[April],[May]," +
                "[June],[July],[August],[September],[October],[November]," +
                "[December])) AS MNamePivot";
            }

            using (var conn = _context.CreateConnection())
            {
                conn.Open();
                var res = await conn.QueryAsync<Dashboard.AmountOfSalesInYear>(query, new { @ServiceRequestCreateDate = year });
                conn.Close();
                foreach(var item in res)
                {
                    list.Add(item.January);
                    list.Add(item.February);
                    list.Add(item.March);
                    list.Add(item.April);
                    list.Add(item.May);
                    list.Add(item.June);
                    list.Add(item.July);
                    list.Add(item.August);
                    list.Add(item.September);
                    list.Add(item.October);
                    list.Add(item.November);
                    list.Add(item.December);
                }
                return list;
            }
        }*/

        /*public async Task<Dashboard.ServiceStatusStatistic> CountServiceStatus()
        {
            var query = "SELECT [Chưa xử lý] as Pending," +
                "[Đã từ chối] as [Deny]," +
                "[Đã đồng ý] as Agreed," +
                "[Đang xử lý] as Processing," +
                "[Khách hàng đã hủy] as Cancel," +
                "[Đã hoàn thành] as Accomplished," +
                "[Chờ thanh toán] as Payment," +
                "[Đang khảo sát] as Surveying " +
                "FROM (SELECT StatusName as [Status], " +
                "COUNT(1) [Sales Count] " +
                "FROM tblServiceRequest sr join tblStatus s on sr.ServiceRequestStatus = s.StatusID " +
                "where ServiceRequestStatus != 5 " +
                "GROUP BY StatusName) AS MontlySalesData " +
                "PIVOT( SUM([Sales Count]) " +
                "FOR [Status] IN ([Chưa xử lý],[Đã từ chối],[Đã đồng ý],[Đang xử lý],[Khách hàng đã hủy]," +
                "[Đã hoàn thành],[Chờ thanh toán],[Đang khảo sát])) AS MNamePivot";

            using (var conn = _context.CreateConnection())
            {
                conn.Open();
                var res = await conn.QueryFirstOrDefaultAsync<Dashboard.ServiceStatusStatistic>(query);
                conn.Close();
                return res;
            }
        }*/

        public async Task<IEnumerable<Dashboard.AmountOfSalesInYear>> SumRevenueOfInvoiceByYear(int quarter, int year)
        {
            string query;
            if (quarter == 0)
            {
                query = "SELECT * " +
                "FROM (SELECT " +
                "DATENAME(MONTH, ServiceRequestCreateDate) [Month], " +
                "SUM(TotalCost) [Sales Count] " +
                "FROM tblServiceRequest sr join tblInvoice invoice on sr.ServiceRequestID = invoice.ServiceRequestID " +
                "where ServiceRequestStatus = 13 and not DATEPART(QUARTER, ServiceRequestCreateDate) = @Quarter and YEAR(ServiceRequestCreateDate) = @ServiceRequestCreateDate " +
                "GROUP BY " +
                "DATENAME(MONTH, ServiceRequestCreateDate)) AS MontlySalesData " +
                "PIVOT( SUM([Sales Count]) " +
                "FOR Month IN ([January],[February],[March],[April],[May]," +
                "[June],[July],[August],[September],[October],[November]," +
                "[December])) AS MNamePivot";
            }
            else
            {
                query = "SELECT * " +
                "FROM (SELECT " +
                "DATENAME(MONTH, ServiceRequestCreateDate) [Month], " +
                "SUM(TotalCost) [Sales Count] " +
                "FROM tblServiceRequest sr join tblInvoice invoice on sr.ServiceRequestID = invoice.ServiceRequestID " +
                "where ServiceRequestStatus = 13 and DATEPART(QUARTER, ServiceRequestCreateDate) = @Quarter and YEAR(ServiceRequestCreateDate) = @ServiceRequestCreateDate " +
                "GROUP BY " +
                "DATENAME(MONTH, ServiceRequestCreateDate)) AS MontlySalesData " +
                "PIVOT( SUM([Sales Count]) " +
                "FOR Month IN ([January],[February],[March],[April],[May]," +
                "[June],[July],[August],[September],[October],[November]," +
                "[December])) AS MNamePivot";
            }
                
            using (var conn = _context.CreateConnection())
            {
                conn.Open();
                var res = await conn.QueryAsync<Dashboard.AmountOfSalesInYear>(query, new { @Quarter = quarter, @ServiceRequestCreateDate = year});
                conn.Close();
                return res;
            }
        }

        public async Task<IEnumerable<Dashboard.WorkerTask>> CountTaskOfWorker()
        {
            var query = "select FullName, Count(WorkerID) as Times, sum(case when RequestDetailStatus = 11 then 1 else 0 end) as Done, sum(case when RequestDetailStatus = 12 then 1 else 0 end) as Bad " +
                "from tblRepairDetail repair join tblUsers u on repair.WorkerID = u.UserID join tblRequestDetails detail on detail.RequestDetailID = repair.RequestDetailID " +
                "group by FullName " +
                "order by Times desc ";
            using (var connection = _context.CreateConnection())
            {
                connection.Open();
                var res = await connection.QueryAsync<Dashboard.WorkerTask>(query);
                connection.Close();
                return res;
            }
        }

        public async Task<IEnumerable<Dashboard.AmountOfSalesInYear>> SumRevenueOfContractByYear(int quarter, int year)
        {
            string query;
            if (quarter == 0)
            {
                query = "SELECT * " +
                "FROM (SELECT " +
                "DATENAME(MONTH, ServiceRequestCreateDate) [Month], " +
                "SUM(ContractTotalPrice) [Sales Count] " +
                "FROM tblServiceRequest sr join tblContract contract on sr.ServiceRequestID = contract.ServiceRequestID " +
                "where not DATEPART(QUARTER, ServiceRequestCreateDate) = @Quarter and YEAR(ServiceRequestCreateDate) = @ServiceRequestCreateDate " +
                "GROUP BY " +
                "DATENAME(MONTH, ServiceRequestCreateDate)) AS MontlySalesData " +
                "PIVOT( SUM([Sales Count]) " +
                "FOR Month IN ([January],[February],[March],[April],[May]," +
                "[June],[July],[August],[September],[October],[November]," +
                "[December])) AS MNamePivot";
            }
            else
            {
                query = "SELECT * " +
                "FROM (SELECT " +
                "DATENAME(MONTH, ServiceRequestCreateDate) [Month], " +
                "SUM(ContractTotalPrice) [Sales Count] " +
                "FROM tblServiceRequest sr join tblContract contract on sr.ServiceRequestID = contract.ServiceRequestID  " +
                "where DATEPART(QUARTER, ServiceRequestCreateDate) = @Quarter and YEAR(ServiceRequestCreateDate) = @ServiceRequestCreateDate " +
                "GROUP BY " +
                "DATENAME(MONTH, ServiceRequestCreateDate)) AS MontlySalesData " +
                "PIVOT( SUM([Sales Count]) " +
                "FOR Month IN ([January],[February],[March],[April],[May]," +
                "[June],[July],[August],[September],[October],[November]," +
                "[December])) AS MNamePivot";
            }

            using (var conn = _context.CreateConnection())
            {
                conn.Open();
                var res = await conn.QueryAsync<Dashboard.AmountOfSalesInYear>(query, new { @Quarter = quarter, @ServiceRequestCreateDate = year });
                conn.Close();
                return res;
            }
        }
    }
}
