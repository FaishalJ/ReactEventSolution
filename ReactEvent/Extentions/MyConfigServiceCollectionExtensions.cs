using Application.Activities.Queries;
using Application.Core;
using Microsoft.EntityFrameworkCore;
using Persistence;

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
			});

			services.AddAutoMapper(typeof(MappingProfiles).Assembly);

			return services;
		}
	}
}
