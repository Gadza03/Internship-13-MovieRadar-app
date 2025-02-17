﻿
namespace MovieRadar.Data.Entities.Models
{
    public class UserStatsDto
    {
        public int Id { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public int ReviewCount { get; set; }
        public double AverageRating { get; set; }
    }
}
