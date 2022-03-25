using System;
using System.Collections.Generic;

#nullable disable

namespace AnService_Capstone.Core.Entities
{
    public partial class TblInviteCode
    {
        public int InviteCodeId { get; set; }
        public int CustomerId { get; set; }
        public string Code { get; set; }
        public bool? IsUsed { get; set; }
        public DateTime? ExpireDate { get; set; }

        public virtual TblUser Customer { get; set; }
    }
}
