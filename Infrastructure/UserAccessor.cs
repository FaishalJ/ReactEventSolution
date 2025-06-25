using Application.Interfaces;
using Domain;
using Microsoft.AspNetCore.Http;
using Persistence;
using System.Security.Claims;

namespace Infrastructure
{
	public class UserAccessor(IHttpContextAccessor httpContextAccessor, AppDbContext context) : IUserAccessor
	{
		public async Task<User> GetUserAsync()
		{
			return await context.Users.FindAsync(GetUserId())
				?? throw new UnauthorizedAccessException("No user found");
		}

		public string GetUserId()
		{
			return httpContextAccessor.HttpContext?.User.FindFirstValue(ClaimTypes.NameIdentifier)
				?? throw new Exception("No user found");
		}
	}
}
