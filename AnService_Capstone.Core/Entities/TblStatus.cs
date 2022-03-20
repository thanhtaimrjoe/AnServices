using System;
using System.Collections.Generic;

#nullable disable

namespace AnService_Capstone.Core.Entities
{
    public partial class TblStatus
    {
        public TblStatus()
        {
            TblContracts = new HashSet<TblContract>();
            TblRequestDetails = new HashSet<TblRequestDetail>();
            TblServiceRequests = new HashSet<TblServiceRequest>();
            TblUsedMaterials = new HashSet<TblUsedMaterial>();
            TblUsers = new HashSet<TblUser>();
        }

        public int StatusId { get; set; }
        public string StatusName { get; set; }

        public virtual ICollection<TblContract> TblContracts { get; set; }
        public virtual ICollection<TblRequestDetail> TblRequestDetails { get; set; }
        public virtual ICollection<TblServiceRequest> TblServiceRequests { get; set; }
        public virtual ICollection<TblUsedMaterial> TblUsedMaterials { get; set; }
        public virtual ICollection<TblUser> TblUsers { get; set; }
    }
}
