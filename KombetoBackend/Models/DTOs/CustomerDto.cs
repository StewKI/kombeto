namespace KombetoBackend.Models.DTOs;

public record CustomerDto
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public string Address { get; set; } = null!;
    public string Phone { get; set; } = null!;
    public decimal Discount { get; set; }
}

public record CreateCustomerDto
{
    public string Name { get; set; } = null!;
    public string Address { get; set; } = null!;
    public string Phone { get; set; } = null!;
    public decimal Discount { get; set; }
}

public record UpdateCustomerDto
{
    public string? Address { get; set; }
    public string? Phone { get; set; }
    public decimal? Discount { get; set; }
}