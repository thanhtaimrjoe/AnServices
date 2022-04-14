using AnService_Capstone.Core.Entities;
using AnService_Capstone.Core.Interfaces;
using AnService_Capstone.Core.Interfaces.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AnService_Capstone.DataAccess.Dapper.Services
{
    public class TypeJobService : ITypeJobService
    {
        private readonly ITypeJobRepository _typeJobRepository;
        public TypeJobService(ITypeJobRepository typeJobRepository)
        {
            _typeJobRepository = typeJobRepository;
        }

        public async Task<IEnumerable<TblTypeJob>> GetAll()
        {
            var res = await _typeJobRepository.GetAll();
            if (res == null)
            {
                return null;
            }
            return res;
        }
    }
}
