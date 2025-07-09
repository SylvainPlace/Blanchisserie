using LaundryAPI.Data;
using LaundryAPI.DTOs;
using LaundryAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace LaundryAPI.Services
{
    public class OrderService
    {
        private readonly LaundryContext _context;
        public OrderService(LaundryContext context)
        {
            _context = context;
        }

        public int CreateOrder(int userId, CreateOrderDto dto)
        {
            var user = _context.Users.Find(userId);
            if (user == null) throw new UnauthorizedAccessException();
            var order = new Order
            {
                UserId = user.Id,
                UserEmail = user.Email,
                Date = dto.Date,
                Status = OrderStatus.Pending,
                Reason = dto.Reason,
                Comment = dto.Comment,
                User = user,
                Articles = dto.Articles.Select(a => new Article { Name = a.Name, Quantity = a.Quantity }).ToList()
            };
            _context.Orders.Add(order);
            _context.SaveChanges();
            return order.Id;
        }

        public IEnumerable<OrderResponseDto> GetOrders(int userId)
        {
            var orders = _context.Orders
                .Include(o => o.User)
                .Include(o => o.Articles)
                .Where(o => o.UserId == userId)
                .ToList();
            return orders.Select(o => new OrderResponseDto
            {
                Id = o.Id,
                OrderNumber = o.Id.ToString(),
                Date = o.Date,
                Status = o.Status.ToString(),
                RequesterId = o.UserId,
                Name = o.User.FirstName + " " + o.User.LastName,
                Articles = o.Articles.Select(a => new ArticleDto { Name = a.Name, Quantity = a.Quantity }).ToList(),
                Reason = o.Reason,
                Comment = o.Comment,
                AdminComment = o.AdminComment
            });
        }

        public OrderResponseDto? GetOrderById(int userId, int orderId)
        {
            var order = _context.Orders.Include(o => o.User).Include(o => o.Articles).FirstOrDefault(o => o.Id == orderId && o.UserId == userId);
            if (order == null) return null;
            return new OrderResponseDto
            {
                Id = order.Id,
                OrderNumber = order.Id.ToString(),
                Date = order.Date,
                Status = order.Status.ToString(),
                RequesterId = order.UserId,
                Name = order.User.FirstName + " " + order.User.LastName,
                Articles = order.Articles.Select(a => new ArticleDto { Name = a.Name, Quantity = a.Quantity }).ToList(),
                Reason = order.Reason,
                Comment = order.Comment,
                AdminComment = order.AdminComment
            };
        }

        public IEnumerable<OrderResponseDto> GetAllOrdersForAdmin()
        {
            var orders = _context.Orders.Include(o => o.User).Include(o => o.Articles).ToList();
            return orders.Select(o => new OrderResponseDto
            {
                Id = o.Id,
                OrderNumber = o.Id.ToString(),
                Date = o.Date,
                Status = o.Status.ToString(),
                RequesterId = o.UserId,
                Name = o.User.FirstName + " " + o.User.LastName,
                Articles = o.Articles.Select(a => new ArticleDto { Name = a.Name, Quantity = a.Quantity }).ToList(),
                Reason = o.Reason,
                Comment = o.Comment,
                AdminComment = o.AdminComment
            });
        }

        public OrderResponseDto? GetOrderByIdForAdmin(int orderId)
        {
            var order = _context.Orders.Include(o => o.User).Include(o => o.Articles).FirstOrDefault(o => o.Id == orderId);
            if (order == null) return null;
            return new OrderResponseDto
            {
                Id = order.Id,
                OrderNumber = order.Id.ToString(),
                Date = order.Date,
                Status = order.Status.ToString(),
                RequesterId = order.UserId,
                Name = order.User.FirstName + " " + order.User.LastName,
                Articles = order.Articles.Select(a => new ArticleDto { Name = a.Name, Quantity = a.Quantity }).ToList(),
                Reason = order.Reason,
                Comment = order.Comment,
                AdminComment = order.AdminComment
            };
        }

        public bool ValidateOrder(int orderId)
        {
            var order = _context.Orders.FirstOrDefault(o => o.Id == orderId);
            if (order == null) return false;
            if (order.Status != OrderStatus.Pending) throw new InvalidOperationException("Seules les commandes en attente peuvent �tre valid�es.");
            order.Status = OrderStatus.Approved;
            _context.SaveChanges();
            return true;
        }

        public bool RejectOrder(int orderId, string? adminComment)
        {
            var order = _context.Orders.FirstOrDefault(o => o.Id == orderId);
            if (order == null) return false;
            if (order.Status != OrderStatus.Pending) throw new InvalidOperationException("Seules les commandes en attente peuvent �tre rejet�es.");
            order.Status = OrderStatus.Rejected;
            order.AdminComment = adminComment;
            _context.SaveChanges();
            return true;
        }

        public bool RemoveOrder(int orderId, int userId)
        {
            var order = _context.Orders.FirstOrDefault(o => o.Id == orderId && o.UserId == userId);
            if (order == null) return false;
            if (order.Status == OrderStatus.Removed) return false;
            order.Status = OrderStatus.Removed;
            _context.SaveChanges();
            return true;
        }
    }
}
