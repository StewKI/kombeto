using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace KombetoBackend.Models.Entities;

public class Category
{
    [Key]
    public int Id { get; set; }
    
    [Required]
    [MaxLength(100)]
    public string Name { get; set; } = string.Empty;
    
    [Required]
    [MaxLength(7)]
    [MinLength(7)]
    public string Color { get; set; } = string.Empty;

    public ICollection<Product> Products { get; set; } = new List<Product>();
}