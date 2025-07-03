namespace Infrastructure.Photos
{
	public class CloudinarySettings
	{
		public const string Cloudinary = "CloudinarySettings";
		public required string CloudName { get; set; }
		public required string ApiKey { get; set; }
		public required string CloudNameApiSecret { get; set; }
	}
}
