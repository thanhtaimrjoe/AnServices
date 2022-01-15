﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AnService_Capstone.Core.Models.Request
{
    public class RequestMaterial
    {
        [Required]
        public int MansonID { get; set; }
        [Required]
        public int RequestDetailID { get; set; }
        [Required]
        public IEnumerable<Material> MaterialList { get; set; }
    }
}
