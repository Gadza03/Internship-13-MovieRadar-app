using MovieRadar.Data;
using MovieRadar.Data.Entities.Models;
using MovieRadar.Domain.Interfaces;
using Dapper;
using System.Security.Cryptography;

namespace MovieRadar.Domain.Repositories
{
    public class MovieRepository : IMovieRepository
    {

        private readonly DbConnectionFactory _dbConnection;

        public MovieRepository(DbConnectionFactory dbConnection) => _dbConnection = dbConnection;
        public async Task<Movie> GetSingleMovieInfo(int id)
        {
            var query = @"
                SELECT * FROM Movies WHERE Id = @id;
                SELECT AVG(Rating) FROM Ratings WHERE MovieId = @id;
                SELECT * FROM Reviews WHERE MovieId = @id;
                SELECT * FROM Comments WHERE MovieId = @id;
                ";

            using (var connection = _dbConnection.CreateConnection())
            using (var multi = await connection.QueryMultipleAsync(query, new { id }))
            {
                var movie = await multi.ReadSingleOrDefaultAsync<Movie>();
                if (movie is not null)
                {
                    var avgRating = await multi.ReadSingleOrDefaultAsync<float>();
                    movie.AverageRating = avgRating;

                    var genreName = await GetGenreNameById(movie.GenreId);
                    movie.GenreName = genreName;

                    var reviews = (await multi.ReadAsync<Review>()).ToList();
                    movie.Reviews = reviews;

                    var comments = (await multi.ReadAsync<Comment>()).ToList();
                    movie.Comments = comments;

                }

                return movie;
            }
        }

        public async Task<string> GetGenreNameById(int id)
        {
            var query = "SELECT name FROM GENRES WHERE Id = @id";
            using (var connection = _dbConnection.CreateConnection())
            {
                var genre = await connection.QueryFirstOrDefaultAsync<string>(query, new { id });
                return genre;
            }
        }
    }
}
