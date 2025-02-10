using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MovieRadar.Domain.Repositories;

namespace MovieRadar.API.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly UserRepository _userRepository;

        public UsersController(UserRepository userRepository) => _userRepository = userRepository;


        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _userRepository.GetAllUsers();
            return Ok(users);
        }   
    }
}
