using KombetoBackend.Models.DTOs;
using KombetoBackend.Models.Entities;

namespace KombetoBackend.Models.Maps;

public static class Maps
{
    public static DiscountDto MapDto(this Discount d)
    {
        return new DiscountDto()
        {
            Id = d.Id,
            Name = d.Name,
            Discount = d.AmountPercents,
            EndDate = d.EndDate,
            Color = d.Color
        };
    }

    public static ProductWithDiscountsDto MapDtoWithDiscounts(this Product p)
    {
        var discounts = p.Discounts
            .Select(d => d.MapDto())
            .ToList();

        return new ProductWithDiscountsDto()
        {
            Id = p.Id,
            Name = p.Name,
            Price = p.Price,
            ImageUrl = p.ImageUrl,
            Variations = p.Variations,
            Discounts = discounts,
        };
    }

    public static CustomerDto MapDto(this Customer c)
    {
        return new CustomerDto()
        {
            Id = c.Id,
            Name = c.Name,
            Address = c.Address,
            Phone = c.Phone,
            Discount = c.Discount,
        };
    }

    public static CategoryDto MapDto(this Category c)
    {
        return new CategoryDto()
        {
            Id = c.Id,
            Name = c.Name,
            Color = c.Color
        };
    }

    public static Category MapFromDto(this PutCategoryDto c)
    {
        return new Category()
        {
            Id = c.Id,
            Name = c.Name,
            Color = c.Color
        };
    }

    public static ProductDto MapDto(this Product p)
    {
        return new ProductDto()
        {
            Id = p.Id,
            Name = p.Name,
            Price = p.Price,
            ImageUrl = p.ImageUrl,
            Variations = p.Variations
        };
    }

    public static Product MapFromDto(this CreateProductDto dto)
    {
        return new Product
        {
            Name = dto.Name,
            Price = dto.Price,
            ImageUrl = dto.ImageUrl,
            Variations = dto.Variations
        };
    }

    public static Order MapFromDto(this CreateOrderDto dto)
    {
        return new Order
        {
            CustomerId = dto.CustomerId,
            Price = dto.Price,
            Note = dto.Note
        };
    }

    public static OrderItem MapFromDto(this CreateOrderItemDto dto, int orderId)
    {
        return new OrderItem
        {
            OrderId = orderId,
            ProductId = dto.ProductId,
            Quantity = dto.Quantity,
            Price = dto.Price,
            Note = dto.Note
        };
    }

    public static OrderDto MapDto(this Order o)
    {
        return new OrderDto
        {
            Id = o.Id,
            CustomerId = o.CustomerId,
            Note = o.Note,
            Price = o.Price,
            Items = o.Items.Select(o => o.MapDto()).ToList(),
            Status = o.Status,
            CreatedAt = o.CreatedAt
        };
    }

    public static OrderItemDto MapDto(this OrderItem o)
    {
        return new OrderItemDto
        {
            Id = o.Id,
            ProductId = o.ProductId,
            Quantity = o.Quantity,
            Price = o.Price,
            Note = o.Note
        };
    }
}