using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MovieRadar.API.Models;
using MovieRadar.Data.Entities.Models;
using MovieRadar.Domain.Interfaces;

namespace MovieRadar.API.Controllers
{
    [Route("api/ratings")]
    [ApiController]
    public class RatingsController : ControllerBase
    {

        private readonly IRatingRepository _ratingRepository;
        private readonly IUserRepository _userRepository;
        private readonly IMovieRepository _movieRepository;

        public RatingsController(IRatingRepository ratingRepository, IUserRepository userRepository, IMovieRepository movieRepository){
            _ratingRepository = ratingRepository;
            _userRepository = userRepository;
            _movieRepository = movieRepository;
        }

        [HttpPost]
        [Authorize]

        public async Task<IActionResult> AddRating([FromBody] RatingRequest rating)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userById = await _userRepository.GetUserById(rating.UserId);
            if (userById == null)
            {
                return NotFound("User with this id doesn't exisits.");
            }

            var movieById = await _movieRepository.GetSingleMovieInfo(rating.MovieId);
            if (movieById == null)
            {
                return NotFound("Movie with this id doesn't exisits.");
            }

            var existingRating = await _ratingRepository.RatingByUserAndMovie(rating.UserId, rating.MovieId);

            if (existingRating != null) {                
                return Conflict("You have already rated this movie.");
            }
            var newRating = new Rating
            {
                UserId = rating.UserId,
                MovieId = rating.MovieId,
                RatingValue = rating.RatingValue,
            };

            await _ratingRepository.Add(newRating);

            return Ok(new { message = "Rating added successfully!" });


        }
    }
}
