using KombetoBackend.Endpoints.Products;

namespace KombetoBackend.Endpoints;

public static class AllEndpoints
{
    public static void MapAllEndpoints(this WebApplication app)
    {
        app.MapAllProductEndpoints();
        app.MapCustomerEndpoints();
        app.MapOrderEndpoints();
        app.MapLoginEndpoints();
        app.MapOwnerEndpoints();
        app.MapDiscountEndpoints();
    }
}