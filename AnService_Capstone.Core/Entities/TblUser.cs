﻿using System;
using System.Collections.Generic;

#nullable disable

namespace AnService_Capstone.Core.Entities
{
    public partial class TblUser
    {
        public TblUser()
        {
            TblRequestServices = new HashSet<TblRequestService>();
        }

        public int UserId { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string FullName { get; set; }
        public string PhoneNumber { get; set; }
        public string Address { get; set; }
        public string Email { get; set; }
        public string InviteCode { get; set; }
        public int Role { get; set; }
        public int? TypeJob { get; set; }
        public DateTime? CreateDate { get; set; }
        public bool? Status { get; set; }

        public virtual TblRole RoleNavigation { get; set; }
        public virtual TblTypeJob TypeJobNavigation { get; set; }
        public virtual ICollection<TblRequestService> TblRequestServices { get; set; }
    }
}
