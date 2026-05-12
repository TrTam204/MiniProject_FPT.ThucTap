namespace MiniStore.DTOs.Product
{
    public class ProductResponseDto
    {
        public int Id { get; set; }

        public string Name { get; set; } = string.Empty;

        public decimal SellPrice { get; set; }

        public int Quantity { get; set; }
    }
}
