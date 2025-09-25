using FluentValidation;

namespace KombetoBackend.Models.DTOs.Validators;

public class PutCategoryDtoValidator : AbstractValidator<PutCategoryDto>
{
    public PutCategoryDtoValidator()
    {
        RuleFor(x => x.Name)
            .MaximumLength(100);

        RuleFor(x => x.Color)
            .Length(7);
    }
}