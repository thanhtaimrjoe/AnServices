using System;
using System.Collections.Generic;

#nullable disable

namespace AnService_Capstone.Core.Entities
{
    public partial class TblTypeJob
    {
        public TblTypeJob()
        {
            TblUsers = new HashSet<TblUser>();
        }

        public int TypeJobId { get; set; }
        public string TypeJobName { get; set; }

        public virtual ICollection<TblUser> TblUsers { get; set; }
    }
}
