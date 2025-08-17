using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace KombetoBackend.Models.Entities;

public class Order
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    public int CustomerId { get; set; }

    [ForeignKey(nameof(CustomerId))]
    public Customer Customer { get; set; } = null!;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    
    public OrderStatus Status { get; set; } = OrderStatus.Received;

    public List<OrderItem> Items { get; set; } = new();
}

public enum OrderStatus
{
    Received,
    ReadyForDelivery,
    Delivered
}