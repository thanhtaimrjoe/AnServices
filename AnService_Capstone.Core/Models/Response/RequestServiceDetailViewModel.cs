using AnService_Capstone.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AnService_Capstone.Core.Models.Response
{
    public class RequestServiceDetailViewModel
    {
        public int RequestDetaiId { get; set; }
        public int RequestServiceId { get; set; }
        public TblService Service { get; set; }
    }
}
