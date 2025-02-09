

using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using MovieRadar.Data;
using MovieRadar.Domain.Repositories;

namespace MovieRadar.Presentation.ServiceConfiguration
{
    public static class ServiceConfiguration
    {
        public static IServiceProvider ConfigureServices()
        {
            var configuration = new ConfigurationBuilder()
                .SetBasePath(AppContext.BaseDirectory)
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .Build();

            return new ServiceCollection()
                .AddSingleton<IConfiguration>(configuration)
                .AddSingleton<DbConnectionFactory>()
                .AddSingleton<UserRepository>()
                .BuildServiceProvider();

        }
    }
}
