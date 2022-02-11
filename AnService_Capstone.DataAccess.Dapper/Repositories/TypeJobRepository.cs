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
    public class TypeJobRepository : ITypeJobRepository
    {
        private readonly DapperContext _context;

        public TypeJobRepository(DapperContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<TblTypeJob>> GetAll()
        {
            var query = "select TypeJobID, TypeJobName from tblTypeJobs";

            using(var connecetion = _context.CreateConnection())
            {
                connecetion.Open();
                var res = await connecetion.QueryAsync<TblTypeJob>(query);
                connecetion.Close();
                if (!res.Any())
                {
                    return null;
                }
                return res;
            }
        }
    }
}
