using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace KombetoBackend.Models.Entities;

public class Product
{
    [Key] // primary key
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)] // auto-increment
    public int Id { get; set; }

    [Required]
    [MaxLength(100)]
    public string Name { get; set; } = string.Empty;

    [Precision(18, 2)]
    public decimal Price { get; set; }

    [MaxLength(500)]
    public string? ImageUrl { get; set; }
    
    public ICollection<Discount> Discounts { get; set; } = new List<Discount>();

    public ICollection<Category> Categories { get; set; } = new List<Category>();
}