﻿using AnService_Capstone.Core.Entities;
using AnService_Capstone.Core.Interfaces;
using AnService_Capstone.Core.Models.Request;
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
    public class ReportRepository : IReport
    {
        private readonly DapperContext _context;

        public ReportRepository(DapperContext context)
        {
            _context = context;
        }

        public async Task<bool> CreateMedia(int requestID, string url)
        {
            var query = "insert into tblMedia (ReportID, MediaUrl) values (@ReportID, @MediaUrl)";

            var parameters = new DynamicParameters();
            parameters.Add("ReportID", requestID, DbType.Int32);
            parameters.Add("MediaUrl", url, DbType.String);

            using (var connection = _context.CreateConnection())
            {
                connection.Open();
                var result = await connection.ExecuteAsync(query, parameters);
                connection.Close();
                if (result > 0)
                {
                    return true;
                }
                return false;
            }
        }

        public async Task<int> CreateReport(CreateReport model)
        {
            var query = "insert into tblReport(RequestDetailID, MasonID, ReportDescription, ReportDate) " +
                "values(@RequestDetailID, @MasonID, @ReportDescription, @ReportDate) " +
                "SELECT CAST(SCOPE_IDENTITY() as int)";

            var parameters = new DynamicParameters();
            parameters.Add("RequestDetailID", model.RequestDetailID, DbType.Int32);
            parameters.Add("MasonID", model.MasonID, DbType.Int32);
            parameters.Add("ReportDescription", model.ReportDescription, DbType.String);
            parameters.Add("ReportDate", DateTime.Now, DbType.DateTime);

            using (var connection = _context.CreateConnection())
            {
                connection.Open();
                var id = await connection.QuerySingleAsync<int>(query, parameters);
                connection.Close();
                return id;
            }
        }

        public async Task<IEnumerable<TblReport>> GetAllReportByMasonID(int id)
        {
            var query = "select report.ReportID, RequestDetailID, MasonID, ReportDescription, ReportDate, MediaID, MediaUrl " +
                "from tblReport report join tblMedia media on report.ReportID = media.ReportID " +
                "where MasonID = @MasonID";  
            
            using (var connection = _context.CreateConnection())
            {
                connection.Open();
                var requestDict = new Dictionary<int, TblReport>();
                var res = await connection.QueryAsync<TblReport, TblMedium, TblReport>(query, (report, media) =>
                {
                    TblReport currentReport;
                    if (!requestDict.TryGetValue(report.ReportId, out currentReport))
                    {
                        currentReport = report;
                        currentReport.TblMedia = new List<TblMedium>();
                        requestDict.Add(currentReport.ReportId, currentReport);
                    }
                    currentReport.TblMedia.Add(media);
                    return currentReport;
                }, param: new { @MasonID = id }, splitOn: "MediaID");
                connection.Close();
                if (!res.Any())
                {
                    return null;
                }
                return res;
            }
        }
    }
}
