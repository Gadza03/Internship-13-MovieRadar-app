using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MovieRadar.Data.Entities.Models
{
    public class Review
    {
        public int UserId {  get; set; }
        public int MovieId { get; set; }  
        public string? Content { get; set; }
        public DateTime CreatedAt { get; set; }
    }

}
