using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace KombetoBackend.Models.Entities;

public class Owner
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }
    
    [Required]
    [MaxLength(200)]
    public string Name { get; set; } = string.Empty;
    
    [Required]
    [MaxLength(64)] 
    public string Phone { get; set; } = string.Empty;
    
    [Required]
    [MaxLength(12)]
    [MinLength(12)]
    public string SecurityCode { get; set; } = string.Empty;
    
    [MaxLength(128)]
    public string? DeviceId { get; set; }
}