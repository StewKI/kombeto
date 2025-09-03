using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace KombetoBackend.Migrations
{
    /// <inheritdoc />
    public partial class DiscountsHomePage : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsOnHomePage",
                table: "Discounts",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsOnHomePage",
                table: "Discounts");
        }
    }
}
