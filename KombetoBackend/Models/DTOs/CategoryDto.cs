using System.ComponentModel.DataAnnotations;

namespace KombetoBackend.Models.DTOs;

public record CategoryDto
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public string Color { get; set; } = null!;
}


public record CreateCategoryDto
{
    [Required]
    [StringLength(100)]
    public string Name { get; set; } = null!;
    
    [Required]
    [StringLength(7, MinimumLength = 7)]
    public string Color { get; set; } = null!;
}