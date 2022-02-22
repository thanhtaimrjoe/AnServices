using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AnService_Capstone.Core.Models.Request
{
    public class UpdatePriceRequestDetail
    {
        public int RequestDetailID { get; set; }
        public float RequestDetailPrice { get; set; }
    }
}
