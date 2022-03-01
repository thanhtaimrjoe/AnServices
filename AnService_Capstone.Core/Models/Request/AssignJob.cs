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
        public int RequestDetailId { get; set; }
        [Required]
        public int MainWorker { get; set; }
        [Required]
        public IEnumerable<int> WorkerList { get; set; }
    }
}
