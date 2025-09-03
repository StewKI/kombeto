using FluentValidation;
using KombetoBackend.Models.Data;
using KombetoBackend.Models.DTOs;
using KombetoBackend.Models.Entities;
using KombetoBackend.Services;
using KombetoBackend.Services.Entities.Product;
using Microsoft.AspNetCore.Mvc;

namespace KombetoBackend.Endpoints;

public static class DiscountEndpoints
{
    public static void MapDiscountEndpoints(this WebApplication app)
    {
        app.MapPost("/discounts", async (
            CreateDiscountDto dto, 
            AppDbContext db,
            IValidator<CreateDiscountDto> validator,
            SearchService searchService) =>
        {
            var validationResult = await validator.ValidateAsync(dto);
            if (!validationResult.IsValid) return Results.BadRequest(validationResult.Errors);
            
            var products = dto.Products
                .Select((p) => db.Products.Find(p))
                .Where(p => p is not null)
                .Select(p => p!)
                .ToList();

            Console.WriteLine("Color: " + dto.Color + "");
            
            var discount = new Discount()
            {
                Name = dto.Name,
                AmountPercents = dto.Discount,
                EndDate = dto.EndDate,
                Color = dto.Color,
                Products = products,
            };
            db.Discounts.Add(discount);
            await db.SaveChangesAsync();
            
            searchService.ResetCache();
            
            return Results.Created($"/discounts/{discount.Id}", discount.Id);
        }).RequireAuthorization("CustomerOwner");
    }
}