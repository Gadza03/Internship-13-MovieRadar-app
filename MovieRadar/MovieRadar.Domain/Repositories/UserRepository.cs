
using MovieRadar.Data;
using MovieRadar.Data.Entities.Models;
using Dapper;
using MovieRadar.Domain.Interfaces;
namespace MovieRadar.Domain.Repositories
{
    public class UserRepository : BaseRepository, IUserRepository
    {

        public UserRepository(DbConnectionFactory dbConnection) : base(dbConnection) { }

        public async Task<IEnumerable<User>> GetAllUsers()
        {
            var sql = "SELECT * FROM USERS";
            var users = await _dbConnection.QueryAsync<User>(sql);
            return users.ToList();
        }
    }
}
