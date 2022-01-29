using System;
using System.Collections.Generic;

#nullable disable

namespace AnService_Capstone.Core.Entities
{
    public partial class TblMedium
    {
        public int MediaId { get; set; }
        public int? RequestServiceId { get; set; }
        public int? ReportId { get; set; }
        public string MediaUrl { get; set; }

        public virtual TblReport Report { get; set; }
        public virtual TblRequestService RequestService { get; set; }
    }
}
