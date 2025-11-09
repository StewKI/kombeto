using FluentValidation;
using KombetoBackend.Models.Data;
using KombetoBackend.Models.DTOs;
using KombetoBackend.Models.Entities;
using KombetoBackend.Models.Maps;
using KombetoBackend.Services;
using KombetoBackend.Services.Entities.Product;
using KombetoBackend.Services.Money;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace KombetoBackend.Endpoints;

public static class DiscountEndpoints
{
    public static void MapDiscountEndpoints(this WebApplication app)
    {
        app.MapGet("/discounts", async (AppDbContext db) =>
        {
            var discounts = await db.Discounts.ToListAsync();

            var dtos = discounts.Select(d => d.MapDto());

            return Results.Ok(dtos);
            
        }).RequireAuthorization("CustomerOwner");
        
        app.MapGet("/discounts/{id}/products", async (
            int id,
            AppDbContext db,
            PublicPriceCalcService priceService) =>
        {
            var discount = await db.Discounts
                .Include(d => d.Products)
                    .ThenInclude(p => p.Categories)
                .Where(d => d.Id == id)
                .FirstOrDefaultAsync();
            
            if (discount is null) return Results.NotFound();
            
            var productDtos = discount.Products.Select(p =>
            {
                var dto = p.MapDto(priceService.Increase(p.Price));
                dto.Categories = p.Categories.Select(c => c.Id).ToList();
                return dto;
            }).ToList();
            
            return Results.Ok(productDtos);
            
        }).RequireAuthorization("CustomerOwner");
        
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

        app.MapPatch("/discounts/{id}", async (
            int id,
            UpdateDiscountDto dto,
            AppDbContext db) =>
        {

            var discount = await db.Discounts.FindAsync(id);
            if (discount is null) return Results.NotFound();
            
            if (dto.Name is not null) discount.Name = dto.Name;
            if (dto.Discount.HasValue) discount.AmountPercents = dto.Discount.Value;
            if (dto.EndDate.HasValue) discount.EndDate = dto.EndDate.Value;
            if (dto.Color is not null) discount.Color = dto.Color;
            
            await db.SaveChangesAsync();
            return Results.Ok(discount.Id);

        }).RequireAuthorization("Owner");

        app.MapPost("/discounts/{discountId}/products/{productId}", async (
            int discountId,
            int productId,
            AppDbContext db) =>
        {
            
            var discount = await db.Discounts.FindAsync(discountId);
            if (discount is null) return Results.NotFound();
            
            var product = await db.Products.FindAsync(productId);
            if (product is null) return Results.NotFound();
            
            discount.Products.Add(product);
            await db.SaveChangesAsync();
            return Results.Ok(discount.Id);

        }).RequireAuthorization("Owner");

        app.MapDelete("/discounts/{discountId}/products/{productId}", async (
            int discountId,
            int productId,
            AppDbContext db) =>
        {
            
            var discount = await db.Discounts
                .Include(d => d.Products)
                .Where(d => d.Id == discountId)
                .FirstOrDefaultAsync();
            if (discount is null) return Results.NotFound();
            
            var product = await db.Products.FindAsync(productId);
            if (product is null) return Results.NotFound();
            
            discount.Products.Remove(product);
            await db.SaveChangesAsync();
            return Results.Ok(discount.Id);

        }).RequireAuthorization("Owner");
    }
}