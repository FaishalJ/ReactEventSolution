using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.EntityFrameworkCore;
using Persistence;
using ReactEvent.Extentions;
using ReactEvent.Middleware;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
//builder.Services.AddAuthorization();

builder.Services.AddControllers(opt =>
{
	var policy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();
	opt.Filters.Add(new AuthorizeFilter(policy));
});

builder.Services.AddServicesExtension(builder.Configuration);

var app = builder.Build();
app.UseMiddleware<ExceptionMiddleware>();

// Configure the HTTP request pipeline.

//app.UseHttpsRedirection();
app.UseCors("myReact");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.MapControllers();
app.MapGroup("api").MapIdentityApi<User>();
//app.MapIdentityApi<User>();

using (var scope = app.Services.CreateScope())
{
	var services = scope.ServiceProvider;
	try
	{
		var context = services.GetRequiredService<AppDbContext>();
		var userManager = services.GetRequiredService<UserManager<User>>();
		await context.Database.MigrateAsync();
		await DbInitializer.SeedData(context, userManager);
	}
	catch (Exception ex)
	{
		var logger = services.GetRequiredService<ILogger<Program>>();
		logger.LogError(ex, "An error occurred creating the DB.");
	}
}

app.Run();