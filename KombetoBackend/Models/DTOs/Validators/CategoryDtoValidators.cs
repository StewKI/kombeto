using FluentValidation;

namespace KombetoBackend.Models.DTOs.Validators;

public class CreateCategoryDtoValidator : AbstractValidator<CreateCategoryDto>
{
    public CreateCategoryDtoValidator()
    {
        RuleFor(x => x.Name)
            .MaximumLength(100);

        RuleFor(x => x.Color)
            .Length(7);
    }
}