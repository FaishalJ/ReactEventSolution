﻿using Application.Activities.Queries;
using Application.Activities.Validators;
using Application.Core;
using Application.Interfaces;
using Domain;
using FluentValidation;
using Infrastructure.Photos;
using Infrastructure.Security;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistence;
using ReactEvent.Middleware;

namespace ReactEvent.Extensions
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

			services.Configure<CloudinarySettings>(config.GetSection(CloudinarySettings.Cloudinary));

			services.AddCors(options =>
			{
				options.AddPolicy("myReact",
								  policy =>
								  {
									  policy.WithOrigins("http://localhost:3000").AllowAnyHeader().AllowAnyMethod().AllowCredentials();
								  });
			});

			services.AddMediatR(cfg =>
			{
				cfg.RegisterServicesFromAssemblyContaining<GetActivityList.Handler>();
				cfg.AddOpenBehavior(typeof(ValidationBehavior<,>));
			});

			services.AddScoped<IUserAccessor, UserAccessor>();
			services.AddAutoMapper(typeof(MappingProfiles).Assembly);
			services.AddValidatorsFromAssemblyContaining<CreateActivityValidator>();
			services.AddTransient<ExceptionMiddleware>();

			services.AddIdentityApiEndpoints<User>(opt =>
			{
				opt.User.RequireUniqueEmail = true;
			}).AddRoles<IdentityRole>()
			.AddEntityFrameworkStores<AppDbContext>();

			services.AddAuthorizationBuilder()
				.AddPolicy("IsActivityHost", policy =>
				{
					policy.Requirements.Add(new IsHostRequirement());
				});

			services.AddTransient<IAuthorizationHandler, IsHostRequirementHandler>();

			return services;
		}
	}
}
