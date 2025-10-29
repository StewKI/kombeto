namespace KombetoBackend.Models.DTOs;

public record ProductDto
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public decimal Price { get; set; }
    public decimal BasePrice { get; set; }
    public string? ImageUrl { get; set; }
    
    public string? Variations { get; set; }
}

public record CreateProductDto
{
    public string Name { get; set; } = null!;
    public decimal Price { get; set; }
    public string? ImageUrl { get; set; }
    
    public string? Variations { get; set; }
    
    public List<int>? Categories { get; set; }
}

public record UpdateProductDto
{
    public string? Name { get; set; }
    public decimal? Price { get; set; }
    public string? ImageUrl { get; set; }
    
    public string? Variations { get; set; }
}

public record ProductWithDiscountsDto : ProductDto
{
    public IList<DiscountDto> Discounts { get; set; } = [];
}

public record ProductSectionDto
{
    public string DisplayType { get; set; } = null!;
    public string Name { get; set; } = null!;
    public List<ProductWithDiscountsDto> Products { get; set; } = new();
}