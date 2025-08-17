using Bogus;
using KombetoBackend.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace KombetoBackend.Models.Data;

public static class DummyData
{
    public static void AddDummyData(this WebApplication app)
    {
        using (var scope = app.Services.CreateScope())
        {
            var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
            db.Database.Migrate();

            if (!db.Products.Any())
            {
                var faker = new Faker<Product>()
                    .RuleFor(p => p.Name, f => f.Commerce.ProductName())
                    .RuleFor(p => p.Price, f => decimal.Parse(f.Commerce.Price()))
                    .RuleFor(p => p.ImageUrl, f => f.Image.PicsumUrl());

                var products = faker.Generate(100);
                db.Products.AddRange(products);
                db.SaveChanges();
            }
        }
    }
}