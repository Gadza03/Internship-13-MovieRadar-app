using MovieRadar.Data.Entities.Models;

namespace MovieRadar.Domain.Interfaces
{
    public interface IMovieRepository
    {
        public Task<IEnumerable<Movie>> GetAllFilms();
    }
}
