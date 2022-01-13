using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AnService_Capstone.DataAccess.Dapper.Customize
{
    public class OTPGenerator
    {
        public string GeneratorOTP()
        {
            Random random = new Random();
            string code = (random.Next(100000, 999999).ToString());
            return code;
        }
    }
}
