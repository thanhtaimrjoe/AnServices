using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AnService_Capstone.DataAccess.Dapper.Customize
{
    public class UtilHelper
    {
        private static Random random = new Random();

        public string GeneratorOTP()
        {
            string code = (random.Next(100000, 999999).ToString());
            return code;
        }

        public string FormatPhoneNumber(string phone)
        {
            phone = "+84" + phone.Substring(1);
            return phone;
        }

        public string RandomString(int length)
        {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            return new string(Enumerable.Repeat(chars, length)
                .Select(s => s[random.Next(s.Length)]).ToArray());
        }
    }
}
