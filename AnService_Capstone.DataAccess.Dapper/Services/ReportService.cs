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
    public class ReportService : IReportService
    {
        private readonly IReport _report;
        private readonly IServiceRepository _serviceRepository;
        public ReportService(IReport report, IServiceRepository serviceRepository)
        {
            _report = report;
            _serviceRepository = serviceRepository;
        }

        public async Task<ErrorResponse> CreateReport(CreateReport model)
        {
            bool media = false;

            var reqService = await _report.CreateReport(model);

            foreach (var mediaItem in model.MediaList)
            {
                media = await _report.CreateMedia(reqService, mediaItem);
            }

            if (media)
            {
                if (model.ReportTitle.Equals("Báo cáo hoàn thành"))
                {
                    _ = await _serviceRepository.UpdateStatusServiceRequestDetail(model.RequestDetailID, 9);
                }
                return new ErrorResponse("Create Successfull");
            }
            return new ErrorResponse("Create Fail");
        }

        public async Task<IEnumerable<TblReport>> GetAllReportByRequestDetailID(int id)
        {
            var res = await _report.GetAllReportByRequestDetailID(id);
            return res;
        }

        public async Task<IEnumerable<TblReport>> GetAllReportByServiceRequestID(int id)
        {
            var res = await _report.GetAllReportByServiceRequestID(id);
            return res;
        }
    }
}
