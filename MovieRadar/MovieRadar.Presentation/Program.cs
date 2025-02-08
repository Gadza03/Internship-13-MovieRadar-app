using System;
using System.Data;
using Dapper;
using Npgsql;
using Microsoft.Extensions.Configuration;
using MovieRadar.Data;
using Microsoft.Extensions.DependencyInjection;

class Program
{
    static void Main(string[] args)
    {
        // Configure services (including loading configuration and setting up DI)
        var serviceProvider = new ServiceCollection()
            .AddSingleton<IConfiguration>(new ConfigurationBuilder()
                .SetBasePath(AppContext.BaseDirectory)
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .Build())
            .AddSingleton<DbConnectionFactory>()
            .BuildServiceProvider();

        // Resolve the DbConnectionFactory from the container
        var dbConnectionFactory = serviceProvider.GetService<DbConnectionFactory>();

        // Test the database connection
        try
        {
            using var connection = dbConnectionFactory.CreateConnection();
            connection.Open();
            Console.WriteLine("Database Connection Successful!");
        }
        catch (Exception ex)
        {
            Console.WriteLine($" Database Connection Failed: {ex.Message}");
        }
    }
}
