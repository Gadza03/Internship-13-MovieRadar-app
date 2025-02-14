using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using MovieRadar.Data.Entities.Models;
using MovieRadar.Domain.Interfaces;
using Npgsql;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using MovieRadar.API.Models;
using MovieRadar.API.DTOs.Auth;
using RegisterRequest = MovieRadar.API.Models.RegisterRequest;
using LoginRequest = MovieRadar.API.Models.LoginRequest;

namespace MovieRadar.API.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IUserRepository _userRepository;

        public AuthController(IConfiguration configuration, IUserRepository userRepository)
        {
            _configuration = configuration;
            _userRepository = userRepository;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await _userRepository.GetUserByEmail(request.Email);
            if (user == null || user.Password != request.Password)
            {
                return Unauthorized(new { message = "Invalid credentials" });
            }

            var token = GenerateJwtToken(user.Id, user.IsAdmin);

            SetTokenInsideCookie(token, HttpContext);

            return Ok(new { token });
        }

        private TokenDto GenerateJwtToken(int id, bool isAdmin)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim("id", id.ToString()),
                new Claim("isAdmin", isAdmin.ToString()),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(30),
                signingCredentials: credentials
            );

            var accessToken = new JwtSecurityTokenHandler().WriteToken(token);

            return new TokenDto { AccessToken = accessToken};
        }

        private void SetTokenInsideCookie(TokenDto tokenDto, HttpContext context)
        {
            context.Response.Cookies.Append("accessToken", tokenDto.AccessToken,
              new CookieOptions
              {
                  Expires = DateTime.UtcNow.AddMinutes(30),
                  HttpOnly = true,
                  IsEssential = true,
                  SameSite = SameSiteMode.None,
                  Secure = true 
              });
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var existingUser = await _userRepository.GetUserByEmail(request.Email);
            if (existingUser != null)
            {
                return BadRequest(new { message = "User with this email already exists." });
            }

            var newUser = new User
            {
                FirstName = request.FirstName,
                LastName = request.LastName,
                Email = request.Email.ToLower(),
                Password = request.Password,
                IsAdmin = false
            };

            await _userRepository.CreateUser(newUser);

            var createdUser = await _userRepository.GetUserByEmail(newUser.Email);
            if (createdUser == null)
            {
                return StatusCode(500, new { message = "User registration failed." });
            }

            var token = GenerateJwtToken(createdUser.Id, createdUser.IsAdmin);
            if (token is null)
            {
                return StatusCode(500, new { message = "Token problem" });
            }

            return Ok(new { token });
        }

        [HttpPost("logout")]
        public IActionResult Logout()
        {
            Response.Cookies.Delete("accessToken");
            return Ok(new { message = "Logged out successfully." });
        }
    }
}