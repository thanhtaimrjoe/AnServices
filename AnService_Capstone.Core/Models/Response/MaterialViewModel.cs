using AnService_Capstone.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AnService_Capstone.Core.Models.Response
{
    public class MaterialViewModel
    {
        public int UsedMaterialId { get; set; }
        public TblMaterial Material { get; set; }
        public int? RequestDetailId { get; set; }
        public UserViewModel Worker { get; set; }
        public double Quantity { get; set; }
        public double QuantityNew { get; set; }
        public int Status { get; set; }
        public string ServiceName { get; set; }
        public string Note { get; set; }
        public string Message { get; set; }
        public string ServiceRequestDescription { get; set; }
        public string CustomerName { get; set; }
    }
}
