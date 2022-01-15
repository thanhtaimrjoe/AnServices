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
        public int? MansonId { get; set; }
        public int? Quantity { get; set; }
        public int? Status { get; set; }

        public virtual TblUser Manson { get; set; }
        public virtual TblMaterial Material { get; set; }
        public virtual TblRepairDetail RequestDetail { get; set; }
        public virtual TblStatus StatusNavigation { get; set; }
    }
}
