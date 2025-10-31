using System.ComponentModel.DataAnnotations;
using KombetoBackend.Models.Entities;

namespace KombetoBackend.Models.DTOs;

public class OrderDto
{
    public int Id { get; set; }
    
    public int CustomerId { get; set; }
    
    public CustomerDto? Customer { get; set; }
    
    
    public decimal Price { get; set; }
    
    [StringLength(500)]
    public string? Note { get; set; } = null;
    
    public DateTime CreatedAt { get; set; }
    
    public OrderStatus Status { get; set; }
    
    public List<OrderItemDto> Items { get; set; } = new();
}

public class CreateOrderDto
{
    public int CustomerId { get; set; }
    
    public decimal Price { get; set; }
    
    [StringLength(500)]
    public string? Note { get; set; } = null;
    
    public List<CreateOrderItemDto> Items { get; set; } = new();
    
    public bool Internal { get; set; } = false;
}