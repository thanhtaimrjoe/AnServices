using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AnService_Capstone.Core.Models.Request
{
    public class UpdateWorker
    {
        [Required(ErrorMessage = "Please enter id")]
        public int WorkerId { get; set; }
        [Required(ErrorMessage = "Cant be blank")]
        public string WorkerName { get; set;}
        [RegularExpression("^(?!0+$)(\\+\\d{1,3}[- ]?)?(?!0+$)\\d{10}$", ErrorMessage = "Please enter valid phone no.")]
        [Required]
        public string WorkerPhoneNumber { get; set;}
        [Required(ErrorMessage = "Cant be blank")]
        public string WorkerAddress { get; set;}
        [Required(ErrorMessage = "Cant be blank")]
        [EmailAddress]
        public string WorkerEmail { get; set;}
        [Required]
        public int TypeJobId { get; set; }

    }
}
