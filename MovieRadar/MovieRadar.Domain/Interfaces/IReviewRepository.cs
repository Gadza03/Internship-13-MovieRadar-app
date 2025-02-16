
using MovieRadar.Data.Entities.Models;

namespace MovieRadar.Domain.Interfaces
{
    public interface IReviewRepository
    {
        public Task Add(Review review);
        public Task<Review> ReviewByUserAndMovie(int userId, int movieId);

    }
}
