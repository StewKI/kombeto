using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace KombetoBackend.Migrations
{
    /// <inheritdoc />
    public partial class ProductVariations : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Variations",
                table: "Products",
                type: "varchar(256)",
                maxLength: 256,
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Variations",
                table: "Products");
        }
    }
}
