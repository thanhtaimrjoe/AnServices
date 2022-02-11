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

        public async Task<IEnumerable<TblMaterial>> GetAllMaterial()
        {
            var query = "select MaterialID, MaterialName, Unit from tblMaterial";

            using (var conn = _dapperContext.CreateConnection())
            {
                conn.Open();
                var rs = await conn.QueryAsync<TblMaterial>(query);
                conn.Close();
                if (!rs.Any())
                {
                    return null;
                }
                return rs;
            }
        }

        public async Task<IEnumerable<MaterialViewModel>> GetAllMaterialByRequestDetailID(int id)
        {
            var query = "select UsedMaterialID, used.MaterialID, used.RequestDetailID, MasonID, quantity, quantityNew, Note, Message, RequestServiceDescription, CustomerName, mate.MaterialID, MaterialName, Unit, UserID, FullName, PhoneNumber, Address, StatusID, StatusName " +
                "from ((((tblUsedMaterial used join tblMaterial mate on used.MaterialID = mate.MaterialID) join tblUsers us on used.MasonID = us.UserID) " +
                "join tblStatus sta on used.Status = sta.StatusID) join tblRequestDetails details on used.RequestDetailID = details.RequestDetaiID) " +
                "join tblRequestServices rs on rs.RequestServiceID = details.RequestServiceID " +
                "where RequestDetailID = @RequestDetailID";

            using (var connection = _dapperContext.CreateConnection())
            {
                connection.Open();
                var res = await connection.QueryAsync<MaterialViewModel, TblMaterial, UserViewModel, TblStatus, MaterialViewModel>(query, (requestService, material, user, status) =>
                {
                    requestService.Material = material;
                    requestService.Mason = user;
                    requestService.Status = status;
                    return requestService;
                }, param: new { @RequestDetailID = id }, splitOn: "MaterialID, UserID, StatusID");
                connection.Close();
                if (res.Count() == 0)
                {
                    return null;
                }
                return res;
            }
        }

        /*public async Task<IEnumerable<MaterialViewModel>> GetAllMaterialByRequestDetailID(int id)
        {
            var query = "select UsedMaterialID, used.MaterialID, RequestDetailID, MasonID, quantity, Message, mate.MaterialID, MaterialName, Unit, UserID, FullName, PhoneNumber, Address, StatusID, StatusName " +
                "from ((tblUsedMaterial used join tblMaterial mate on used.MaterialID = mate.MaterialID) join tblUsers us on used.MasonID = us.UserID) " +
                "join tblStatus sta on used.Status = sta.StatusID " +
                "where RequestDetailID = @RequestDetailID";

            using (var connection = _dapperContext.CreateConnection())
            {
                connection.Open();
                var res = await connection.QueryAsync<MaterialViewModel, TblMaterial, UserViewModel, TblStatus, MaterialViewModel>(query, (requestService, material, user, status) =>
                {
                    requestService.Material = material;
                    requestService.Mason = user;
                    requestService.Status = status;
                    return requestService;
                }, param: new { @RequestDetailID = id }, splitOn: "MaterialID, UserID, StatusID");
                connection.Close();
                if (res.Count() == 0)
                {
                    return null;
                }
                return res;
            }
        }*/

        public async Task<IEnumerable<MaterialViewModel>> GetAllMaterialByRequestServiceID(int id)
        {
            var query = "select UsedMaterialID, used.MaterialID, mate.MaterialID, MaterialName, Unit, quantity " +
                "from ((tblMaterial mate join tblUsedMaterial used on mate.MaterialID = used.MaterialID) " +
                "join tblRequestDetails detail on used.RequestDetailID = RequestDetaiID) " +
                "join tblRequestServices rs on detail.RequestServiceID = rs.RequestServiceID " +
                "where rs.RequestServiceID = @RequestServiceID and Status = 3";

            using (var connection = _dapperContext.CreateConnection())
            {
                connection.Open();
                var res = await connection.QueryAsync<MaterialViewModel, TblMaterial, MaterialViewModel>(query, (requestService, material) =>
                {
                    requestService.Material = material;
                    return requestService;
                }, param: new { @RequestServiceID = id }, splitOn: "MaterialID");
                connection.Close();
                if (res.Count() == 0)
                {
                    return null;
                }
                return res;
            }
        }
        public async Task<IEnumerable<MaterialViewModel>> GetAllRequestMaterial()
        {
            var query = "select UsedMaterialID, used.MaterialID, RequestDetailID, MasonID, quantity, Message, RequestServiceDescription, CustomerName, mate.MaterialID, MaterialName, Unit, UserID, FullName, PhoneNumber, Address, StatusID, StatusName " +
                "from ((((tblUsedMaterial used join tblMaterial mate on used.MaterialID = mate.MaterialID) join tblUsers us on used.MasonID = us.UserID) " +
                "join tblStatus sta on used.Status = sta.StatusID) join tblRequestDetails details on used.RequestDetailID = details.RequestDetaiID) " +
                "join tblRequestServices rs on rs.RequestServiceID = details.RequestServiceID";

            using (var connection = _dapperContext.CreateConnection())
            {
                connection.Open();
                var res = await connection.QueryAsync<MaterialViewModel, TblMaterial, UserViewModel, TblStatus, MaterialViewModel>(query, (requestService, material, user, status) =>
                {
                    requestService.Material = material;
                    requestService.Mason = user;
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

        public async Task<MaterialViewModel> GetRequestMaterialByID(int id)
        {
            var query = "select UsedMaterialID, used.MaterialID, RequestDetailID, MasonID, quantity, Message, RequestServiceDescription, CustomerName, mate.MaterialID, MaterialName, Unit, UserID, FullName, PhoneNumber, Address, StatusID, StatusName " +
                "from ((((tblUsedMaterial used join tblMaterial mate on used.MaterialID = mate.MaterialID) join tblUsers us on used.MasonID = us.UserID) " +
                "join tblStatus sta on used.Status = sta.StatusID) join tblRequestDetails details on used.RequestDetailID = details.RequestDetaiID) " +
                "join tblRequestServices rs on rs.RequestServiceID = details.RequestServiceID " +
                "where UsedMaterialID = @UsedMaterialID";

            using (var connection = _dapperContext.CreateConnection())
            {
                connection.Open();
                var res = await connection.QueryAsync<MaterialViewModel, TblMaterial, UserViewModel, TblStatus, MaterialViewModel>(query, (requestService, material, user, status) =>
                {
                    requestService.Material = material;
                    requestService.Mason = user;
                    requestService.Status = status;
                    return requestService;
                }, param: new { @UsedMaterialID = id}, splitOn: "MaterialID, UserID, StatusID");
                connection.Close();
                if (res.Count() == 0)
                {
                    return null;
                }
                return res.First();
            }

        }

        public async Task<bool> InsertMaterial(RequestMaterial material)
        {
            var query = "insert into tblUsedMaterial(MaterialID, RequestDetailID, MasonID, quantity, Status, Note) " +
                "values(@MaterialID, @RequestDetailID, @MasonID, @quantity, @Status, @Note)";

            foreach (var item in material.MaterialList)
            {
                var parameters = new DynamicParameters();
                parameters.Add("MaterialID", item.Id, DbType.Int32);
                parameters.Add("RequestDetailID", material.RequestDetailID, DbType.Int32);
                parameters.Add("MasonID", material.MasonID, DbType.Int32);
                parameters.Add("quantity", item.quantity, DbType.Int32);
                parameters.Add("Status", 2, DbType.Int32);
                parameters.Add("Note", item.Note, DbType.String);

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

        public async Task<bool> UpdateRequestMaterial(int id, int quantity, string msg)
        {
            var query = "update tblUsedMaterial set quantityNew = @quantityNew, Message = @Message, Status = 3 " +
                "where UsedMaterialID = @UsedMaterialID";

            var parameters = new DynamicParameters();
            parameters.Add("quantityNew", quantity, DbType.Int32);
            parameters.Add("Message", msg, DbType.String);
            parameters.Add("UsedMaterialID", id, DbType.Int32);

            using (var con = _dapperContext.CreateConnection())
            {
                con.Open();
                var rs = await con.ExecuteAsync(query, parameters);
                con.Close();
                if (rs == 0)
                {
                    return false;
                }
                return true;
            }
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
