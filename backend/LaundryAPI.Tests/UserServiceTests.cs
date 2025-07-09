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
    public class UserServiceTests
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
        public void GetUserById_ShouldReturnUser()
        {
            var context = GetDbContext();
            var service = new UserService(context);
            var user = context.Users.First();
            var result = service.GetUserById(user.Id);
            Assert.NotNull(result);
            Assert.Equal(user.Email, result.Email);
        }

        [Fact]
        public void GetUserById_ShouldReturnNull_WhenNotFound()
        {
            var context = GetDbContext();
            var service = new UserService(context);
            var result = service.GetUserById(9999);
            Assert.Null(result);
        }

        [Fact]
        public void GetAllUsers_ShouldReturnUsers()
        {
            var context = GetDbContext();
            var service = new UserService(context);
            var users = service.GetAllUsers().ToList();
            Assert.NotEmpty(users);
            Assert.Equal("user@laundry.com", users[0].Email);
        }
    }
}
