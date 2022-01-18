using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AnService_Capstone.Core.Models.Request
{
    public class CreateService
    {
        [Required(ErrorMessage = "Cant be blank")]
        public int CustomerId { get; set; }
        [Required(ErrorMessage = "Cant be blank")]
        public string CustomerName { get; set; }
        [Required]
        [Range(0, 9999999999, ErrorMessage = "Phone number incorrect format 10 numbers")]
        public string CustomerPhone { get; set; }
        [Required(ErrorMessage = "Cant be blank")]
        public string CustomerAddress { get; set; }
        [Required]
        public IEnumerable<int> ServiceList { get; set; }
        [Required]
        public string RequestServiceDescription { get; set; }
        [Required]
        public IEnumerable<string> MediaList { get; set; }
    }
}
