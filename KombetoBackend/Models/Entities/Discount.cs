using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.CompilerServices;
using Microsoft.EntityFrameworkCore;

namespace KombetoBackend.Models.Entities;

public class Discount
{
    [Key] // primary key
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)] // auto-increment
    public int Id { get; set; }
    
    [Required]
    [MaxLength(100)]
    public string Name { get; set; } = string.Empty;
    
    [Precision(5, 2)]
    public decimal AmountPercents { get; set; }
    
    public DateTime? EndDate { get; set; }

    [Required]
    [MaxLength(7)]
    [MinLength(7)]
    public string Color { get; set; } = null!;

    public bool IsOnHomePage { get; set; } = false;
    
    public ICollection<Product> Products { get; set; } = new List<Product>();
}