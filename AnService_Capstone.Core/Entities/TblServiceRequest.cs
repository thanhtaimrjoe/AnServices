using System;
using System.Collections.Generic;

#nullable disable

namespace AnService_Capstone.Core.Entities
{
    public partial class TblServiceRequest
    {
        public TblServiceRequest()
        {
            TblContracts = new HashSet<TblContract>();
            TblMedia = new HashSet<TblMedium>();
            TblRequestDetails = new HashSet<TblRequestDetail>();
        }

        public int ServiceRequestId { get; set; }
        public int CustomerId { get; set; }
        public string CustomerName { get; set; }
        public string CustomerPhone { get; set; }
        public string CustomerAddress { get; set; }
        public string ServiceRequestDescription { get; set; }
        public int? ServiceRequestStatus { get; set; }
        public DateTime? ServiceRequestCreateDate { get; set; }
        public int? ServiceRequestPackage { get; set; }

        public virtual TblUser Customer { get; set; }
        public virtual TblStatus ServiceRequestStatusNavigation { get; set; }
        public virtual ICollection<TblContract> TblContracts { get; set; }
        public virtual ICollection<TblMedium> TblMedia { get; set; }
        public virtual ICollection<TblRequestDetail> TblRequestDetails { get; set; }
    }
}
