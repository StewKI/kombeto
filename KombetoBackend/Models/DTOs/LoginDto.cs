using System.ComponentModel.DataAnnotations;

namespace KombetoBackend.Models.DTOs;

public record LoginDto
{
    [StringLength(12, MinimumLength = 12)]
    public string SecurityCode { get; set; } = null!;
    public string DeviceId { get; set; } = null!;
}

public record JwtDto
{
    public string Token { get; set; } = null!;
}