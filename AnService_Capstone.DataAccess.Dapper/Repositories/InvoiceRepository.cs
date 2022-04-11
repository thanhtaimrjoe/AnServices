using AnService_Capstone.Core.Entities;
using AnService_Capstone.Core.Interfaces;
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
    public class InvoiceRepository : IInvoiceRepository
    {
        private readonly DapperContext _context;

        public InvoiceRepository(DapperContext context)
        {
            _context = context;
        }

        public async Task<TblInvoice> CheckInvoiceExist(int id)
        {
            var query = "select * " +
                "from tblInvoice where " +
                "ContractID = @ContractID";

            using (var connection = _context.CreateConnection())
            {
                connection.Open();
                var res = await connection.QueryAsync<TblInvoice>(query, new { ContractID = id});
                connection.Close();
                if (!res.Any())
                {
                    return null;
                }
                return res.FirstOrDefault();
            }
        }

        public async Task<bool> CreateInvoice(int id, int contractID, int promotionID, double total)
        {
            var query = "insert into tblInvoice(ServiceRequestID,ContractID,TotalCost,InvoiceDateCreate,PromotionID) values(@ServiceRequestID,@ContractID,@TotalCost,@InvoiceDateCreate,@PromotionID)";

            var parameters = new DynamicParameters();
            parameters.Add("ServiceRequestID", id, DbType.Int32);
            parameters.Add("ContractID", contractID, DbType.Int32);
            parameters.Add("TotalCost", total, DbType.Double);
            parameters.Add("InvoiceDateCreate", DateTime.Now, DbType.DateTime);

            if (promotionID == 0)
            {
                parameters.Add("PromotionID", null, DbType.Int32);
            }
            else
            {
                parameters.Add("PromotionID", promotionID, DbType.Int32);
            }

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
        }

        public async Task<ContractViewModel> GetInfomationInvoiceByServiceRequestID(int id)
        {
            var query = "select CustomerName, CustomerPhone, CustomerAddress, ServiceRequestDescription, PromotionID, ContractID, ContractStartDate, ContractEndDate, ContractDeposit, ContractTotalPrice, RequestDetailID, RequestDetailStatus, RequestDetailPrice, ser.ServiceID, ServiceName, ServiceImg " +
                "from ((tblServiceRequest request join tblContract ct on request.ServiceRequestID = ct.ServiceRequestID) " +
                "join tblRequestDetails detail on request.ServiceRequestID = detail.ServiceRequestID) " +
                "join tblServices ser on ser.ServiceID = detail.ServiceID " +
                "where request.ServiceRequestID = @ServiceRequestID and RequestDetailStatus = 11";
            using (var connection = _context.CreateConnection())
            {
                connection.Open();
                /*var res = await connection.QueryFirstOrDefaultAsync<ContractViewModel>(query, new { @RequestServiceID = id });*/
                var requestDict = new Dictionary<int, ContractViewModel>();
                var res = await connection.QueryAsync<ContractViewModel, TblRequestDetail, TblService, ContractViewModel>(query, (model, details, service) =>
                {
                    ContractViewModel currentContract;
                    if (!requestDict.TryGetValue(id, out currentContract))
                    {
                        currentContract = model;
                        currentContract.Details = new List<TblRequestDetail>();
                        requestDict.Add(id, currentContract);
                    }

                    details.Service = service;
                    currentContract.Details.Add(details);

                    /*currentContract.Details.ForEach(item =>
                    {
                        item.Service = service;
                    });*/
                    /*currentContract.Details.GetEnumerator().Current.Service = service;*/
                    return currentContract;
                }, param: new { @ServiceRequestID = id }, splitOn: "ContractID, RequestDetailID, ServiceID");
                connection.Close();
                if (!res.Any())
                {
                    return null;
                }
                return res.FirstOrDefault();
            }
        }

        public async Task<IEnumerable<ContractViewModel>> GetListInfomationInvoiceByServiceRequestID(int year, int quarter)
        {
            string query;

            if (quarter == 0)
            {
                query = "select CustomerName, CustomerPhone, CustomerAddress, ServiceRequestDescription, request.PromotionID, InvoiceDateCreate, ct.ContractID, ContractStartDate, ContractEndDate, ContractDeposit, ContractTotalPrice, ContractCreateDate, RequestDetailID, RequestDetailStatus, RequestDetailPrice, ser.ServiceID, ServiceName, ServiceImg " +
                "from (((tblServiceRequest request join tblContract ct on request.ServiceRequestID = ct.ServiceRequestID) " +
                "join tblRequestDetails detail on request.ServiceRequestID = detail.ServiceRequestID) " +
                "join tblServices ser on ser.ServiceID = detail.ServiceID) " +
                "join tblInvoice invoice on invoice.ServiceRequestID = request.ServiceRequestID " +
                "where RequestDetailStatus = 11 and YEAR(InvoiceDateCreate) = @InvoiceDateCreate and not DATEPART(QUARTER,InvoiceDateCreate) = @QUARTER";
            }
            else
            {
                query = "select CustomerName, CustomerPhone, CustomerAddress, ServiceRequestDescription, request.PromotionID, InvoiceDateCreate, ct.ContractID, ContractStartDate, ContractEndDate, ContractDeposit, ContractTotalPrice, ContractCreateDate, RequestDetailID, RequestDetailStatus, RequestDetailPrice, ser.ServiceID, ServiceName, ServiceImg " +
                "from (((tblServiceRequest request join tblContract ct on request.ServiceRequestID = ct.ServiceRequestID) " +
                "join tblRequestDetails detail on request.ServiceRequestID = detail.ServiceRequestID) " +
                "join tblServices ser on ser.ServiceID = detail.ServiceID) " +
                "join tblInvoice invoice on invoice.ServiceRequestID = request.ServiceRequestID " +
                "where RequestDetailStatus = 11 and YEAR(InvoiceDateCreate) = @InvoiceDateCreate and DATEPART(QUARTER,InvoiceDateCreate) = @QUARTER";
            }
            using (var connection = _context.CreateConnection())
            {
                connection.Open();
                /*var res = await connection.QueryFirstOrDefaultAsync<ContractViewModel>(query, new { @RequestServiceID = id });*/
                var requestDict = new Dictionary<int, ContractViewModel>();
                var res = await connection.QueryAsync<ContractViewModel, TblRequestDetail, TblService, ContractViewModel>(query, (model, details, service) =>
                {
                    ContractViewModel currentContract;
                    if (!requestDict.TryGetValue(model.ContractID, out currentContract))
                    {
                        currentContract = model;
                        currentContract.Details = new List<TblRequestDetail>();
                        requestDict.Add(model.ContractID, currentContract);
                    }

                    details.Service = service;
                    currentContract.Details.Add(details);

                    /*currentContract.Details.ForEach(item =>
                    {
                        item.Service = service;
                    });*/
                    /*currentContract.Details.GetEnumerator().Current.Service = service;*/
                    return currentContract;
                }, param: new {@InvoiceDateCreate = year, @QUARTER = quarter }, splitOn: "ContractID, RequestDetailID, ServiceID");
                connection.Close();
                if (!res.Any())
                {
                    return null;
                }
                return res.Distinct();
            }
        }
    }
}
