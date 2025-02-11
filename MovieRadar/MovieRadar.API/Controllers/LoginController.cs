using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using MovieRadar.Domain.Interfaces;
using Npgsql;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;


namespace MovieRadar.API.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IUserRepository _userRepository;

        public LoginController(IConfiguration configuration, IUserRepository userRepository)
        {
            _configuration = configuration;
            _userRepository = userRepository;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            try
            {
                var user = await _userRepository.GetUserByEmail(request.Email);
                if (user == null || user.Password != request.Password)
                {
                    return Unauthorized(new { message = "Invalid credentials" });
                }

                var token = GenerateJwtToken(user.Email, user.IsAdmin);
                return Ok(new { token });

            }
            catch (NpgsqlException npgsqlEx)
            {
                Console.WriteLine($"Database error: {npgsqlEx.Message}");
                return StatusCode(500, new { message = "Database error. Please try again later." });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Login error: {ex.Message}");
                return StatusCode(500, new { message = "Internal Server Error" });
            }
        }

        private string GenerateJwtToken(string email, bool isAdmin)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Email, email),
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

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}



