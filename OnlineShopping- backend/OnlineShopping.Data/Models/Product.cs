using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace OnlineShopping.Data.Models
{
    public class Product
    {
        [Required]
        [Column(TypeName = "nvarchar(50)")]
        public int Id { get; set; }
        public string Name { get; set; }
        [Required]
        [Column(TypeName = "nvarchar(50)")]
        public string Code { get; set; }
        [Required]
        [Column(TypeName = "nvarchar(50)")]
        public int? QuantityInStock { get; set; }
        [Required]
        [Column(TypeName = "nvarchar(50)")]
        public decimal? UnitPrice { get; set; }
    }
}
