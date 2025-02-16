

using Dapper;
using MovieRadar.Data;
using MovieRadar.Data.Entities.Models;
using MovieRadar.Domain.Interfaces;

namespace MovieRadar.Domain.Repositories
{
    public class ReviewRepository : IReviewRepository
    {
        private readonly DbConnectionFactory _dbConnection;

        public ReviewRepository(DbConnectionFactory dbConnection)
        {
            _dbConnection = dbConnection;
        }

        public async Task<Review> ReviewByUserAndMovie(int userId, int movieId)
        {
            var query = "SELECT * FROM Reviews WHERE userId = @userId AND movieId = @movieId";
            using (var connection = _dbConnection.CreateConnection())
            {
                var review = await connection.QueryFirstOrDefaultAsync<Review>(query, new { userId, movieId });
                return review;
            }
        }

        public async Task Add(Review review)
        {
            var query = "INSERT INTO reviews (userId, movieId, content) VALUES (@UserId, @MovieId, @Content)";
            using (var connection = _dbConnection.CreateConnection())
            {
                 await connection.ExecuteAsync(query, review);
            }
        }
    }
}
