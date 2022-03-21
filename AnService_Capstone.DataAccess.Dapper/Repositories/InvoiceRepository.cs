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
            var query = "select InvoiceID, ServiceRequestID, TotalCost, Date, Note " +
                "from tblInvoice where " +
                "ServiceRequestID = @ServiceRequestID";

            using (var connection = _context.CreateConnection())
            {
                connection.Open();
                var res = await connection.QuerySingleOrDefaultAsync<TblInvoice>(query, new { @ServiceRequestID = id});
                connection.Close();
                return res;
            }
        }

        public async Task<bool> CreateInvoice(int id, int contractID, double total)
        {
            var query = "insert into tblInvoice(ServiceRequestID,ContractID,TotalCost,InvoiceDateCreate) values(@ServiceRequestID,@ContractID,@TotalCost,@InvoiceDateCreate)";

            var parameters = new DynamicParameters();
            parameters.Add("ServiceRequestID", id, DbType.Int32);
            parameters.Add("ContractID", contractID, DbType.Int32);
            parameters.Add("TotalCost", total, DbType.Double);
            parameters.Add("InvoiceDateCreate", DateTime.Now, DbType.DateTime);

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
            var query = "select CustomerName, CustomerPhone, CustomerAddress, ServiceRequestDescription, ContractID, ContractStartDate, ContractEndDate, ContractDeposit, ContractTotalPrice, RequestDetailID, RequestDetailStatus, RequestDetailPrice, ser.ServiceID, ServiceName, ServiceImg " +
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
    }
}
