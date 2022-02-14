using AnService_Capstone.Core.Entities;
using AnService_Capstone.Core.Interfaces;
using AnService_Capstone.DataAccess.Dapper.Context;
using Dapper;
using System;
using System.Collections.Generic;
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

        public async Task<IEnumerable<TblContract>> GetContractListByUserID(int id)
        {
            var query = "select * from tblContract where CustomerID = @CustomerID";

            using (var connection = _context.CreateConnection())
            {
                connection.Open();
                var res = await connection.QueryAsync<TblContract>(query, new { @CustomerID = id});
                connection.Close();
                if (!res.Any())
                {
                    return null;
                }
                return res;
            }
        }
    }
}
