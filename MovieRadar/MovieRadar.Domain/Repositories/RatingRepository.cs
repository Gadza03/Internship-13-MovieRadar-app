
using Dapper;
using MovieRadar.Data;
using MovieRadar.Data.Entities.Models;
using MovieRadar.Domain.Interfaces;
using System.Reflection.Metadata;

namespace MovieRadar.Domain.Repositories
{
    public class RatingRepository : IRatingRepository
    {

        private readonly DbConnectionFactory _dbConnection;

        public RatingRepository(DbConnectionFactory dbConnection)
        {
            _dbConnection = dbConnection;
        }

        public async Task<Rating> RatingByUserAndMovie(int userId, int movieId)
        {
            var query = "SELECT * FROM Ratings WHERE userId = @userId AND movieId = @movieId";
            using (var connection = _dbConnection.CreateConnection())
            {
                var rating = await connection.QueryFirstOrDefaultAsync<Rating>(query, new { userId, movieId });
                return rating;
            }
        }

        public async Task<Rating> GetById(int id)
        {
            var query = "SELECT * FROM Rating WHERE id = @id";
            using (var connection = _dbConnection.CreateConnection())
            {
                var review = await connection.QueryFirstOrDefaultAsync<Rating>(query, new { id });
                return review;
            }
        }

        public async Task Add(Rating rating)
        {
            var query = "INSERT INTO ratings (userId, movieId, ratingValue) VALUES (@UserId, @MovieId, @RatingValue)";
            using (var connection = _dbConnection.CreateConnection())
            {
                await connection.ExecuteAsync(query, rating);

            }
        }

        public async Task Delete(int userId, int movieId)
        {
            var query = "DELETE FROM Ratings WHERE userId = @userId AND movieId = @movieId";
            using (var connection = _dbConnection.CreateConnection())
            {
                await connection.ExecuteAsync(query, new {userId, movieId});

            }
        }
    }
}
