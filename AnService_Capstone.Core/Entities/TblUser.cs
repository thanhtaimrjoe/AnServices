using System;
using System.Collections.Generic;

#nullable disable

namespace AnService_Capstone.Core.Entities
{
    public partial class TblUser
    {
        public TblUser()
        {
            TblContracts = new HashSet<TblContract>();
            TblInviteCodes = new HashSet<TblInviteCode>();
            TblPromotions = new HashSet<TblPromotion>();
            TblRepairDetails = new HashSet<TblRepairDetail>();
            TblReports = new HashSet<TblReport>();
            TblServiceRequests = new HashSet<TblServiceRequest>();
        }

        public int UserId { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string FullName { get; set; }
        public string PhoneNumber { get; set; }
        public string Address { get; set; }
        public string Email { get; set; }
        public int Role { get; set; }
        public int? TypeJob { get; set; }
        public DateTime? CreateDate { get; set; }
        public DateTime? UpdateDate { get; set; }
        public int? Status { get; set; }

        public virtual TblRole RoleNavigation { get; set; }
        public virtual TblStatus StatusNavigation { get; set; }
        public virtual TblTypeJob TypeJobNavigation { get; set; }
        public virtual ICollection<TblContract> TblContracts { get; set; }
        public virtual ICollection<TblInviteCode> TblInviteCodes { get; set; }
        public virtual ICollection<TblPromotion> TblPromotions { get; set; }
        public virtual ICollection<TblRepairDetail> TblRepairDetails { get; set; }
        public virtual ICollection<TblReport> TblReports { get; set; }
        public virtual ICollection<TblServiceRequest> TblServiceRequests { get; set; }
    }
}
