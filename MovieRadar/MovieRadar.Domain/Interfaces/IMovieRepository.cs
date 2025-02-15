using MovieRadar.Data.Entities.Models;

namespace MovieRadar.Domain.Interfaces
{
    public interface IMovieRepository
    {
        public Task<IEnumerable<Movie>> GetAllFilms();
        public Task<Movie> GetMovieById(int id);
        public Task CreateMovie(Movie movie);
        public Task DeleteMovie(int id);
        public Task UpdateMovie(int id,Movie movie);
    }
}
