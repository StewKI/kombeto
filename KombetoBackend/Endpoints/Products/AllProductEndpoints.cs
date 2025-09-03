namespace KombetoBackend.Endpoints.Products;

public static class AllProductEndpoints
{
    public static void MapAllProductEndpoints(this WebApplication app)
    {
        app.MapOwnerProductEndpoints();
        app.MapCustomerProductEndpoints();
    }
}