using System;
using System.Collections.Generic;

#nullable disable

namespace AnService_Capstone.Core.Entities
{
    public partial class TblReport
    {
        public TblReport()
        {
            TblMedia = new HashSet<TblMedium>();
        }

        public int ReportId { get; set; }
        public int RequestDetailId { get; set; }
        public int MasonId { get; set; }
        public string ReportTitle { get; set; }
        public string ReportDescription { get; set; }
        public DateTime? ReportDate { get; set; }

        public virtual TblUser Mason { get; set; }
        public virtual TblRequestDetail RequestDetail { get; set; }
        public virtual ICollection<TblMedium> TblMedia { get; set; }
    }
}
