using Application.Activities.Queries;
using Application.Activities.Validators;
using Application.Core;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using ReactEvent.Middleware;

namespace ReactEvent.Extentions
{
	public static class MyConfigServiceCollectionExtensions
	{
		public static IServiceCollection AddServicesExtension(
			 this IServiceCollection services, IConfiguration config)
		{
			services.AddDbContext<AppDbContext>(options =>
			{
				options.UseSqlServer(config.GetConnectionString("DefaultConnection"));
			});

			services.AddCors(options =>
			{
				options.AddPolicy("myReact",
								  policy =>
								  {
									  policy.WithOrigins("http://localhost:3000").AllowAnyHeader().AllowAnyMethod();
								  });
			});

			services.AddMediatR(cfg =>
			{
				cfg.RegisterServicesFromAssemblyContaining<GetActivityList.Handler>();
				cfg.AddOpenBehavior(typeof(ValidationBehavior<,>));
			});

			services.AddAutoMapper(typeof(MappingProfiles).Assembly);
			services.AddValidatorsFromAssemblyContaining<CreateActivityValidator>();
			services.AddTransient<ExceptionMiddleware>();

			return services;
		}
	}
}
