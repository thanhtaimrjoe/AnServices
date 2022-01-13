using System;
using System.Collections.Generic;

#nullable disable

namespace AnService_Capstone.Core.Entities
{
    public partial class TblStatus
    {
        public TblStatus()
        {
            TblRequestServices = new HashSet<TblRequestService>();
        }

        public int StatusId { get; set; }
        public string StatusName { get; set; }

        public virtual ICollection<TblRequestService> TblRequestServices { get; set; }
    }
}
