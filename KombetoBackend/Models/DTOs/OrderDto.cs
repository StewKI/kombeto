using System.ComponentModel.DataAnnotations;

namespace KombetoBackend.Models.DTOs;

public class CreateOrderDto
{
    public int CustomerId { get; set; }
    
    [StringLength(500)]
    public string? Note { get; set; } = null;
    
    public List<CreateOrderItemDto> Items { get; set; } = new();
}