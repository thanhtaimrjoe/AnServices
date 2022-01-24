using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AnService_Capstone.Core.Models.Request
{
    public class AssignJob
    {
        [Required]
        public int RequestDetail { get; set; }
        [Required]
        public IEnumerable<int> MasonList { get; set; }
    }
}
