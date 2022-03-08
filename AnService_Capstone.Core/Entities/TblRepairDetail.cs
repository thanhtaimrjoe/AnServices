using System;
using System.Collections.Generic;

#nullable disable

namespace AnService_Capstone.Core.Entities
{
    public partial class TblRepairDetail
    {
        public int RepairDetailId { get; set; }
        public int? RequestDetailId { get; set; }
        public int? WorkerId { get; set; }
        public DateTime? RepairDateBegin { get; set; }
        public DateTime? RepairDateEnd { get; set; }
        public bool? IsPrimary { get; set; }
        public int? RequestDetailPriority { get; set; }

        public virtual TblRequestDetail RequestDetail { get; set; }
        public virtual TblUser Worker { get; set; }
    }
}
