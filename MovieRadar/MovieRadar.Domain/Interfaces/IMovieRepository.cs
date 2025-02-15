
using MovieRadar.Data.Entities.Models;

namespace MovieRadar.Domain.Interfaces
{
    public interface IMovieRepository
    {

        public Task<Movie> GetSingleMovieInfo(int id);
        public Task<string> GetGenreNameById(int id);
        public Task<IEnumerable<Movie>> GetAllFilms();

    }
}
