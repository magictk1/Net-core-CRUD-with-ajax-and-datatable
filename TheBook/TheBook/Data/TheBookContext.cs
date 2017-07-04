using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace TheBook.Models
{
    public class TheBookContext : DbContext
    {
        public TheBookContext (DbContextOptions<TheBookContext> options)
            : base(options)
        {
        }

        public DbSet<TheBook.Models.Book> Book { get; set; }
    }
}
