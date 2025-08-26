namespace KombetoBackend.Models.DTOs;

public record DiscountDto
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public decimal Discount { get; set; }
    public DateTime? EndDate { get; set; }
    public string Color { get; set; } = null!;
}

public record CreateDiscountDto
{
    public string Name { get; set; } = null!;
    public decimal Discount { get; set; }
    public DateTime? EndDate { get; set; }
    public string Color { get; set; } = null!;
    public List<int> Products { get; set; } = new();
}


public record UpdateDiscountDto
{
    public string? Name { get; set; } = null!;
    public decimal? Discount { get; set; }
    public DateTime? EndDate { get; set; }
    public string? Color { get; set; } = null!;
}