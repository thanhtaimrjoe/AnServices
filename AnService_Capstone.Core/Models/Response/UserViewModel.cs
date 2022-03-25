using AnService_Capstone.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AnService_Capstone.Core.Models.Response
{
    public class UserViewModel
    {
        public int UserID { get; set; }
        public string UserName { get; set; }
        public string FullName { get; set; }
        public string PhoneNumber { get; set; }
        public string Address { get; set; }
        public string Email { get; set; }
        /*public string InviteCode { get; set; }*/
        public string RoleName { get; set; }
        public TblTypeJob TypeJob { get; set; }
        public DateTime CreateDate { get; set; }
        public int Status { get; set; }
    }
}
