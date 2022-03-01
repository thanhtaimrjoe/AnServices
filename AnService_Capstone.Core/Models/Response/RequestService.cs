using AnService_Capstone.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AnService_Capstone.Core.Models.Response
{
    public class RequestService
    {
        public int RequestServiceId { get; set; }
        public UserViewModel User { get; set; }
        /*public int StatusId { get; set; }*/
        public string CustomerName  { get; set; }
        public string CustomerPhone { get; set; }
        public string CustomerAddress { get; set; }
        public string RequestServiceDescription { get; set; }
        public TblContract Contract { get; set; }
        public TblStatus RequestServiceStatus { get; set; }
        public DateTime? RequestServiceCreateDate { get; set; }
        public int RequestServicePackage { get; set; }
        public List<TblMedium> Media { get; set; }
    }
}
