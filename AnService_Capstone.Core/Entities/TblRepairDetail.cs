using System;
using System.Collections.Generic;

#nullable disable

namespace AnService_Capstone.Core.Entities
{
    public partial class TblRepairDetail
    {
        public int RepairDetailId { get; set; }
        public int? RequestDetailId { get; set; }
        public int? MansonId { get; set; }
        public DateTime? RepairDateBegin { get; set; }
        public DateTime? RepairDateEnd { get; set; }
        public int RepairStatus { get; set; }

        public virtual TblUser Manson { get; set; }
        public virtual TblStatus RepairStatusNavigation { get; set; }
        public virtual TblRequestDetail RequestDetail { get; set; }
    }
}
