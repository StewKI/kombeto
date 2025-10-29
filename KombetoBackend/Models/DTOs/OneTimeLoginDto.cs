using System.ComponentModel.DataAnnotations;

namespace KombetoBackend.Models.DTOs;

public record OneTimeLoginDto
{
    [Required]
    [StringLength(11)]
    public string Code { get; set; }
    
    public int Id { get; set; }
}