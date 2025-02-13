using Dapper;
using MovieRadar.Data;
using MovieRadar.Data.Entities.Models;
using MovieRadar.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MovieRadar.Domain.Repositories
{
    public class GenreRepository:IGenreRepository
    {
        private readonly DbConnectionFactory _dbConnection;
        public GenreRepository(DbConnectionFactory dbConnection)
        {
            _dbConnection = dbConnection;
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
