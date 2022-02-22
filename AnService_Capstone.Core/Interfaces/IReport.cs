using AnService_Capstone.Core.Entities;
using AnService_Capstone.Core.Models.Request;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AnService_Capstone.Core.Interfaces
{
    public interface IReport
    {
        public Task<int> CreateReport(CreateReport model);

        public Task<bool> CreateMedia(int requestID, string url);

        public Task<IEnumerable<TblReport>> GetAllReportByRequestDetailID(int id);

        public Task<IEnumerable<TblReport>> GetAllReportByRequestServiceID(int id);
    }
}
