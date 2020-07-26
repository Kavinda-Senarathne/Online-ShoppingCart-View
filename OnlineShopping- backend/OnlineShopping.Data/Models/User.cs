using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace OnlineShopping.Data.Models
{
    public class User
    {

        [Required]
        [Column(TypeName = "nvarchar(60)")]
        public string FullName { get; set; }
        [Required]
        [Column(TypeName = "nvarchar(60)")]
        public string Email { get; set; }
        [Required]
        [Column(TypeName = "nvarchar(50)")]
        public string Address_Line1 { get; set; }
        [Required]
        [Column(TypeName = "nvarchar(50)")]
        public string Address_Line2 { get; set; }
        [Required]
        [Column(TypeName = "nvarchar(50)")]
        public string State { get; set; }
        [Required]
        [Column(TypeName = "nvarchar(50)")]
        public string PostalCode { get; set; }
        [Required]
        [Column(TypeName = "nvarchar(50)")]
        public string Password { get; set; }
    }
}
