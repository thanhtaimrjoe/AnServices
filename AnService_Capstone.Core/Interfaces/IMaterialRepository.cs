using AnService_Capstone.Core.Entities;
using AnService_Capstone.Core.Models;
using AnService_Capstone.Core.Models.Request;
using AnService_Capstone.Core.Models.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AnService_Capstone.Core.Interfaces
{
    public interface IMaterialRepository
    {
        public Task<bool> InsertMaterial(RequestMaterial material);

        public Task<IEnumerable<MaterialViewModel>> GetAllRequestMaterial();

        public Task<bool> UpdateStatusRequestMaterial(int id, int status);

        public Task<bool> UpdateRequestMaterial(int id, int quantity, string msg);

        public Task<bool> ApproveRequestMaterial(int id);

        public Task<bool> DenyRequestMaterial(int id, string message);

        /*public Task<bool> CacelRequestMaterial(int id);*/

        public Task<IEnumerable<TblMaterial>> GetAllMaterial();

        public Task<IEnumerable<MaterialViewModel>> GetAllMaterialByRequestDetailID(int id);

        public Task<IEnumerable<MaterialViewModel>> GetAllMaterialByRequestServiceID(int id);

        public Task<MaterialViewModel> GetRequestMaterialByID(int id);

        public Task<IEnumerable<string>> GetListUnit();
    }
}
