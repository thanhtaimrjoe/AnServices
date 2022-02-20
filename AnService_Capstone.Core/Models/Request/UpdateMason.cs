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
        [RegularExpression("^(?!0+$)(\\+\\d{1,3}[- ]?)?(?!0+$)\\d{10}$", ErrorMessage = "Please enter valid phone no.")]
        [Required]
        public string MasonPhoneNumber { get; set;}
        [Required(ErrorMessage = "Cant be blank")]
        public string MasonAddress { get; set;}
        [Required(ErrorMessage = "Cant be blank")]
        [EmailAddress]
        public string MasonEmail { get; set;}
        [Required]
        public int TypeJobId { get; set; }

    }
}
