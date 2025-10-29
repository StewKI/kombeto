using KombetoBackend.Models.Data;
using KombetoBackend.Models.DTOs;
using KombetoBackend.Models.Entities;
using KombetoBackend.Models.Maps;
using KombetoBackend.Services;
using KombetoBackend.Services.Entities.Product;
using KombetoBackend.Services.Money;
using Microsoft.EntityFrameworkCore;

namespace KombetoBackend.Endpoints.Products;

public static class OwnerProductEndpoints
{
    public static void MapOwnerProductEndpoints(this WebApplication app)
    {
        

        app.MapGet("/products/{id:int}", async (AppDbContext db, PublicPriceCalcService priceService, int id) =>
        {
            var product = await db.Products.FindAsync(id);
            return product is not null ? Results.Ok(product.MapDto(priceService.Increase(product.Price))) : Results.NotFound();

        }).RequireAuthorization("CustomerOwner");

        app.MapGet("/products/all", async (AppDbContext db, PublicPriceCalcService priceService) =>
        {
            var products = await db.Products.Include(p => p.Categories).ToListAsync();
            var dtos = products.Select(p =>
            {
                var dto = p.MapDto(priceService.Increase(p.Price));
                dto.Categories = p.Categories.Select(c => c.Id).ToList();
                return dto;
            });

            return Results.Ok(dtos);
            
        });
        
        app.MapPost("/products", async (AppDbContext db, CreateProductDto dto, SearchService searchService, PublicPriceCalcService priceService) =>
        {
            var product = dto.MapFromDto();

            
            db.Products.Add(product);
            await db.SaveChangesAsync();
            
            
            if (dto.Categories is not null)
            {
                foreach (var categoryId in dto.Categories)
                {
                    var category = await db.Categories.FindAsync(categoryId);
                    if (category is not null)
                    {
                        product.Categories.Add(category);
                    }
                }
            }

            await db.SaveChangesAsync();
            
            searchService.ResetCache();

            var dtoNew = product.MapDto(priceService.Increase(product.Price));
            dtoNew.Categories = product.Categories.Select(c => c.Id).ToList();
            
            return Results.Created($"/products/{product.Id}", dtoNew);
            
        }).RequireAuthorization("Owner");
        
        app.MapPatch("/products/{id:int}", async (AppDbContext db, int id, UpdateProductDto dto, SearchService searchService, PublicPriceCalcService priceService) =>
        {
            var product = await db.Products
                .Include(p => p.Categories)
                .Where(p=>p.Id == id)
                .FirstOrDefaultAsync();
            
            if (product is null) return Results.NotFound();
            
            bool shouldResetCache = false;
            if (dto.Name is not null)
            {
                product.Name = dto.Name;
                shouldResetCache = true;
            }
            if (dto.Price.HasValue) product.Price = dto.Price.Value;
            if (dto.ImageUrl is not null) product.ImageUrl = dto.ImageUrl;
            if (dto.Variations is not null)
            {
                if (dto.Variations.Length == 0) product.Variations = null;
                else product.Variations = dto.Variations;
            }
        
            
            if (dto.Categories is not null)
            {
                var categories = await db.Categories
                    .Where(c => dto.Categories.Contains(c.Id))
                    .ToListAsync();

                // replace the whole collection
                product.Categories = categories;
            }

            await db.SaveChangesAsync();
            
            if (shouldResetCache) searchService.ResetCache();
            
            var dtoNew = product.MapDto(priceService.Increase(product.Price));
            dtoNew.Categories = product.Categories.Select(c => c.Id).ToList();
            
            return Results.Ok(dtoNew);
            
        }).RequireAuthorization("Owner");
        
        app.MapDelete("/products/{id:int}", async (AppDbContext db, int id, SearchService searchService) =>
        {
            var product = await db.Products.FindAsync(id);
            if (product is null) return Results.NotFound();
        
            db.Products.Remove(product);
            await db.SaveChangesAsync();
            
            searchService.ResetCache();
            
            return Results.NoContent();
            
        }).RequireAuthorization("Owner");
    }
}