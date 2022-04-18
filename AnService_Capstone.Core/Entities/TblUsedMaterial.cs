using System;
using System.Collections.Generic;

#nullable disable

namespace AnService_Capstone.Core.Entities
{
    public partial class TblUsedMaterial
    {
        public int UsedMaterialId { get; set; }
        public int? MaterialId { get; set; }
        public int? RequestDetailId { get; set; }
        public int? WorkerId { get; set; }
        public decimal? Quantity { get; set; }
        public decimal? QuantityNew { get; set; }
        public int? Status { get; set; }
        public string Note { get; set; }
        public string Message { get; set; }

        public virtual TblMaterial Material { get; set; }
        public virtual TblRequestDetail RequestDetail { get; set; }
    }
}
