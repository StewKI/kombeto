using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace KombetoBackend.Migrations
{
    /// <inheritdoc />
    public partial class Internal : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Internal",
                table: "Orders",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "Internal",
                table: "Customers",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Internal",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "Internal",
                table: "Customers");
        }
    }
}
