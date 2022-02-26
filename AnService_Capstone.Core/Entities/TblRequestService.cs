﻿using System;
using System.Collections.Generic;

#nullable disable

namespace AnService_Capstone.Core.Entities
{
    public partial class TblRequestService
    {
        public TblRequestService()
        {
            TblContracts = new HashSet<TblContract>();
            TblMedia = new HashSet<TblMedium>();
            TblRequestDetails = new HashSet<TblRequestDetail>();
        }

        public int RequestServiceId { get; set; }
        public int CustomerId { get; set; }
        public string CustomerName { get; set; }
        public string CustomerPhone { get; set; }
        public string CustomerAddress { get; set; }
        public string RequestServiceDescription { get; set; }
        public int? RequestServiceStatus { get; set; }
        public DateTime? RequestServiceCreateDate { get; set; }
        public int? RequestServicePackage { get; set; }

        public virtual TblUser Customer { get; set; }
        public virtual TblStatus RequestServiceStatusNavigation { get; set; }
        public virtual TblInvoice TblInvoice { get; set; }
        public virtual ICollection<TblContract> TblContracts { get; set; }
        public virtual ICollection<TblMedium> TblMedia { get; set; }
        public virtual ICollection<TblRequestDetail> TblRequestDetails { get; set; }
    }
}
