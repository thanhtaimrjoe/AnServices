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
    public interface IReportService
    {
        public Task<ErrorResponse> CreateReport(CreateReport model);

        public Task<IEnumerable<TblReport>> GetAllReportByRequestDetailID(int id);

        public Task<IEnumerable<TblReport>> GetAllReportByServiceRequestID(int id);
    }
}
