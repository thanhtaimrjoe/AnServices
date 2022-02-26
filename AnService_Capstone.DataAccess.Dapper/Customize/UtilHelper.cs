using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AnService_Capstone.DataAccess.Dapper.Customize
{
    public class UtilHelper
    {
        public string GeneratorOTP()
        {
            Random random = new Random();
            string code = (random.Next(100000, 999999).ToString());
            return code;
        }

        public string FormatPhoneNumber(string phone)
        {
            phone = "+84" + phone.Substring(1);
            return phone;
        }
    }
}
