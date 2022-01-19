using AnService_Capstone.Core.Entities;
using AnService_Capstone.Core.Interfaces;
using AnService_Capstone.Core.Models.Request;
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
    public class MaterialRepository : IMaterialRepository
    {
        private readonly DapperContext _dapperContext;

        public MaterialRepository(DapperContext dapperContext)
        {
            _dapperContext = dapperContext;
        }

        public async Task<bool> ApproveRequestMaterial(int id)
        {
            var query = "update tblUsedMaterial set Status = 3 where UsedMaterialID = @UsedMaterialID";

            using (var connection = _dapperContext.CreateConnection())
            {
                connection.Open();
                var rs = await connection.ExecuteAsync(query, new { @UsedMaterialID = id });
                if (rs == 0)
                {
                    return false;
                }
                return true;
            }
        }

        public async Task<bool> DenyRequestMaterial(int id, string message)
        {
            var query = "update tblUsedMaterial set Status = 1, Message = @Message where UsedMaterialID = @UsedMaterialID";

            using (var connection = _dapperContext.CreateConnection())
            {
                connection.Open();
                var rs = await connection.ExecuteAsync(query, new { @UsedMaterialID = id, @Message = message });
                if (rs == 0)
                {
                    return false;
                }
                return true;
            }
        }

        public async Task<IEnumerable<MaterialViewModel>> GetAllRequestMaterial()
        {
            var query = "select UsedMaterialID, used.MaterialID, RequestDetailID, MansonID, quantity, Message, mate.MaterialID, MaterialName, UserID, FullName, PhoneNumber, Address, StatusID, StatusName " +
                "from ((tblUsedMaterial used join tblMaterial mate on used.MaterialID = mate.MaterialID) join tblUsers us on used.MansonID = us.UserID) " +
                "join tblStatus sta on used.Status = sta.StatusID";

            using (var connection = _dapperContext.CreateConnection())
            {
                connection.Open();
                var res = await connection.QueryAsync<MaterialViewModel, TblMaterial, UserViewModel, TblStatus, MaterialViewModel>(query, (requestService, material, user, status) =>
                {
                    requestService.Material = material;
                    requestService.Manson = user;
                    requestService.Status = status;
                    return requestService;
                }, splitOn: "MaterialID, UserID, StatusID");
                connection.Close();
                if (res.Count() == 0)
                {
                    return null;
                }
                return res;
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
