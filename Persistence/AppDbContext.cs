﻿using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
	public class AppDbContext : IdentityDbContext<User>
	{
		public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
		{
		}
		public DbSet<Activity> Activities { get; set; }
		public DbSet<ActivityAttendee> ActivityAttendees { get; set; }

		protected override void OnModelCreating(ModelBuilder builder)
		{
			base.OnModelCreating(builder);

			builder.Entity<ActivityAttendee>(x=>x.HasKey(a=>new {a.ActivityId, a.UserId}));

			builder.Entity<ActivityAttendee>()
				.HasOne(x => x.User)
				.WithMany(x => x.Activities)
				.HasForeignKey(x => x.UserId);

			builder.Entity<ActivityAttendee>()
				.HasOne(x => x.Activity)
				.WithMany(x => x.Attendees)
				.HasForeignKey(x => x.ActivityId);
		}
	}
}
