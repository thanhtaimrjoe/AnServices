using System;
using System.Collections.Generic;

#nullable disable

namespace AnService_Capstone.Entities
{
    public partial class TblMedium
    {
        public int MediaId { get; set; }
        public int RequestServiceId { get; set; }
        public string MediaUrl { get; set; }

        public virtual TblRequestService RequestService { get; set; }
    }
}
