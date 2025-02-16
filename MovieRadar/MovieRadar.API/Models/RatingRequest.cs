using System.ComponentModel.DataAnnotations;

namespace MovieRadar.API.Models
{
    public class RatingRequest
    {
        [Required(ErrorMessage = "Grade is required.")]
        public int RatingValue { get; set; }

        [Required(ErrorMessage = "UserId is required.")]
        public int UserId { get; set; }

        [Required(ErrorMessage = "MovieId is required.")]
        public int MovieId { get; set; }
    }
}
