
using MovieRadar.Data;
using MovieRadar.Data.Entities.Models;
using Dapper;
namespace MovieRadar.Domain.Repositories
{
    public class UserRepository : BaseRepository
    {

        public UserRepository(DbConnectionFactory dbConnection) : base(dbConnection) { }

        public List<User> GetAllUsers()
        {
            var sql = "SELECT * FROM USERS";
            return _dbConnection.Query<User>(sql).ToList();
        }
    }
}
