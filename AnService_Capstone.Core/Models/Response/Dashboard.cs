using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AnService_Capstone.Core.Models.Response
{
    public class Dashboard
    {
        public class AmountOfSalesInYear
        {
            public int Year { get; set; }
            public int January { get; set; }
            public int February { get; set; }
            public int March { get; set; }
            public int April { get; set; }
            public int May { get; set; }
            public int June { get; set; }
            public int July { get; set; }
            public int August { get; set; }
            public int September { get; set; }
            public int October { get; set; }
            public int November { get; set; }
            public int December { get; set; }
        }

        public class ServiceStatusStatistic
        {
            public int Pending { get; set; }
            public int Deny { get; set; }
            public int Agreed { get; set; }
            public int Processing { get; set; }
            public int Cancel { get; set; }
            public int Accomplished { get; set; }
            public int Payment { get; set; }
            public int Surveying { get; set; }
        }

        public IEnumerable<AmountOfSalesInYear> AmountOfSalesInYears { get; set; }
        public ServiceStatusStatistic ServiceStatusStatistics { get; set; }
    }
}
