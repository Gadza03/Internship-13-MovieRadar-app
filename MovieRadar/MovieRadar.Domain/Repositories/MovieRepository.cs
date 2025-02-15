using MovieRadar.Data;
using MovieRadar.Data.Entities.Models;
using Dapper;
using MovieRadar.Domain.Interfaces;

namespace MovieRadar.Domain.Repositories
{
    public class MovieRepository : IMovieRepository
    {

        private readonly DbConnectionFactory _dbConnection;
        public MovieRepository(DbConnectionFactory dbConnection)
        {
            _dbConnection = dbConnection;
        }

        public async Task<IEnumerable<Movie>> GetAllFilms()
        {
            var sql = "SELECT * FROM MOVIES";
            using (var connection = _dbConnection.CreateConnection())
            {
                var movies = await connection.QueryAsync<Movie>(sql);
                return movies.ToList();

            }
        }

        public async Task<Movie> GetMovieById(int id)
        {
            var sql = "SELECT * FROM movies WHERE id = @Id";
            using (var connection = _dbConnection.CreateConnection())
            {
                var movie = await connection.QueryFirstOrDefaultAsync<Movie>(sql, new { Id = id });
                if(movie == null)
                {
                    throw new Exception("Movie not found");
                }
                return movie;
            }
        }

        public async Task CreateMovie(Movie movie)
        {
            var sql = "INSERT INTO movies (title, description, genreid, releaseyear, averagerating, imageurl, createdat, updatedat) VALUES (@Title, @Description, @GenreId, @ReleaseYear, @AverageRating, @ImageUrl, @CreatedAt, @UpdatedAt)";
            using (var connection = _dbConnection.CreateConnection())
            {
                await connection.ExecuteAsync(sql, movie);
            }
        }

        public async Task DeleteMovie(int id)
        {
            var sql = "DELETE FROM movies WHERE id = @Id";
            using (var connection = _dbConnection.CreateConnection())
            {
                await connection.ExecuteAsync(sql, new { Id = id });
            }
        }

        public async Task UpdateMovie(int id, Movie movie)
        {
            var sql = "UPDATE movies SET title = @Title, description = @Description, genreid = @GenreId, releaseyear = @ReleaseYear, averagerating = @AverageRating, imageurl = @ImageUrl, updatedat = @UpdatedAt WHERE id = @Id";
            using (var connection = _dbConnection.CreateConnection())
            {
                await connection.ExecuteAsync(sql, new { Id = id, movie.Title, movie.Description, movie.GenreId, movie.ReleaseYear, movie.AverageRating, movie.ImageUrl, movie.UpdatedAt });
            }
        }


    }
}
