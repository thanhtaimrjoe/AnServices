using AnService_Capstone.Core.Entities;
using AnService_Capstone.Core.Models.Request;
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

        public Task<IEnumerable<TblUsedMaterial>> GetAllRequestMaterial();

        public Task<bool> UpdateStatusRequestMaterial(int id, int status);
    }
}
