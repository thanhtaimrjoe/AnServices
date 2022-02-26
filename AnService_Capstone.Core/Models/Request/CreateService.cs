﻿using Microsoft.AspNetCore.Http;
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
        [RegularExpression("^(?!0+$)(\\+\\d{1,3}[- ]?)?(?!0+$)\\d{10}$", ErrorMessage = "Please enter valid phone no.")]
        public string CustomerPhone { get; set; }
        [Required(ErrorMessage = "Cant be blank")]
        public string CustomerAddress { get; set; }
        [Required]
        [Range(1, 2, ErrorMessage = "Please enter Request Service Package (1 or 2)")]
        public int RequestServicePackage { get; set; }
        [Required]
        public IEnumerable<int> ServiceList { get; set; }
        [Required]
        public string RequestServiceDescription { get; set; }
        public List<IFormFile> File { get; set; }
    }
}
