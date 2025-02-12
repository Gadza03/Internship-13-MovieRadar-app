
using MovieRadar.Data.Entities.Models;

namespace MovieRadar.Domain.Interfaces
{
    public interface IMovieRepository
    {
        Task<Movie> GetSingleMovieInfo(int id);
    }
}
