using AnService_Capstone.Core.Entities;
using AnService_Capstone.Core.Interfaces;
using AnService_Capstone.Core.Models.Request;
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
    public class MaterialRepository : IMaterialRepository
    {
        private readonly DapperContext _dapperContext;

        public MaterialRepository(DapperContext dapperContext)
        {
            _dapperContext = dapperContext;
        }

        public async Task<IEnumerable<TblUsedMaterial>> GetAllRequestMaterial()
        {
            var query = "select UsedMaterialID, MaterialID, RequestDetailID, MansonID, quantity, Status " +
                "from tblUsedMaterial";

            using (var connection = _dapperContext.CreateConnection())
            {
                connection.Open();
                var result = await connection.QueryAsync<TblUsedMaterial>(query);
                connection.Close();
                if (result.Count() == 0)
                {
                    return null;
                }
                return result;
            }
        }

        public async Task<bool> InsertMaterial(RequestMaterial material)
        {
            var query = "insert into tblUsedMaterial(MaterialID, RequestDetailID, MansonID, quantity, Status) " +
                "values(@MaterialID, @RequestDetailID, @MansonID, @quantity, @Status)";

            foreach (var item in material.MaterialList)
            {
                var parameters = new DynamicParameters();
                parameters.Add("MaterialID", item.Id, DbType.Int32);
                parameters.Add("RequestDetailID", material.RequestDetailID, DbType.Int32);
                parameters.Add("MansonID", material.MansonID, DbType.Int32);
                parameters.Add("quantity", item.quantity, DbType.Int32);
                parameters.Add("Status", 2, DbType.Int32);

                using (var connection = _dapperContext.CreateConnection())
                {
                    connection.Open();
                    var result = await connection.ExecuteAsync(query, parameters);
                    connection.Close();
                    if (result == 0)
                    {
                        return false;
                    }
                }
            }
            return true;
        }

        public async Task<bool> UpdateStatusRequestMaterial(int id, int status)
        {
            var query = "update tblUsedMaterial set Status = @Status " +
                "where UsedMaterialID = @UsedMaterialID";

            var parameters = new DynamicParameters();
            parameters.Add("Status", status, DbType.Int32);
            parameters.Add("UsedMaterialID", id, DbType.Int32);

            using (var connection = _dapperContext.CreateConnection())
            {
                connection.Open();
                var result = await connection.ExecuteAsync(query, parameters);
                connection.Close();
                if (result == 0)
                {
                    return false;
                }
                return true;
            }
        }
    }
}
