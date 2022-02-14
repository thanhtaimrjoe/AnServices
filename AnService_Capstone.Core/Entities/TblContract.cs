using System;
using System.Collections.Generic;

#nullable disable

namespace AnService_Capstone.Core.Entities
{
    public partial class TblContract
    {
        public int ContactId { get; set; }
        public int? CustomerId { get; set; }
        public string ContactTitle { get; set; }
        public string ContactUrl { get; set; }

        public virtual TblUser Customer { get; set; }
    }
}
