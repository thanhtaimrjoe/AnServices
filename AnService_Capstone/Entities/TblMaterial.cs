using System;
using System.Collections.Generic;

#nullable disable

namespace AnService_Capstone.Entities
{
    public partial class TblMaterial
    {
        public TblMaterial()
        {
            TblUsedMaterials = new HashSet<TblUsedMaterial>();
        }

        public int MaterialId { get; set; }
        public string MaterialName { get; set; }
        public string Unit { get; set; }

        public virtual ICollection<TblUsedMaterial> TblUsedMaterials { get; set; }
    }
}
