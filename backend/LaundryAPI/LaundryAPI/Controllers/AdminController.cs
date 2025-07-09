using LaundryAPI.Services;
using LaundryAPI.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LaundryAPI.Controllers
{
    [ApiController]
    [Route("api/admin")]
    [Authorize(Roles = "Admin")]
    public class AdminController : ControllerBase
    {
        private readonly OrderService _orderService;
        public AdminController(OrderService orderService)
        {
            _orderService = orderService;
        }

        // GET /api/admin/orders
        [HttpGet("orders")]
        public IActionResult GetAllOrders()
        {
            var result = _orderService.GetAllOrdersForAdmin();
            return Ok(result);
        }

        // GET /api/admin/orders/{id}
        [HttpGet("orders/{id}")]
        public IActionResult GetOrderById(int id)
        {
            var result = _orderService.GetOrderByIdForAdmin(id);
            if (result == null) return NotFound();
            return Ok(result);
        }

        // PUT /api/admin/orders/{id}/validate
        [HttpPut("orders/{id}/validate")]
        public IActionResult ValidateOrder(int id)
        {
            var success = _orderService.ValidateOrder(id);
            if (!success) return NotFound();
            return Ok();
        }

        // PUT /api/admin/orders/{id}/reject
        [HttpPut("orders/{id}/reject")]
        public IActionResult RejectOrder(int id, [FromBody] RejectOrderDto? rejectDto)
        {
            var success = _orderService.RejectOrder(id, rejectDto?.AdminComment);
            if (!success) return NotFound();
            return Ok();
        }
    }
}
