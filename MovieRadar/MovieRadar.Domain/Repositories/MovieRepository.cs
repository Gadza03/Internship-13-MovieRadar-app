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

        public async Task CreateMovie(Movie movie)
        {
            var sql = "INSERT INTO movies (title, description, genreid, releaseyear, averagerating, imageurl, createdat, updatedat) VALUES (@Title, @Description, @GenreId, @ReleaseYear, @AverageRating, @ImageUrl, @CreatedAt, @UpdatedAt)";
            using (var connection = _dbConnection.CreateConnection())
            {
                await connection.ExecuteAsync(sql, movie);
            }
        }


    }
}
