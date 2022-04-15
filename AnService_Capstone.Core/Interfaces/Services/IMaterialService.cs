using AnService_Capstone.Core.Entities;
using AnService_Capstone.Core.Models.Request;
using AnService_Capstone.Core.Models.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AnService_Capstone.Core.Interfaces.Services
{
    public interface IMaterialService
    {
        public Task<ErrorResponse> InsertRequestMaterial(RequestMaterial model);

        public Task<ErrorResponse> UpdateStatusRequestMaterial(int id, int status);

        public Task<ErrorResponse> ApproveRequestMaterial(int id);

        public Task<ErrorResponse> DenyRequestMaterial(int id, string message);

        public Task<ErrorResponse> UpdateRequestMaterial(int id, int quantityNew, string message);

        public Task<ErrorResponse> CancelRequestMaterial(int id);

        public Task<IEnumerable<MaterialViewModel>> GetAllRequestMaterial();

        public Task<IEnumerable<MaterialViewModel>> GetAllMaterialByRequestDetailID(int id);

        public Task<IEnumerable<MaterialViewModel>> GetAllMaterialByServiceRequestID(int id);

        public Task<IEnumerable<string>> GetUnitList();

        public Task<MaterialViewModel> GetRequestMaterialByID(int id);

        public Task<IEnumerable<TblMaterial>> GetAllMaterial();
    }
}
