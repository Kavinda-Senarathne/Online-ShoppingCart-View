using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace OnlineShopping.Data.Models
{
    public partial class OnlineShoppingDbContext:DbContext
    {
        public OnlineShoppingDbContext()
        {
        }

        public OnlineShoppingDbContext(DbContextOptions<OnlineShoppingDbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Product> Product { get; set; }
        public virtual DbSet<User> User { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {

                optionsBuilder.UseSqlServer("Server=KAVINDAS\\MSSQLSERVER01; Database=ShoppingCartDB; Trusted_Connection=True; MultipleActiveResultSets=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Product>(entity =>
            {
                entity.Property(e => e.Code).HasMaxLength(10);

                entity.Property(e => e.UnitPrice).HasColumnType("money");
            });

            OnModelCreatingPartial(modelBuilder);
            modelBuilder.Entity<User>()
                .HasKey(u => u.Email);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
