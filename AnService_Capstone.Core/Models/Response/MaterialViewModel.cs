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
        public UserViewModel Manson { get; set; }
        public int? Quantity { get; set; }
        public TblStatus Status { get; set; }
        public string Message { get; set; }
        public string RequestServiceDescription { get; set; }
        public string CustomerName { get; set; }
    }
}
