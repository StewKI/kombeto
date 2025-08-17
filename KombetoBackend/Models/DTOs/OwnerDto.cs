namespace KombetoBackend.Models.DTOs;

public record OwnerDto
{
    public string Name { get; set; } = null!;
    public string Phone { get; set; } = null!;
}