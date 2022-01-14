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
            TblUsers = new HashSet<TblUser>();
        }

        public int StatusId { get; set; }
        public string StatusName { get; set; }

        public virtual ICollection<TblRequestService> TblRequestServices { get; set; }
        public virtual ICollection<TblUser> TblUsers { get; set; }
    }
}
