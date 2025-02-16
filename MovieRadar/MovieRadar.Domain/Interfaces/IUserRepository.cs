
using MovieRadar.Data.Entities.Models;

namespace MovieRadar.Domain.Interfaces
{
    public interface IUserRepository
    {
        public Task<IEnumerable<User>> GetAllUsers();
        public Task<User> GetUserByEmail(string email);

        public Task CreateUser(User user);

        public Task<IEnumerable<UserStatsDto>> GetAllUsersWithStats();

    }
}
