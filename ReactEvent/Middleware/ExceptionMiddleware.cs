
using FluentValidation;
using Microsoft.AspNetCore.Mvc;

namespace ReactEvent.Middleware
{
	public class ExceptionMiddleware(ILogger<ExceptionMiddleware> _logger) : IMiddleware
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
				_logger.LogError(ex, "An unexpected error occurred");

				context.Response.StatusCode = StatusCodes.Status500InternalServerError;
				context.Response.ContentType = "application/json";
			}
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
