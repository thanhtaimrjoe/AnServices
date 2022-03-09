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
            var query = "select InvoiceID, RequestServiceID, TotalCost, Date, Note " +
                "from tblInvoice where " +
                "RequestServiceID = @RequestServiceID";

            using (var connection = _context.CreateConnection())
            {
                connection.Open();
                var res = await connection.QuerySingleOrDefaultAsync<TblInvoice>(query, new { @RequestServiceID = id});
                connection.Close();
                return res;
            }
        }

        public async Task<bool> CreateInvoice(int id, double total)
        {
            var query = "insert into tblInvoice(RequestServiceID,TotalCost,InvoiceDateCreate) values(@RequestServiceID,@TotalCost,@InvoiceDateCreate)";

            var parameters = new DynamicParameters();
            parameters.Add("RequestServiceID", id, DbType.Int32);
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

        public async Task<ContractViewModel> GetInfomationInvoiceByRequestServiceID(int id)
        {
            var query = "select CustomerName, CustomerPhone, CustomerAddress, RequestServiceDescription, ContractID, ContractStartDate, ContractEndDate, ContractDeposit, ContractTotalPrice, RequestDetailID, RequestDetailPrice, ser.ServiceID, ServiceName " +
                "from ((tblRequestServices request join tblContract ct on request.RequestServiceID = ct.RequestServiceID) " +
                "join tblRequestDetails detail on request.RequestServiceID = detail.RequestServiceID) " +
                "join tblServices ser on ser.ServiceID = detail.ServiceID " +
                "where request.RequestServiceID = @RequestServiceID";
            using (var connection = _context.CreateConnection())
            {
                connection.Open();
                /*var res = await connection.QueryFirstOrDefaultAsync<ContractViewModel>(query, new { @RequestServiceID = id });*/
                var requestDict = new Dictionary<int, ContractViewModel>();
                var res = await connection.QueryAsync<ContractViewModel, TblRequestDetail, TblService, ContractViewModel>(query, (model, detail, service) =>
                {
                    ContractViewModel currentContract;
                    if (!requestDict.TryGetValue(id, out currentContract))
                    {
                        currentContract = model;
                        currentContract.Details = new List<TblRequestDetail>();
                        requestDict.Add(id, currentContract);
                    }
                    currentContract.Details.Add(detail);
                    currentContract.Details.ForEach(item =>
                    {
                        item.Service = service;
                    });
                    /*currentContract.Details.GetEnumerator().Current.Service = service;*/
                    return currentContract;
                }, param: new { @RequestServiceID = id }, splitOn: "ContractID, RequestDetailID, ServiceID");
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
