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

        public async Task<bool> CreateInvoice(int id, float total)
        {
            var query = "insert into tblInvoice(RequestServiceID,TotalCost,Date) values(@RequestServiceID,@TotalCost,@Date)";

            var parameters = new DynamicParameters();
            parameters.Add("RequestServiceID", id, DbType.Int32);
            parameters.Add("TotalCost", total, DbType.Double);
            parameters.Add("Date", DateTime.Now, DbType.DateTime);

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
    }
}
