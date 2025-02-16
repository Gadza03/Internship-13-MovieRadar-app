using Dapper;
using MovieRadar.Data;
using MovieRadar.Data.Entities.Models;
using MovieRadar.Domain.Interfaces;

namespace MovieRadar.Domain.Repositories
{
    public class GenreRepository:IGenreRepository
    {
        private readonly DbConnectionFactory _dbConnection;
        public GenreRepository(DbConnectionFactory dbConnection)
        {
            _dbConnection = dbConnection;
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
        public async Task<IEnumerable<Genre>> GetAllGenres()
        {
            var sql = "SELECT * FROM GENRES";
            using (var connection = _dbConnection.CreateConnection())
            {
                var genres = await connection.QueryAsync<Genre>(sql);
                return genres.ToList();
            }
        }
    }
}
