using KombetoBackend.Models.Data;
using KombetoBackend.Models.DTOs;
using KombetoBackend.Models.Entities;
using KombetoBackend.Models.Maps;
using KombetoBackend.Services;
using KombetoBackend.Services.Entities.Product;

namespace KombetoBackend.Endpoints.Products;

public static class OwnerProductEndpoints
{
    public static void MapOwnerProductEndpoints(this WebApplication app)
    {
        

        app.MapGet("/products/{id:int}", async (AppDbContext db, int id) =>
        {
            var product = await db.Products.FindAsync(id);
            return product is not null ? Results.Ok(product.MapDto()) : Results.NotFound();

        }).RequireAuthorization("CustomerOwner");
        
        app.MapPost("/products", async (AppDbContext db, CreateProductDto dto, SearchService searchService) =>
        {
            var product = dto.MapFromDto();
            db.Products.Add(product);
            await db.SaveChangesAsync();
            
            searchService.ResetCache();
            
            return Results.Created($"/products/{product.Id}", product);
            
        }).RequireAuthorization("Owner");
        
        app.MapPatch("/products/{id:int}", async (AppDbContext db, int id, UpdateProductDto dto, SearchService searchService) =>
        {
            var product = await db.Products.FindAsync(id);
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
        
            await db.SaveChangesAsync();
            
            if (shouldResetCache) searchService.ResetCache();
            
            return Results.Ok(product);
            
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