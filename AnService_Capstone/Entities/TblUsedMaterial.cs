using System;
using System.Collections.Generic;

#nullable disable

namespace AnService_Capstone.Entities
{
    public partial class TblUsedMaterial
    {
        public int UsedMaterialId { get; set; }
        public int? MaterialId { get; set; }
        public int? RequestDetailId { get; set; }
        public int? MasonId { get; set; }
        public int? Quantity { get; set; }
        public int? QuantityNew { get; set; }
        public int? Status { get; set; }
        public string Note { get; set; }
        public string Message { get; set; }

        public virtual TblUser Mason { get; set; }
        public virtual TblMaterial Material { get; set; }
        public virtual TblRequestDetail RequestDetail { get; set; }
        public virtual TblStatus StatusNavigation { get; set; }
    }
}
