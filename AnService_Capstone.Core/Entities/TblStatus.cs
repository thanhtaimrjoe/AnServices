using System;
using System.Collections.Generic;

#nullable disable

namespace AnService_Capstone.Core.Entities
{
    public partial class TblStatus
    {
        public TblStatus()
        {
            TblRepairDetails = new HashSet<TblRepairDetail>();
            TblRequestServices = new HashSet<TblRequestService>();
            TblUsedMaterials = new HashSet<TblUsedMaterial>();
            TblUsers = new HashSet<TblUser>();
        }

        public int StatusId { get; set; }
        public string StatusName { get; set; }

        public virtual ICollection<TblRepairDetail> TblRepairDetails { get; set; }
        public virtual ICollection<TblRequestService> TblRequestServices { get; set; }
        public virtual ICollection<TblUsedMaterial> TblUsedMaterials { get; set; }
        public virtual ICollection<TblUser> TblUsers { get; set; }
    }
}
