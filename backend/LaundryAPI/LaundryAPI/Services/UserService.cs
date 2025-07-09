using LaundryAPI.Data;
using LaundryAPI.Models;

namespace LaundryAPI.Services
{
    public class UserService
    {
        private readonly LaundryContext _context;
        public UserService(LaundryContext context)
        {
            _context = context;
        }

        public User? GetUserById(int id)
        {
            return _context.Users.FirstOrDefault(u => u.Id == id);
        }

        public IEnumerable<User> GetAllUsers()
        {
            return _context.Users.ToList();
        }
    }
}
