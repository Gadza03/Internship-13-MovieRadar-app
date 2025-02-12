using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MovieRadar.Data.Entities.Models;
using MovieRadar.Domain.Interfaces;

namespace MovieRadar.API.Controllers
{
    [Route("api/movies")]
    [ApiController]
    public class MovieController : ControllerBase
    {

        private readonly IMovieRepository _movieRepository;
        public MovieController(IMovieRepository movieRepository) => _movieRepository = movieRepository;

        [HttpGet("{id}")]
        [Authorize]
        public async Task<IActionResult> GetMovieInfo(int id)
        {
            var movie = await _movieRepository.GetSingleMovieInfo(id);

            if (movie == null) {
                return NotFound();
            }

            return Ok(movie);
        }
    }
}
