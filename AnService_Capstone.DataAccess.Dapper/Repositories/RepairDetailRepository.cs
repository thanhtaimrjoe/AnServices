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
    public class RepairDetailRepository : IRepairDetail
    {
        private readonly DapperContext _dapperContext;

        public RepairDetailRepository(DapperContext dapperContext)
        {
            _dapperContext = dapperContext;
        }

        public async Task<IEnumerable<TblRepairDetail>> GetRepairDetailByRequestServiceID(int id)
        {
            var query = "select RepairDetailID, repair.RequestDetailID, WorkerID, RepairDateBegin, RepairDateEnd, UserID, FullName, PhoneNumber, Email, Status " +
                "from ((tblRepairDetail repair join tblUsers u on repair.WorkerID = u.UserID)" +
                "join tblRequestDetails detail on detail.RequestDetailID = repair.RequestDetailID) " +
                "join tblRequestServices rs on rs.RequestServiceID = detail.RequestServiceID " +
                "where rs.RequestServiceID = @RequestServiceID";
            /*using (var connection = _dapperContext.CreateConnection())
            {
                connection.Open();
                var res = await connection.QueryAsync<TblRepairDetail>(query, new { @RequestDetailID = id});
                connection.Close();
                if (!res.Any())
                {
                    return null;
                }
                return res;
            }*/
            using (var connection = _dapperContext.CreateConnection())
            {
                connection.Open();
                var res = await connection.QueryAsync<TblRepairDetail, TblUser, TblRepairDetail>(query, (repair,user) =>
                {
                    repair.Worker = user;
                    return repair;
                }, param: new { RequestServiceID = id }, splitOn: "RepairDetailID, UserID");
                connection.Close();
                /*if (!res.Any())
                {
                    return null;
                }*/
                return res;
            }
        }

        public async Task<bool> UpdateStatusRepairApproveByID(IEnumerable<TblRepairDetail> listRepair)
        {
            var query = "update tblRepairDetail set RepairStatus = 3, RepairDateEnd = @RepairDateEnd " +
                "where RepairDetailID = @RepairDetailID";
            
            foreach (var item in listRepair)
            {
                var parameters = new DynamicParameters();
                parameters.Add("RepairDateEnd", DateTime.Now, DbType.DateTime);
                parameters.Add("RepairDetailID", item.RepairDetailId, DbType.Int32);

                using (var connection = _dapperContext.CreateConnection())
                {
                    connection.Open();
                    var res = await connection.ExecuteAsync(query, parameters);
                    connection.Close();
                    if (res == 0)
                    {
                        return false;
                    }
                }
            }
            return true;
        }
    }
}
