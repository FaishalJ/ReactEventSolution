using System.ComponentModel.DataAnnotations;

namespace ReactEvent.DTOs
{
	public class RegisterDto
	{
		[Required]
		public string DisplayName { get; set; } = string.Empty;

		[Required]
		[EmailAddress]
		public string Email { get; set; } = string.Empty;
		public string Password { get; set; } = string.Empty;
	}
}
