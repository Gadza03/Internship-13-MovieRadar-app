using MovieRadar.Data.Entities.Models;


namespace MovieRadar.Domain.Interfaces
{
    public interface IGenreRepository
    {
        public Task<IEnumerable<Genre>> GetAllGenres();

        public Task<string> GetGenreNameById(int id);
    }
}
