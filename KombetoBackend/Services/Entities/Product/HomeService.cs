using KombetoBackend.Models.Data;
using KombetoBackend.Models.DTOs;
using KombetoBackend.Models.Maps;
using Microsoft.EntityFrameworkCore;

namespace KombetoBackend.Services.Entities.Product;

public class HomeService
{
    private readonly AppDbContext db;
    private readonly IConfiguration config;

    public HomeService(AppDbContext db, IConfiguration config)
    {
        this.db = db;
        this.config = config;
    }
    
    public async Task<List<ProductSectionDto>> GetProductSections()
    {
        List<ProductSectionDto> sections =
        [
            ..await GetDiscountSections(),
            await GetVariousSection()
        ];
        
        return sections;
    }

    private async Task<List<ProductSectionDto>> GetDiscountSections()
    {
        var discountSections = new List<ProductSectionDto>();
        
        // ReSharper disable once EntityFramework.NPlusOne.IncompleteDataQuery
        var discounts = await db.Discounts
            .Where(d => d.IsOnHomePage)
            .ToListAsync();
        
        foreach (var discount in discounts)
        {
            var discountProducts = await db.Products
                .Where(p => p.Discounts.Any(d => d.Id == discount.Id))
                .Include(p => p.Discounts)
                .OrderBy(p => EF.Functions.Random())
                .Take(20)
                .Select(p => p.MapDtoWithDiscounts())
                .ToListAsync();
            
            discountSections.Add(new ProductSectionDto()
            {
                DisplayType = "horizontal",
                Name = discount.Name,
                Products = discountProducts
            });
        }
        
        return discountSections;
    }
    
    private async Task<ProductSectionDto> GetVariousSection()
    {
        var variousProducts = await db.Products
            .OrderBy(p => EF.Functions.Random())
            .Take(20)
            .Include(p => p.Discounts)
            .ToListAsync();

        var variousProductsDto = variousProducts.Select(p => p.MapDtoWithDiscounts());

        return new ProductSectionDto()
        {
            DisplayType = "horizontal",
            Name = "Razno",
            Products = variousProductsDto.ToList(),
        };
    }
}