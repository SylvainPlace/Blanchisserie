using LaundryAPI.Data;
using LaundryAPI.DTOs;
using LaundryAPI.Services;
using Microsoft.AspNetCore.Mvc;

namespace LaundryAPI.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly AuthService _authService;
        private readonly LaundryContext _context;

        public AuthController(AuthService authService, LaundryContext context)
        {
            _authService = authService;
            _context = context;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginDto dto)
        {
            var user = _authService.ValidateUser(dto.Email, dto.Password);
            if (user == null)
                return Unauthorized(new { message = "Invalid credentials" });
            var token = _authService.GenerateJwtToken(user);
            return Ok(new { token, user = new { user.Id, user.Email, user.FirstName, user.LastName, user.IsAdmin } });
        }
    }
}
