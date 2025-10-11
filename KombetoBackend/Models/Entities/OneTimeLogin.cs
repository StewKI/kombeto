using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace KombetoBackend.Models.Entities;

public class OneTimeLogin
{
    [Key] // primary key
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)] // auto-increment
    public int Id { get; set; }
    
    public DateTime ValidUntil { get; set; } = DateTime.Now.AddDays(5);

    public bool Used { get; set; } = false;

    public Customer Customer { get; set; } = null!;
    
    [MaxLength(11)]
    [MinLength(11)]
    public string LoginCode { get; set; } = null!;
}