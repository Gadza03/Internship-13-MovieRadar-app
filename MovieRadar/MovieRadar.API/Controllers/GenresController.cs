using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MovieRadar.Domain.Interfaces;
using MovieRadar.Domain.Repositories;

namespace MovieRadar.API.Controllers
{
    [Route("api/genres")]
    [ApiController]
    public class GenresController : ControllerBase
    {
        private readonly IGenreRepository _genreRepository;

        public GenresController(IGenreRepository genreRepository) => _genreRepository=genreRepository;

        [HttpGet]

        public async Task<IActionResult> GetGenres()
        {
            var genres = await _genreRepository.GetAllGenres();
            return Ok(genres);
        }
    }
}
