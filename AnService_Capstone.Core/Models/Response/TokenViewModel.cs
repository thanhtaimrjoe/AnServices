using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AnService_Capstone.Core.Models.Response
{
    public class TokenViewModel
    {
        public int Id { get; set; }
        public string Token { get; set; }
        public string RefreshToken { get; set; }
        public string FullName { get; set; }
        public string UserRole { get; set; }
        public DateTime Expired { get; set; }
    }
}
