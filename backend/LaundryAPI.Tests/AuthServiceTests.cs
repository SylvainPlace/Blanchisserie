using Xunit;
using LaundryAPI.Services;
using LaundryAPI.Data;
using LaundryAPI.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Extensions.Configuration;

namespace LaundryAPI.Tests
{
    public class AuthServiceTests
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

        private IConfiguration GetConfig()
        {
            var inMemorySettings = new Dictionary<string, string> {
                {"JwtKey", "your-super-secret-key-that-is-at-least-32-characters-long"}
            };
            return new ConfigurationBuilder().AddInMemoryCollection(inMemorySettings).Build();
        }

        [Fact]
        public void ValidateUser_ShouldReturnUser_WhenCredentialsAreValid()
        {
            var context = GetDbContext();
            var config = GetConfig();
            var service = new AuthService(context, config);
            var user = service.ValidateUser("user@laundry.com", "user123");
            Assert.NotNull(user);
            Assert.Equal("user@laundry.com", user.Email);
        }

        [Fact]
        public void ValidateUser_ShouldReturnNull_WhenCredentialsAreInvalid()
        {
            var context = GetDbContext();
            var config = GetConfig();
            var service = new AuthService(context, config);
            var user = service.ValidateUser("user@laundry.com", "wrongpass");
            Assert.Null(user);
        }

        [Fact]
        public void GenerateJwtToken_ShouldReturnToken()
        {
            var context = GetDbContext();
            var config = GetConfig();
            var service = new AuthService(context, config);
            var user = context.Users.First();
            var token = service.GenerateJwtToken(user);
            Assert.False(string.IsNullOrWhiteSpace(token));
        }
    }
}
