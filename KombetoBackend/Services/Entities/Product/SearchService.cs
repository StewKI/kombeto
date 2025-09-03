using KombetoBackend.Models.Data;
using Microsoft.EntityFrameworkCore;

namespace KombetoBackend.Services.Entities.Product;

public class SearchService
{
    private readonly AppDbContext db;
    private List<Models.Entities.Product>? _cachedProducts;
    private readonly int maxDistance;

    public SearchService(AppDbContext db, IConfiguration config)
    {
        this.db = db;
        this.maxDistance = config.GetValue<int>("BusinessLogic:Product:SearchMaxDistance");
    }
    
    

    private async Task<List<Models.Entities.Product>> GetFromDb()
    {
        if (_cachedProducts is null)
        {
            _cachedProducts = await db.Products
                .Include(p => p.Discounts)
                .ToListAsync();
        }
        return _cachedProducts;
    }

    public void ResetCache()
    {
        _cachedProducts = null;
        ProductSearchCache.Clear();
    }

    public async Task<List<ProductWithScore>> Search(string search)
    {
        if (!ProductSearchCache.TryGet(search, out var filteredWithScores))
        {
            var searchWords = search
                .Split(' ', StringSplitOptions.RemoveEmptyEntries)
                .Select(w => w.Trim())
                .ToArray();

            var allProducts = await GetFromDb();

            filteredWithScores = allProducts
                .Select(p => new ProductWithScore(p, ComputeScore(p, searchWords)))
                .Where(ps => ps.Score <= maxDistance) // max distance threshold per product (adjustable)
                .ToList();

            ProductSearchCache.Set(search, filteredWithScores);
        }

        return filteredWithScores;
    }
    
    private static int ComputeScore(Models.Entities.Product product, string[] searchWords)
    {
        var nameWords = product.Name.Split(' ', StringSplitOptions.RemoveEmptyEntries);
        int totalDistance = 0;

        foreach (var searchWord in searchWords)
        {
            // Find the minimal distance among words in product name
            var minDistance = nameWords.Min(nameWord => nameWord.LevenshteinDistance(searchWord));
            totalDistance += minDistance;
        }

        return totalDistance;
    }
    
}

public record ProductWithScore(Models.Entities.Product Product, int Score);

public static class ProductSearchCache
{
    // Key = search string, Value = filtered product list with a score
    private static readonly Dictionary<string, List<ProductWithScore>> Cache = new();

    public static bool TryGet(string key, out List<ProductWithScore> products) => Cache.TryGetValue(key, out products!);

    public static void Set(string key, List<ProductWithScore> products) => Cache[key] = products;
    
    public static void Clear() => Cache.Clear();
}