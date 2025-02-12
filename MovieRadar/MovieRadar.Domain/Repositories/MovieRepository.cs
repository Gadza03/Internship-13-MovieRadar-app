using MovieRadar.Data;
using MovieRadar.Data.Entities.Models;
using MovieRadar.Domain.Interfaces;
using Dapper;

namespace MovieRadar.Domain.Repositories
{
    public class MovieRepository : IMovieRepository
    {

        private readonly DbConnectionFactory _dbConnection;

        public MovieRepository(DbConnectionFactory dbConnection) => _dbConnection = dbConnection;
        public async Task<Movie> GetSingleMovieInfo(int id)
        {
            var query = "SELECT * FROM Movies WHERE Id = @id;" +
                "SELECT AVG(rating) FROM Ratings WHERE MovieId = @id;" +
                "SELECT * FROM Reviews WHERE MovieId = @id";

            using (var connection = _dbConnection.CreateConnection())
            using (var multi = await connection.QueryMultipleAsync(query, new { id }))
            {
                var movie = await multi.ReadSingleOrDefaultAsync<Movie>();
                if (movie is not null)
                {
                    var avgRating = await multi.ReadSingleOrDefaultAsync<float>();
                    movie.AverageRating = avgRating;

                    var reviews = (await multi.ReadAsync<Review>()).ToList();
                    movie.Reviews = reviews;
                }

                return movie;
            }
        }
    }
}
