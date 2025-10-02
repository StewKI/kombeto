using System.ComponentModel.DataAnnotations;

namespace KombetoBackend.Models.DTOs;


public class OrderItemDto
{
    public int Id { get; set; }
    
    public int ProductId { get; set; }
    public int Quantity { get; set; }
    
    public decimal Price { get; set; }
    
    [StringLength(128)]
    public string? Note { get; set; } = string.Empty;
}

public class CreateOrderItemDto
{
    public int ProductId { get; set; }
    public int Quantity { get; set; }
    
    public decimal Price { get; set; }
    
    [StringLength(128)]
    public string Note { get; set; } = string.Empty;
}