using Xunit;
using LaundryAPI.Services;
using LaundryAPI.Data;
using LaundryAPI.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace LaundryAPI.Tests
{
    public class OrderServiceTests
    {
        private LaundryContext GetDbContext()
        {
            var options = new DbContextOptionsBuilder<LaundryContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString())
                .Options;
            var context = new LaundryContext(options);
            context.Users.Add(new User
            {
                Email = "user@laundry.com",
                Password = BCrypt.Net.BCrypt.HashPassword("user123"),
                FirstName = "John",
                LastName = "Doe",
                IsAdmin = false,
                Service = "Cardiologie"
            });
            context.SaveChanges();
            return context;
        }

        [Fact]
        public void CreateOrder_ShouldAddOrder()
        {
            // Arrange
            var context = GetDbContext();
            var userId = context.Users.First().Id;
            var service = new OrderService(context);
            var dto = new LaundryAPI.DTOs.CreateOrderDto
            {
                Date = DateTime.Now,
                Articles = new List<LaundryAPI.DTOs.ArticleDto> { new LaundryAPI.DTOs.ArticleDto { Name = "T-shirt", Quantity = 2 } },
                Reason = "Test",
                Comment = "Test comment"
            };

            // Act
            var orderId = service.CreateOrder(userId, dto);

            // Assert
            var order = context.Orders.Find(orderId);
            Assert.NotNull(order);
            Assert.Equal("Test", order.Reason);
        }

        [Fact]
        public void GetOrders_ShouldReturnOrdersForUser()
        {
            // Arrange
            var context = GetDbContext();
            var userId = context.Users.First().Id;
            var service = new OrderService(context);
            var dto = new LaundryAPI.DTOs.CreateOrderDto
            {
                Date = DateTime.Now,
                Articles = new List<LaundryAPI.DTOs.ArticleDto> { new LaundryAPI.DTOs.ArticleDto { Name = "T-shirt", Quantity = 2 } },
                Reason = "Test",
                Comment = "Test comment"
            };
            service.CreateOrder(userId, dto);

            // Act
            var orders = service.GetOrders(userId).ToList();

            // Assert
            Assert.Contains(orders, o => o.Reason == "Test");
            Assert.All(orders, o => Assert.Equal(userId, o.RequesterId));
        }

        [Fact]
        public void ValidateOrder_ShouldApproveOrder()
        {
            // Arrange
            var context = GetDbContext();
            var userId = context.Users.First().Id;
            var service = new OrderService(context);
            var dto = new LaundryAPI.DTOs.CreateOrderDto
            {
                Date = DateTime.Now,
                Articles = new List<LaundryAPI.DTOs.ArticleDto> { new LaundryAPI.DTOs.ArticleDto { Name = "T-shirt", Quantity = 2 } },
                Reason = "Test",
                Comment = "Test comment"
            };
            var orderId = service.CreateOrder(userId, dto);

            // Act
            var result = service.ValidateOrder(orderId);

            // Assert
            Assert.True(result);
            var order = context.Orders.Find(orderId);
            Assert.Equal(OrderStatus.Approved, order.Status);
        }

        [Fact]
        public void RejectOrder_ShouldRejectOrder()
        {
            // Arrange
            var context = GetDbContext();
            var userId = context.Users.First().Id;
            var service = new OrderService(context);
            var dto = new LaundryAPI.DTOs.CreateOrderDto
            {
                Date = DateTime.Now,
                Articles = new List<LaundryAPI.DTOs.ArticleDto> { new LaundryAPI.DTOs.ArticleDto { Name = "T-shirt", Quantity = 2 } },
                Reason = "Test",
                Comment = "Test comment"
            };
            var orderId = service.CreateOrder(userId, dto);

            // Act
            var result = service.RejectOrder(orderId, null);

            // Assert
            Assert.True(result);
            var order = context.Orders.Find(orderId);
            Assert.Equal(OrderStatus.Rejected, order.Status);
        }

        [Fact]
        public void RemoveOrder_ShouldSetOrderStatusToRemoved()
        {
            // Arrange
            var context = GetDbContext();
            var userId = context.Users.First().Id;
            var service = new OrderService(context);
            var dto = new LaundryAPI.DTOs.CreateOrderDto
            {
                Date = DateTime.Now,
                Articles = new List<LaundryAPI.DTOs.ArticleDto> { new LaundryAPI.DTOs.ArticleDto { Name = "T-shirt", Quantity = 2 } },
                Reason = "Test",
                Comment = "Test comment"
            };
            var orderId = service.CreateOrder(userId, dto);

            // Act
            var result = service.RemoveOrder(orderId, userId);

            // Assert
            Assert.True(result);
            var order = context.Orders.Find(orderId);
            Assert.Equal(OrderStatus.Removed, order.Status);
        }

        [Fact]
        public void GetOrderById_ShouldReturnOrderForUser()
        {
            var context = GetDbContext();
            var userId = context.Users.First().Id;
            var service = new OrderService(context);
            var dto = new LaundryAPI.DTOs.CreateOrderDto
            {
                Date = DateTime.Now,
                Articles = new List<LaundryAPI.DTOs.ArticleDto> { new LaundryAPI.DTOs.ArticleDto { Name = "T-shirt", Quantity = 2 } },
                Reason = "Test",
                Comment = "Test comment"
            };
            var orderId = service.CreateOrder(userId, dto);
            var order = service.GetOrderById(userId, orderId);
            Assert.NotNull(order);
            Assert.Equal(orderId, order.Id);
            Assert.Equal(userId, order.RequesterId);
        }

        [Fact]
        public void GetOrderById_ShouldReturnNullForWrongUser()
        {
            var context = GetDbContext();
            var userId = context.Users.First().Id;
            var service = new OrderService(context);
            var dto = new LaundryAPI.DTOs.CreateOrderDto
            {
                Date = DateTime.Now,
                Articles = new List<LaundryAPI.DTOs.ArticleDto> { new LaundryAPI.DTOs.ArticleDto { Name = "T-shirt", Quantity = 2 } },
                Reason = "Test",
                Comment = "Test comment"
            };
            var orderId = service.CreateOrder(userId, dto);
            var order = service.GetOrderById(userId + 1, orderId);
            Assert.Null(order);
        }

        [Fact]
        public void GetAllOrdersForAdmin_ShouldReturnAllOrders()
        {
            var context = GetDbContext();
            var userId = context.Users.First().Id;
            var service = new OrderService(context);
            var dto = new LaundryAPI.DTOs.CreateOrderDto
            {
                Date = DateTime.Now,
                Articles = new List<LaundryAPI.DTOs.ArticleDto> { new LaundryAPI.DTOs.ArticleDto { Name = "T-shirt", Quantity = 2 } },
                Reason = "Test",
                Comment = "Test comment"
            };
            service.CreateOrder(userId, dto);
            var orders = service.GetAllOrdersForAdmin().ToList();
            Assert.NotEmpty(orders);
            Assert.Contains(orders, o => o.Reason == "Test");
        }

        [Fact]
        public void GetOrderByIdForAdmin_ShouldReturnOrder()
        {
            var context = GetDbContext();
            var userId = context.Users.First().Id;
            var service = new OrderService(context);
            var dto = new LaundryAPI.DTOs.CreateOrderDto
            {
                Date = DateTime.Now,
                Articles = new List<LaundryAPI.DTOs.ArticleDto> { new LaundryAPI.DTOs.ArticleDto { Name = "T-shirt", Quantity = 2 } },
                Reason = "Test",
                Comment = "Test comment"
            };
            var orderId = service.CreateOrder(userId, dto);
            var order = service.GetOrderByIdForAdmin(orderId);
            Assert.NotNull(order);
            Assert.Equal(orderId, order.Id);
        }

        [Fact]
        public void GetOrderByIdForAdmin_ShouldReturnNullForNonExistentOrder()
        {
            var context = GetDbContext();
            var service = new OrderService(context);
            var order = service.GetOrderByIdForAdmin(9999);
            Assert.Null(order);
        }

        [Fact]
        public void RejectOrder_WithAdminComment_ShouldSetAdminComment()
        {
            var context = GetDbContext();
            var userId = context.Users.First().Id;
            var service = new OrderService(context);
            var dto = new LaundryAPI.DTOs.CreateOrderDto
            {
                Date = DateTime.Now,
                Articles = new List<LaundryAPI.DTOs.ArticleDto> { new LaundryAPI.DTOs.ArticleDto { Name = "T-shirt", Quantity = 2 } },
                Reason = "Test",
                Comment = "Test comment"
            };
            var orderId = service.CreateOrder(userId, dto);
            var result = service.RejectOrder(orderId, "Not allowed");
            Assert.True(result);
            var order = context.Orders.Find(orderId);
            Assert.Equal(OrderStatus.Rejected, order.Status);
            Assert.Equal("Not allowed", order.AdminComment);
        }

        [Fact]
        public void ValidateOrder_ShouldReturnFalseForNonExistentOrder()
        {
            var context = GetDbContext();
            var service = new OrderService(context);
            var result = service.ValidateOrder(9999);
            Assert.False(result);
        }

        [Fact]
        public void RejectOrder_ShouldReturnFalseForNonExistentOrder()
        {
            var context = GetDbContext();
            var service = new OrderService(context);
            var result = service.RejectOrder(9999, "No order");
            Assert.False(result);
        }

        [Fact]
        public void RemoveOrder_ShouldReturnFalseForNonExistentOrder()
        {
            var context = GetDbContext();
            var service = new OrderService(context);
            var result = service.RemoveOrder(9999, 1);
            Assert.False(result);
        }

        [Fact]
        public void ValidateOrder_ShouldThrowIfNotPending()
        {
            var context = GetDbContext();
            var userId = context.Users.First().Id;
            var service = new OrderService(context);
            var dto = new LaundryAPI.DTOs.CreateOrderDto
            {
                Date = DateTime.Now,
                Articles = new List<LaundryAPI.DTOs.ArticleDto> { new LaundryAPI.DTOs.ArticleDto { Name = "T-shirt", Quantity = 2 } },
                Reason = "Test",
                Comment = "Test comment"
            };
            var orderId = service.CreateOrder(userId, dto);
            service.ValidateOrder(orderId); // set to Approved
            Assert.Throws<InvalidOperationException>(() => service.ValidateOrder(orderId));
        }

        [Fact]
        public void RejectOrder_ShouldThrowIfNotPending()
        {
            var context = GetDbContext();
            var userId = context.Users.First().Id;
            var service = new OrderService(context);
            var dto = new LaundryAPI.DTOs.CreateOrderDto
            {
                Date = DateTime.Now,
                Articles = new List<LaundryAPI.DTOs.ArticleDto> { new LaundryAPI.DTOs.ArticleDto { Name = "T-shirt", Quantity = 2 } },
                Reason = "Test",
                Comment = "Test comment"
            };
            var orderId = service.CreateOrder(userId, dto);
            service.ValidateOrder(orderId); // set to Approved
            Assert.Throws<InvalidOperationException>(() => service.RejectOrder(orderId, "Already approved"));
        }

        [Fact]
        public void RemoveOrder_ShouldReturnFalseIfAlreadyRemoved()
        {
            var context = GetDbContext();
            var userId = context.Users.First().Id;
            var service = new OrderService(context);
            var dto = new LaundryAPI.DTOs.CreateOrderDto
            {
                Date = DateTime.Now,
                Articles = new List<LaundryAPI.DTOs.ArticleDto> { new LaundryAPI.DTOs.ArticleDto { Name = "T-shirt", Quantity = 2 } },
                Reason = "Test",
                Comment = "Test comment"
            };
            var orderId = service.CreateOrder(userId, dto);
            service.RemoveOrder(orderId, userId);
            var result = service.RemoveOrder(orderId, userId);
            Assert.False(result);
        }
    }
}
