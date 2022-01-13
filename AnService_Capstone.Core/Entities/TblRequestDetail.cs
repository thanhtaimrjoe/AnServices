﻿using System;
using System.Collections.Generic;

#nullable disable

namespace AnService_Capstone.Core.Entities
{
    public partial class TblRequestDetail
    {
        public int RequestDetaiId { get; set; }
        public int RequestServiceId { get; set; }
        public int ServiceId { get; set; }

        public virtual TblRequestService RequestService { get; set; }
        public virtual TblService Service { get; set; }
    }
}
