using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MovieRadar.Domain.Interfaces;
using MovieRadar.Domain.Repositories;

namespace MovieRadar.API.Controllers
{
    [Route("api/users")]
    [ApiController]

    public class UsersController : ControllerBase
    {
        private readonly IUserRepository _userRepository;

        public UsersController(IUserRepository userRepository) => _userRepository = userRepository;


        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _userRepository.GetAllUsers();
            return Ok(users);
        }   
    }
}
