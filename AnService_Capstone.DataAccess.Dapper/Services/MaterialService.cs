using AnService_Capstone.Core.Entities;
using AnService_Capstone.Core.Interfaces;
using AnService_Capstone.Core.Interfaces.Services;
using AnService_Capstone.Core.Models.Request;
using AnService_Capstone.Core.Models.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AnService_Capstone.DataAccess.Dapper.Services
{
    public class MaterialService : IMaterialService
    {
        private readonly IMaterialRepository _materialReposiory;
        public MaterialService(IMaterialRepository materialReposiory)
        {
            _materialReposiory = materialReposiory;
        }

        public async Task<ErrorResponse> ApproveRequestMaterial(int id)
        {
            if (id == 0)
            {
                return new ErrorResponse("Please enter id");
            }

            var result = await _materialReposiory.ApproveRequestMaterial(id);
            if (result)
            {
                return new ErrorResponse("Update Successfull");
            }
            return new ErrorResponse("Update Fail");
        }

        public async Task<ErrorResponse> CancelRequestMaterial(int id)
        {
            if (id == 0)
            {
                return new ErrorResponse("Please enter id");
            }

            var res = await _materialReposiory.UpdateStatusRequestMaterial(id, 8);
            if (res)
            {
                return new ErrorResponse("Cancel Successfull");
            }
            return new ErrorResponse("Cancel Fail");
        }

        public async Task<ErrorResponse> DenyRequestMaterial(int id, string message)
        {
            if (id == 0)
            {
                return new ErrorResponse("Please enter id");
            }

            if (message == null)
            {
                return new ErrorResponse("Please enter the reason that you deny this request");
            }

            var result = await _materialReposiory.DenyRequestMaterial(id, message);
            if (result)
            {
                return new ErrorResponse("Update Successfull");
            }
            return new ErrorResponse("Update Fail");
        }

        public async Task<IEnumerable<TblMaterial>> GetAllMaterial()
        {
            var rs = await _materialReposiory.GetAllMaterial();
            return rs;
        }

        public async Task<IEnumerable<MaterialViewModel>> GetAllMaterialByRequestDetailID(int id)
        {
            var result = await _materialReposiory.GetAllMaterialByRequestDetailID(id);
            return result;
        }

        public async Task<IEnumerable<MaterialViewModel>> GetAllMaterialByServiceRequestID(int id)
        {
            var result = await _materialReposiory.GetAllMaterialByServiceRequestID(id);
            return result;
        }

        public async Task<IEnumerable<MaterialViewModel>> GetAllRequestMaterial()
        {
            var result = await _materialReposiory.GetAllRequestMaterial();
            return result;
        }

        public async Task<MaterialViewModel> GetRequestMaterialByID(int id)
        {
            var res = await _materialReposiory.GetRequestMaterialByID(id);
            return res;
        }

        public async Task<IEnumerable<string>> GetUnitList()
        {
            var res = await _materialReposiory.GetListUnit();
            return res;
        }

        public async Task<ErrorResponse> InsertRequestMaterial(RequestMaterial model)
        {
            var result = await _materialReposiory.InsertMaterial(model);
            if (result)
            {
                return new ErrorResponse("Request Successful");
            }
            return new ErrorResponse("Create Fail");
        }

        public async Task<ErrorResponse> UpdateRequestMaterial(int id, int quantityNew, string message)
        {
            if (id == 0)
            {
                return new ErrorResponse("Please enter id");
            }

            if (quantityNew == 0)
            {
                return new ErrorResponse("Please enter quantityNew > 0");
            }

            if (message == null)
            {
                return new ErrorResponse("Please enter the reason that you deny this request");
            }

            var result = await _materialReposiory.UpdateRequestMaterial(id, quantityNew, message);
            if (result)
            {
                return new ErrorResponse("Update Successfull");
            }
            return new ErrorResponse("Update Fail");
        }

        public async Task<ErrorResponse> UpdateStatusRequestMaterial(int id, int status)
        {
            if (id == 0)
            {
                return new ErrorResponse("Please enter id");
            }

            if (status == 0)
            {
                return new ErrorResponse("Please enter status");
            }

            var result = await _materialReposiory.UpdateStatusRequestMaterial(id, status);
            if (result)
            {
                return new ErrorResponse("Update Successfull");
            }
            return new ErrorResponse("Update Fail");
        }
    }
}
