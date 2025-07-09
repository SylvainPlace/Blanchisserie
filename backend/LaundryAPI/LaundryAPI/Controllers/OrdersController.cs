using LaundryAPI.DTOs;
using LaundryAPI.Services;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace LaundryAPI.Controllers
{
    [ApiController]
    [Route("api/orders")]
    //[Authorize]
    public class OrdersController : ControllerBase
    {
        private readonly OrderService _orderService;
        public OrdersController(OrderService orderService)
        {
            _orderService = orderService;
        }

        // POST /api/orders
        [HttpPost]
        public IActionResult CreateOrder([FromBody] CreateOrderDto dto)
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            int orderId;
            try
            {
                orderId = _orderService.CreateOrder(userId, dto);
            }
            catch (UnauthorizedAccessException)
            {
                return Unauthorized();
            }
            return Created($"/api/orders/{orderId}", new { id = orderId });
        }

        // GET /api/orders
        [HttpGet]
        public IActionResult GetOrders()
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            var result = _orderService.GetOrders(userId);
            return Ok(result);
        }

        // GET /api/orders/{id}
        [HttpGet("{id}")]
        public IActionResult GetOrderById(int id)
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            var result = _orderService.GetOrderById(userId, id);
            if (result == null) return NotFound();
            return Ok(result);
        }

        // DELETE /api/orders/{id}
        [HttpDelete("{id}")]
        public IActionResult DeleteOrder(int id)
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            var result = _orderService.RemoveOrder(id, userId);
            if (!result) return NotFound();
            return NoContent();
        }
    }
}
