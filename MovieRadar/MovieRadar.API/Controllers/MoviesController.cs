using Microsoft.AspNetCore.Mvc;
using MovieRadar.Data.Entities.Models;
using MovieRadar.Domain.Interfaces;

namespace MovieRadar.API.Controllers
{
    [Route("api/movies")]
    [ApiController]
    public class MoviesController : ControllerBase
    {
        private readonly IMovieRepository _movieRepository;
        public MoviesController(IMovieRepository movieRepository) => _movieRepository = movieRepository;

        [HttpGet]
        public async Task<IActionResult> GetMovies()
        {
            var movies = await _movieRepository.GetAllFilms();
            return Ok(movies);  
        }

        [HttpPost("create")]
        public async Task<IActionResult> AddMovie([FromBody] Movie movie)
        {
            if (movie == null)
            {
                return BadRequest("Movie data is invalid.");
            }
            var newMovie =new Movie
            {   
                Title = movie.Title,
                Description = movie.Description,
                GenreId = movie.GenreId,
                ReleaseYear = movie.ReleaseYear,
                AverageRating = movie.AverageRating,
                ImageUrl = movie.ImageUrl,
                CreatedAt = DateTime.Now,
                UpdatedAt = DateTime.Now
            };

            await _movieRepository.CreateMovie(newMovie);
            return Ok();
        }

    }
}
