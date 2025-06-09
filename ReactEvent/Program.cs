using Microsoft.EntityFrameworkCore;
using Persistence;
using ReactEvent.Extentions;
using ReactEvent.Middleware;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

builder.Services.AddServicesExtension(builder.Configuration);

var app = builder.Build();
app.UseMiddleware<ExceptionMiddleware>();

// Configure the HTTP request pipeline.

//app.UseHttpsRedirection();
app.UseCors("myReact");

app.UseAuthorization();
app.MapControllers();

using (var scope = app.Services.CreateScope())
{
	var services = scope.ServiceProvider;
	try
	{
		var context = services.GetRequiredService<AppDbContext>();
		await context.Database.MigrateAsync();
		await DbInitializer.SeedData(context);
	}
	catch (Exception ex)
	{
		var logger = services.GetRequiredService<ILogger<Program>>();
		logger.LogError(ex, "An error occurred creating the DB.");
	}
}

app.Run();