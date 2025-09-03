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
}