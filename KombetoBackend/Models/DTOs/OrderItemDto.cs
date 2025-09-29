using System.ComponentModel.DataAnnotations;

namespace KombetoBackend.Models.DTOs;

public class CreateOrderItemDto
{
    public int ProductId { get; set; }
    public int Quantity { get; set; }
    
    public decimal Price { get; set; }
    
    [StringLength(128)]
    public string Note { get; set; } = string.Empty;
}