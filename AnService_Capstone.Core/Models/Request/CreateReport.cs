using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AnService_Capstone.Core.Models.Request
{
    public class CreateReport
    {
        [Required(ErrorMessage = "Cant be blank")]
        public int RequestDetailID { get; set; }
        [Required(ErrorMessage = "Cant be blank")]
        public int MasonID { get; set; }
        [Required]
        public string ReportTitle { get; set; }
        [Required]
        public string ReportDescription { get; set; }
        [Required]
        public IEnumerable<string> MediaList { get; set; }
    }
}
