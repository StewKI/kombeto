using KombetoBackend.Models.Data;
using KombetoBackend.Models.DTOs;
using KombetoBackend.Models.Maps;
using KombetoBackend.Services;
using KombetoBackend.Services.Entities.Product;

namespace KombetoBackend.Endpoints.Products;

public static class CustomerProductEndpoints
{
    public static void MapCustomerProductEndpoints(this WebApplication app)
    {
        app.MapGet("/products/home", async (HomeService homeService) =>
        {
            List<ProductSectionDto> homePage;

            try
            {
                homePage = await homeService.GetProductSections();
            }
            catch (Exception e)
            {
                return Results.BadRequest(e.Message);
            }
            
            return Results.Ok(homePage);

        }).RequireAuthorization("Customer");
        
        
        app.MapGet("/products", async (SearchService searchService, string? search, int page = 1,
            int pageSize = 20, string? sortBy = "relevance") =>
        {
            search ??= "";

            // Searching
            var filteredWithScores = await searchService.Search(search);

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
            var final = paged.Select(p => p.MapDtoWithDiscounts());

            return Results.Ok(new
            {
                TotalItems = filteredWithScores.Count,
                Page = page,
                PageSize = pageSize,
                Items = final
            });
            
        }).RequireAuthorization("Customer");
        
    }
}