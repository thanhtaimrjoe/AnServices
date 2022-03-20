using System;
using System.Collections.Generic;

#nullable disable

namespace AnService_Capstone.Core.Entities
{
    public partial class TblRequestDetail
    {
        public TblRequestDetail()
        {
            TblRepairDetails = new HashSet<TblRepairDetail>();
            TblReports = new HashSet<TblReport>();
            TblUsedMaterials = new HashSet<TblUsedMaterial>();
        }

        public int RequestDetailId { get; set; }
        public int ServiceRequestId { get; set; }
        public int ServiceId { get; set; }
        public int? RequestDetailStatus { get; set; }
        public decimal? RequestDetailPrice { get; set; }
        public string RequestDetailDescription { get; set; }

        public virtual TblStatus RequestDetailStatusNavigation { get; set; }
        public virtual TblService Service { get; set; }
        public virtual TblServiceRequest ServiceRequest { get; set; }
        public virtual ICollection<TblRepairDetail> TblRepairDetails { get; set; }
        public virtual ICollection<TblReport> TblReports { get; set; }
        public virtual ICollection<TblUsedMaterial> TblUsedMaterials { get; set; }
    }
}
