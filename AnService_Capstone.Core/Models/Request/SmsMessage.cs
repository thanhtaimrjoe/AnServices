using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AnService_Capstone.Core.Models.Request
{
    public class SmsMessage
    {
        public string To { get; set; }
        public string From { get; set; }
    }
}
