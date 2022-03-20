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
            var query = "select * from tblPromotion where PromotionDescription = 'Người nhập mã'";

            using (var connection = _dapperContext.CreateConnection())
            {
                connection.Open();
                var res = await connection.QueryAsync(query);
                connection.Close();
                if (res.Any())
                {
                    return false;
                }
                return true;
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
