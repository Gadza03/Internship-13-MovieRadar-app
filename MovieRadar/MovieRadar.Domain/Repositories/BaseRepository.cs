using MovieRadar.Data;
using System.Data;


namespace MovieRadar.Domain.Repositories
{
    public abstract class BaseRepository
    {
        protected readonly IDbConnection _dbConnection;

        public BaseRepository(DbConnectionFactory dbConnection)
        {
            _dbConnection = dbConnection.CreateConnection();
        }

      
    }
}
