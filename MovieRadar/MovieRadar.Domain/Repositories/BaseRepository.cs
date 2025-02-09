using Dapper;
using MovieRadar.Data;
using MovieRadar.Data.Entities.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;

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
