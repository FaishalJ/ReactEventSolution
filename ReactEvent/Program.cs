using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using Persistence;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

builder.Services.AddDbContext<AppDbContext>(options =>
{
	options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});

builder.Services.AddCors(options =>
{
	options.AddPolicy("myReact",
					  policy =>
					  {
						  policy.WithOrigins("http://localhost:3000").AllowAnyHeader().AllowAnyMethod();
					  });
});

var app = builder.Build();

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