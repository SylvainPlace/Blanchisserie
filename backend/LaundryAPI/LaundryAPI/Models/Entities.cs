namespace LaundryAPI.Models
{
    public enum OrderStatus
    {
        Pending, // En Attente
        Approved,  // Accept�e
        Rejected,   // Rejet�e
        Removed     // Supprim�e (logique)
    }

    public class User
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public bool IsAdmin { get; set; }
        public string? Service { get; set; }
    }

    public class Order
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string UserEmail { get; set; }
        public DateTime Date { get; set; }
        public List<Article> Articles { get; set; } = new List<Article>();
        public OrderStatus Status { get; set; }
        public string? Reason { get; set; }
        public string? Comment { get; set; }
        public string? AdminComment { get; set; }
        public User User { get; set; }
    }

    public class Article
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Quantity { get; set; }
        public int OrderId { get; set; }
        public Order Order { get; set; }
    }
}
