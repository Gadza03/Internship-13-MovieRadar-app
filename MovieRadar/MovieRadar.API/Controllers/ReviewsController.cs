using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MovieRadar.API.Models;
using MovieRadar.Data.Entities.Models;
using MovieRadar.Domain.Interfaces;

namespace MovieRadar.API.Controllers
{
    [Route("api/reviews")]
    [ApiController]
    public class ReviewsController : ControllerBase
    {
        private readonly IReviewRepository _reviewRepository;
        private readonly IUserRepository _userRepository;
        private readonly IMovieRepository _movieRepository;

        public ReviewsController(IReviewRepository reviewRepository, IUserRepository userRepository, IMovieRepository movieRepository)
        {
            _reviewRepository = reviewRepository;
            _userRepository = userRepository;
            _movieRepository = movieRepository;
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> AddReview([FromBody] ReviewRequest review)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Console.WriteLine("OVde sam dosa");
            var userById = await _userRepository.GetUserById(review.UserId);
            if (userById == null)
            {
                return NotFound("User with this id doesn't exisits.");
            }
            Console.WriteLine(userById.Id);

            var movieById = await _movieRepository.GetSingleMovieInfo(review.MovieId);
            if (movieById == null)
            {
                return NotFound("Movie with this id doesn't exisits.");
            }

            var existingReview = await _reviewRepository.ReviewByUserAndMovie(review.MovieId, review.MovieId);

            if (existingReview != null)
            {
                return Conflict("You have already rated this movie.");
            }
            var newReview = new Review
            {
                UserId = review.UserId,
                MovieId = review.MovieId,
                Content = review.Content,
            };

            await _reviewRepository.Add(newReview);

            return Ok(new { message = "Review added successfully!" });
        }
    }
}
