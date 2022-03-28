using AnService_Capstone.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AnService_Capstone.Core.Models.Response
{
    public class ContractViewModel
    {
        public string CustomerName { get; set; }
        public string CustomerAddress { get; set; }
        public string CustomerPhone { get; set; }
        public string ServiceRequestDescription { get; set; }
        public string ContractStartDate { get; set; }
        public string ContractEndDate { get; set; }
        public double? ContractDeposit { get; set; }
        public double? ContractTotalPrice { get; set; }
        public int PromotionID { get; set; }
        public List<TblRequestDetail> Details { get; set; }
    }
}
