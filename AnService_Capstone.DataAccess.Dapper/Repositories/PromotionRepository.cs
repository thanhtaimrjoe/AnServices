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
    public class PromotionRepository : IPromotionRepository
    {
        private readonly DapperContext _dapperContext;

        public PromotionRepository(DapperContext dapperContext)
        {
            _dapperContext = dapperContext;
        }

        public async Task<bool> CheckEnteredCode(int userID)
        {
            var query = "select * from tblPromotion where PromotionDescription = 'MAGIAMGIANGUOIDUNGMOI' and CustomerID = @CustomerID";

            using (var connection = _dapperContext.CreateConnection())
            {
                connection.Open();
                var res = await connection.QueryAsync(query, new { @CustomerID = userID});
                connection.Close();
                if (res.Any())
                {
                    return false;
                }
                return true;
            }
        }

        public async Task<int> CountPromotionIsUsed()
        {
            var query = "select count(*) from tblPromotion where PromotionActive = 0";

            using (var conn = _dapperContext.CreateConnection())
            {
                conn.Open();
                var res = await conn.QueryFirstOrDefaultAsync<int>(query);
                conn.Close();
                return res;
            }
        }

        public async Task<int> CountPromotionIsUsedInMonth(int month)
        {
            var query = "select count(*) from tblPromotion promo join tblServiceRequest sr on sr.PromotionID = promo.PromotionID where PromotionActive = 0 and MONTH(ServiceRequestCreateDate) = @ServiceRequestCreateDate";

            using (var conn = _dapperContext.CreateConnection())
            {
                conn.Open();
                var res = await conn.QueryFirstOrDefaultAsync<int>(query, new { @ServiceRequestCreateDate = month});
                conn.Close();
                return res;
            }
        }

        public async Task<int> CountPromotionIsUsedInYear(int year)
        {
            var query = "select count(*) from tblPromotion promo join tblServiceRequest sr on sr.PromotionID = promo.PromotionID where PromotionActive = 0 and YEAR(ServiceRequestCreateDate) = @ServiceRequestCreateDate";

            using (var conn = _dapperContext.CreateConnection())
            {
                conn.Open();
                var res = await conn.QueryFirstOrDefaultAsync<int>(query, new { @ServiceRequestCreateDate = year});
                conn.Close();
                return res;
            }
        }

        public async Task<bool> GeneratorPromotionCode(int userID, string promotion, string description, double value)
        {
            var query = "insert into tblPromotion(CustomerID, PromotionCode, PromotionDescription, PromotionValue, PromotionActive, PromotionDateExpired) " +
                "values (@CustomerID, @PromotionCode, @PromotionDescription, @PromotionValue, @PromotionActive, @PromotionDateExpired)";

            var parameters = new DynamicParameters();
            parameters.Add("CustomerID", userID, DbType.Int32);
            parameters.Add("PromotionCode", promotion, DbType.String);
            parameters.Add("PromotionDescription", description, DbType.String);
            parameters.Add("PromotionValue", value, DbType.Double);
            parameters.Add("PromotionActive", 1, DbType.Boolean);
            parameters.Add("PromotionDateExpired", DateTime.Now.AddDays(30), DbType.DateTime);

            using (var connection = _dapperContext.CreateConnection())
            {
                connection.Open();
                var res = await connection.ExecuteAsync(query, parameters);
                connection.Close();
                if(res == 0)
                {
                    return false;
                }
                return true;
            }
        }

        public async Task<IEnumerable<TblPromotion>> GetAllPromotionByUserID(int userID)
        {
            var query = "select * from tblPromotion where CustomerID = @CustomerID ";
            using (var connection = _dapperContext.CreateConnection())
            {
                connection.Open();
                var res = await connection.QueryAsync<TblPromotion>(query, new { @CustomerID = userID});
                connection.Close();
                if (!res.Any())
                {
                    return null;
                }
                return res;
            }
        }

        public async Task<IEnumerable<TblPromotion>> GetAllPromotionValidByUserID(int userID)
        {
            var query = "select * from tblPromotion where CustomerID = @CustomerID and PromotionActive = 1 and PromotionDateExpired >= @PromotionDateExpired ";
            using (var connection = _dapperContext.CreateConnection())
            {
                connection.Open();
                var res = await connection.QueryAsync<TblPromotion>(query, new { @CustomerID = userID, @PromotionDateExpired = DateTime.Now});
                connection.Close();
                if (!res.Any())
                {
                    return null;
                }
                return res;
            }
        }

        public async Task<TblPromotion> GetInformationPromotionByID(int id)
        {
            var query = "select * from tblPromotion where PromotionID = @PromotionID";

            using (var conn = _dapperContext.CreateConnection())
            {
                conn.Open();
                var res = await conn.QueryAsync<TblPromotion>(query, new { @PromotionID = id });
                conn.Close();
                if (!res.Any())
                {
                    return null;
                }
                return res.FirstOrDefault();
            }
        }

        public async Task<int> InsertPromotion(string inviteCode)
        {
            var query = "insert into tblPromotion(PromotionCode, PromotionDescription) values(@PromotionName, @PromotionDescription) " +
                "SELECT CAST(SCOPE_IDENTITY() as int)";

            var parameters = new DynamicParameters();
            parameters.Add("PromotionName", inviteCode, DbType.String);
            parameters.Add("PromotionDescription", "CODE CA NHAN", DbType.String);

            using (var connection = _dapperContext.CreateConnection())
            {
                connection.Open();
                var result = await connection.QuerySingleAsync<int>(query, parameters);
                connection.Close();
                return result;
            }
        }

        public async Task<bool> UpdateStatusPromotion(int code)
        {
            var query = "update tblPromotion set PromotionActive = 0 where PromotionID = @PromotionID";

            using (var con = _dapperContext.CreateConnection())
            {
                con.Open();
                var res = await con.ExecuteAsync(query, new { PromotionID = code });
                con.Close();
                if (res > 0)
                {
                    return true;
                }
                return false;
            }
        }

        /*public async Task<bool> InsertPromotionDetail(int userID, int promotionID)
        {
            var query = "insert into tblPromotionDetail(CustomerID, PromotionID) values(@CustomerID, @PromotionID)";

            var parameters = new DynamicParameters();
            parameters.Add("CustomerID", userID, DbType.Int32);
            parameters.Add("PromotionID", promotionID, DbType.Int32);

            using (var connection = _dapperContext.CreateConnection())
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
        }*/
    }
}
