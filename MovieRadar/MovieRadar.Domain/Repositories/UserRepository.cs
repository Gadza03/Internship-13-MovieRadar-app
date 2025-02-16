
using MovieRadar.Data;
using MovieRadar.Data.Entities.Models;
using Dapper;
using MovieRadar.Domain.Interfaces;
namespace MovieRadar.Domain.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly DbConnectionFactory _dbConnection;
        public UserRepository(DbConnectionFactory dbConnection)
        {
            _dbConnection = dbConnection;
        }

        public async Task<User> GetUserById(int id)
        {
            var sql = "SELECT * FROM USERS WHERE Id = @id";
            using (var connection = _dbConnection.CreateConnection())
            {
                var user = await connection.QueryFirstOrDefaultAsync<User>(sql, new { id });
                return user;
            }

        }


        public async Task<IEnumerable<User>> GetAllUsers()
        {
            var sql = "SELECT * FROM USERS";
            using (var connection = _dbConnection.CreateConnection())
            {              
                var users = await connection.QueryAsync<User>(sql);
                return users.ToList();               
               
            }
        }

        public async Task<User> GetUserByEmail(string email)
        {
            var sql = "SELECT * FROM USERS WHERE EMAIL = @email";

            using (var connection = _dbConnection.CreateConnection())
            {              
                var user = await connection.QueryFirstOrDefaultAsync<User>(sql, new { email });

                return user; 
            }
        }

        public async Task CreateUser(User user)
        {
            var sql = "INSERT INTO users (firstname, lastname, email, password, isadmin) VALUES (@FirstName, @LastName, @Email, @Password, @IsAdmin)";
            using (var connection = _dbConnection.CreateConnection())
            {
                await connection.ExecuteAsync(sql, user);
            }
        }

    }
}
