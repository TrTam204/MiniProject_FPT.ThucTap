using System.ComponentModel.DataAnnotations;

namespace MiniStore.DTOs.Product
{
    public class ProductUpdateDto
    {
        [Required]
        [MaxLength(100)]
        public string Name { get; set; } = string.Empty;

        [Range(0, double.MaxValue)]
        public decimal SellPrice { get; set; }

        [Range(0, double.MaxValue)]
        public decimal ImportPrice { get; set; }

        public int Quantity { get; set; }
    }
}