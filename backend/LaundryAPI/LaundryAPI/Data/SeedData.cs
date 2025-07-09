using LaundryAPI.Data;
using LaundryAPI.Models;

public static class SeedData
{
    public static void Initialize(LaundryContext context)
    {
        // Check already initialized
        if (context.Users.Any())
        {
            return;
        }

        var users = new List<User>
        {
            new User
            {
                Email = "admin@laundry.com",
                Password = BCrypt.Net.BCrypt.HashPassword("admin123"),
                FirstName = "Admin",
                LastName = "User",
                IsAdmin = true,
                Service = "Blanchisserie",
            },
            new User
            {
                Email = "user@laundry.com",
                Password = BCrypt.Net.BCrypt.HashPassword("user123"),
                FirstName = "John",
                LastName = "Doe",
                IsAdmin = false,
                Service = "Cardiologie",
            }
        };

        var orders = new List<Order>
        {
            new Order
            {
                UserId = 2,
                UserEmail = "user@laundry.com",
                Date = DateTime.Now,
                Status = OrderStatus.Pending,
                Reason = "Demande de lavage",
                Comment = "Laver à froid",
                Articles = new List<Article>
                {
                    new Article { Name = "T-shirt", Quantity = 2 },
                    new Article { Name = "Pantalon", Quantity = 1 }
                }
            },
            new Order
            {
                UserId = 2,
                UserEmail = "user@laundry.com",
                Date = DateTime.Now.AddDays(-1),
                Status = OrderStatus.Approved,
                Reason = "Demande de repassage",
                Comment = "Repasser à haute température",
                Articles = new List<Article>
                {
                    new Article { Name = "Chemise", Quantity = 1 },
                    new Article { Name = "Jupe", Quantity = 1 }
                }
            },
            new Order
            {
                UserId = 2,
                UserEmail = "user@laundry.com",
                Date = DateTime.Now.AddDays(-5),
                Status = OrderStatus.Rejected,
                Reason = "Demande de nettoyage à sec",
                Comment = "Ne pas utiliser de produits chimiques",
                Articles = new List<Article>
                {
                    new Article { Name = "Costume", Quantity = 1 },
                    new Article { Name = "Robe", Quantity = 1 }
                }
            }
        };

        context.Users.AddRange(users);
        context.Orders.AddRange(orders);
        context.SaveChanges();
    }
}
