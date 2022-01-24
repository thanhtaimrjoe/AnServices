﻿using System;
using System.Collections.Generic;

#nullable disable

namespace AnService_Capstone.Entities
{
    public partial class TblRepairDetail
    {
        public int RepairDetailId { get; set; }
        public int? RequestDetailId { get; set; }
        public int? MasonId { get; set; }
        public DateTime? RepairDateBegin { get; set; }
        public DateTime? RepairDateEnd { get; set; }
        public int RepairStatus { get; set; }

        public virtual TblUser Mason { get; set; }
        public virtual TblStatus RepairStatusNavigation { get; set; }
        public virtual TblRequestDetail RequestDetail { get; set; }
    }
}
