using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AnService_Capstone.Core.Models.Request
{
    public class UpdateMason
    {
        [Required(ErrorMessage = "Please enter id")]
        public int MasonId { get; set; }
        [Required(ErrorMessage = "Cant be blank")]
        public string MasonName { get; set;}
        [Range(0, 9999999999, ErrorMessage = "Phone number incorrect format 10 numbers")]
        [Required]
        public string MasonPhoneNumber { get; set;}
        [Required(ErrorMessage = "Cant be blank")]
        public string MasonAddress { get; set;}
        [Required(ErrorMessage = "Cant be blank")]
        [EmailAddress]
        public string MasonEmail { get; set;}
        [Required]
        public int TypeJob { get; set; }

    }
}
