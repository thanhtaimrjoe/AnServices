using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AnService_Capstone.Core.Models.Request
{
    public class CreateInvoice
    {
        /*public class RequestDetailPrice
        {
            public int RequestDetailID { get; set; }
            public double Price { get; set; }
        }*/

        public int ServiceRequestID { get; set; }
        public int ContractID { get; set; }
        /*public IEnumerable<RequestDetailPrice> RequestDetails { get; set; }*/
    }
}
