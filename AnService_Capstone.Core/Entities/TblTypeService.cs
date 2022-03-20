using System;
using System.Collections.Generic;

#nullable disable

namespace AnService_Capstone.Core.Entities
{
    public partial class TblTypeService
    {
        public TblTypeService()
        {
            TblServices = new HashSet<TblService>();
        }

        public int TypeServiceId { get; set; }
        public string TypeServiceDecription { get; set; }
        public int? Value { get; set; }

        public virtual ICollection<TblService> TblServices { get; set; }
    }
}
