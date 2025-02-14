using System.ComponentModel.DataAnnotations;

namespace MovieRadar.API.Models
{
    public class RegisterRequest
    {
        [Required(ErrorMessage = "First name is required.")]
        [MinLength(2, ErrorMessage = "First name must be at least 2 characters long.")]
        public string FirstName { get; set; } = string.Empty;

        [Required(ErrorMessage = "Last name is required.")]
        [MinLength(2, ErrorMessage = "Last name must be at least 2 characters long.")]
        public string LastName { get; set; } = string.Empty;

        [Required(ErrorMessage = "Email is required.")]
        [EmailAddress(ErrorMessage = "Invalid email format.")]
        public string Email { get; set; } = string.Empty;

        [Required(ErrorMessage = "Password is required.")]
        [MinLength(5, ErrorMessage = "Password must be at least 5 characters long.")]
        [RegularExpression(@"^(?=.*[A-Za-z])(?=.*\d).{5,}$", ErrorMessage = "Password must contain at least one letter, one number, and be at least 5 characters long.")]
        public string Password { get; set; } = string.Empty;
    }
}


