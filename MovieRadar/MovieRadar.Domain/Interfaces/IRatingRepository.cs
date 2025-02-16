

using MovieRadar.Data.Entities.Models;

namespace MovieRadar.Domain.Interfaces
{
    public interface IRatingRepository
    {
        public Task Add(Rating rating);

        public Task<Rating> RatingByUserAndMovie(int userId, int movieId);

        public Task<Rating> GetById(int id);

        public Task Delete(int userId, int movieId);
    }
}
