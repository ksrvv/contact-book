using Microsoft.EntityFrameworkCore;
using System.ComponentModel;
using Test_Task.Models.DBEntities;

namespace Test_Task.DAL
{
    public class AppDbContext : DbContext
    {
        public DbSet<Contact> Contacts { get; set; } = null!;
        
       
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
            Database.EnsureCreated();   // создаем базу данных при первом обращении
        }
       
    }
}
