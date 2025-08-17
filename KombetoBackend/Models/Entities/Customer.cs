using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace KombetoBackend.Models.Entities;

[Index(nameof(SecurityCode), IsUnique = true)]
public class Customer
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    [Required]
    [MaxLength(100)]
    public string Name { get; set; } = string.Empty;

    [MaxLength(200)]
    public string Address { get; set; } = string.Empty;

    [Required]
    [MaxLength(64)] 
    public string Phone { get; set; } = string.Empty;

    [Precision(5, 2)]
    public decimal Discount { get; set; }

    [Required]
    [MaxLength(12)]
    [MinLength(12)]
    public string SecurityCode { get; set; } = string.Empty;
    
    [MaxLength(128)]
    public string? DeviceId { get; set; }
}