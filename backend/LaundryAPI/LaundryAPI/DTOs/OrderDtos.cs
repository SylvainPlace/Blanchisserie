namespace LaundryAPI.DTOs
{
    public class ArticleDto
    {
        public string Name { get; set; }
        public int Quantity { get; set; }
    }

    public class CreateOrderDto
    {
        public DateTime Date { get; set; }
        public required List<ArticleDto> Articles { get; set; }
        public string? Reason { get; set; }
        public string? Comment { get; set; }
    }

    public class OrderResponseDto
    {
        public int Id { get; set; }
        public string OrderNumber { get; set; }
        public DateTime Date { get; set; }
        public string Status { get; set; }
        public int RequesterId { get; set; }
        public string Name { get; set; }
        public List<ArticleDto> Articles { get; set; }
        public string? Reason { get; set; }
        public string? Comment { get; set; }
        public string? AdminComment { get; set; }
    }

    public class RejectOrderDto
    {
        public string? AdminComment { get; set; }
    }
}
