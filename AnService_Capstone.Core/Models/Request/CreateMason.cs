using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AnService_Capstone.Core.Models.Request
{
    public class CreateMason
    {
        [Required]
        public string FullName { get; set; }
        [Required]
        [Range(0, 9999999999, ErrorMessage = "Phone number incorrect format 10 numbers")]
        public string PhoneNumber { get; set; }
        public string Address { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        [Range(1, int.MaxValue, ErrorMessage = "Must be greater then 0")]
        public int TypeJob { get; set; }
    }
}
