using System;
using System.Collections.Generic;

#nullable disable

namespace AnService_Capstone.Core.Entities
{
    public partial class TblService
    {
        public TblService()
        {
            TblRequestDetails = new HashSet<TblRequestDetail>();
        }

        public int ServiceId { get; set; }
        public string ServiceName { get; set; }
        public string ServiceDescription { get; set; }
        public double? ServicePrice { get; set; }
        public bool? ServiceStatus { get; set; }
        public int? TypeMansonJob { get; set; }
        public string ServiceImg { get; set; }

        public virtual ICollection<TblRequestDetail> TblRequestDetails { get; set; }
    }
}
