using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AnService_Capstone.Core.Models.Request
{
    public class RequestMaterial
    {
        public class Material
        {
            [Required]
            public int Id { get; set; }
            [Required]
            [Range(1, int.MaxValue, ErrorMessage = "Must be greater then 0")]
            public int quantity { get; set; }
            public string Note { get; set; }
        }

        [Required]
        public int WorkerID { get; set; }
        [Required]
        public int RequestDetailID { get; set; }
        [Required]
        public IEnumerable<Material> MaterialList { get; set; }
    }
}
