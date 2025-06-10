
using Application.Core;
using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace ReactEvent.Middleware
{
	public class ExceptionMiddleware(ILogger<ExceptionMiddleware> _logger, IHostEnvironment env) : IMiddleware
	{
		public async Task InvokeAsync(HttpContext context, RequestDelegate next)
		{
			try
			{
				await next(context);
			}
			catch (ValidationException ex)
			{
				await HandleValidationExeption(context, ex);
			}
			catch (Exception ex)
			{
				await HandleExeption(context, ex);
			}
		}

		private async Task HandleExeption(HttpContext context, Exception ex)
		{
			_logger.LogError(ex, ex.Message);
			context.Response.ContentType = "application/json";
			context.Response.StatusCode = StatusCodes.Status500InternalServerError;

			var response = env.IsDevelopment() ? new AppException(StatusCodes.Status500InternalServerError, ex.Message, ex.StackTrace) :
				new AppException(StatusCodes.Status500InternalServerError, ex.Message, null);
			var options = new JsonSerializerOptions
			{
				PropertyNamingPolicy = JsonNamingPolicy.CamelCase
			};
			var json = JsonSerializer.Serialize(response, options);
			await context.Response.WriteAsync(json);
		}

		private static async Task HandleValidationExeption(HttpContext context, ValidationException ex)
		{
			var validationError = new Dictionary<string, string[]>();
			if (ex.Errors is not null)
			{
				foreach (var error in ex.Errors)
				{
					if (validationError.TryGetValue(error.PropertyName, out var existingErrors))
					{
						validationError[error.PropertyName] = [.. existingErrors, error.ErrorMessage];
					}
					else
					{
						validationError[error.PropertyName] = [error.ErrorMessage];
					}
				}
			}

			context.Response.StatusCode = StatusCodes.Status400BadRequest;
			var validationProblemDetails = new ValidationProblemDetails(validationError)
			{
				Status = StatusCodes.Status400BadRequest,
				Type = "Validation failure",
				Title = "Validation error",
				Detail = "One or more validation errors occured"
			};

			await context.Response.WriteAsJsonAsync(validationProblemDetails);
		}
	}
}
