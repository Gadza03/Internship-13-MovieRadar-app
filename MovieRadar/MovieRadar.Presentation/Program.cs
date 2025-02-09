
using Microsoft.Extensions.Configuration;
using MovieRadar.Data;
using Microsoft.Extensions.DependencyInjection;
using MovieRadar.Domain.Repositories;
using MovieRadar.Presentation.ServiceConfiguration;

class Program
{
    static void Main(string[] args)
    {

        var serviceProvider = ServiceConfiguration.ConfigureServices();

        var useRepo = serviceProvider.GetService<UserRepository>();
        try
        {
           var users = useRepo.GetAllUsers();
            foreach (var user in users) {
                Console.WriteLine($"User: {user.FirstName} Mail: {user.Email} isadmiin: {user.IsAdmin}");
            }

            
        }
        catch (Exception ex)
        {
            Console.WriteLine($" Something went wrong: {ex.Message}");
        }
    }
}
