using KombetoBackend.Models.Data;
using KombetoBackend.Models.DTOs;
using KombetoBackend.Models.Entities;
using KombetoBackend.Services;
using Microsoft.EntityFrameworkCore;
using Pomelo.EntityFrameworkCore.MySql.Extensions;

namespace KombetoBackend.Endpoints;

public static class ProductEndpoints
{
    public static void MapProductEndpoints(this WebApplication app)
    {
        app.MapGet("/products", async (AppDbContext db, IConfiguration config, string? search, int page = 1,
            int pageSize = 20, string? sortBy = "relevance") =>
        {
            search ??= "";

            // Searching
            var maxDistance = config.GetValue<int>("BusinessLogic:Product:SearchMaxDistance");
            var filteredWithScores = await SearchService.Search(db, search, maxDistance);

            // Sorting
            filteredWithScores = sortBy?.ToLower() switch
            {
                "price_asc" => filteredWithScores.OrderBy(ps => ps.Product.Price).ToList(),
                "price_desc" => filteredWithScores.OrderByDescending(ps => ps.Product.Price).ToList(),
                "relevance" => filteredWithScores.OrderBy(ps => ps.Score).ToList(),
                _ => filteredWithScores.OrderBy(ps => ps.Score).ToList()
            };

            // Pagination
            var paged = filteredWithScores
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .Select(ps => ps.Product)
                .ToList();
            
            // Discounts
            var final = paged.Select(p =>
            {
                var discounts = p.Discounts
                    .Select(d => new DiscountDto()
                    {
                        Id = d.Id,
                        Name = d.Name,
                        Discount = d.AmountPercents,
                        EndDate = d.EndDate,
                        Color = d.Color
                    })
                    .ToList();

                return new ProductWithDiscountsDto()
                {
                    Id = p.Id,
                    Name = p.Name,
                    Price = p.Price,
                    ImageUrl = p.ImageUrl,
                    Discounts = discounts,
                };
            });

            return Results.Ok(new
            {
                TotalItems = filteredWithScores.Count,
                Page = page,
                PageSize = pageSize,
                Items = final
            });
            
        }).RequireAuthorization("Customer");


        app.MapGet("/products/{id:int}", async (AppDbContext db, int id) =>
        {
            var product = await db.Products.FindAsync(id);
            return product is not null ? Results.Ok(product) : Results.NotFound();

        }).RequireAuthorization("CustomerOwner");
        
        app.MapPost("/products", async (AppDbContext db, CreateProductDto dto) =>
        {
            var product = new Product
            {
                Name = dto.Name,
                Price = dto.Price,
                ImageUrl = dto.ImageUrl
            };
            db.Products.Add(product);
            await db.SaveChangesAsync();
            
            SearchService.ResetCache();
            
            return Results.Created($"/products/{product.Id}", product);
            
        }).RequireAuthorization("Owner");
        
        app.MapPatch("/products/{id:int}", async (AppDbContext db, int id, UpdateProductDto dto) =>
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
        
            await db.SaveChangesAsync();
            
            if (shouldResetCache) SearchService.ResetCache();
            
            return Results.Ok(product);
            
        }).RequireAuthorization("Owner");
        
        app.MapDelete("/products/{id:int}", async (AppDbContext db, int id) =>
        {
            var product = await db.Products.FindAsync(id);
            if (product is null) return Results.NotFound();
        
            db.Products.Remove(product);
            await db.SaveChangesAsync();
            
            SearchService.ResetCache();
            
            return Results.NoContent();
            
        }).RequireAuthorization("Owner");
    }
}