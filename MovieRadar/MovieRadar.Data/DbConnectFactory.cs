using System.Data;
using Microsoft.Extensions.Configuration;
using Npgsql;

namespace MovieRadar.Data
{
    public class DbConnectionFactory
    {
        private readonly string _connectionString;

        public DbConnectionFactory(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection") ?? throw new InvalidOperationException("Connection string is null or empty. Please check your configuration.");
            ;
            Console.WriteLine(_connectionString);
        }

        public IDbConnection CreateConnection() => new NpgsqlConnection(_connectionString);

    }

}
