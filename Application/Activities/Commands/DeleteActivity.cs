﻿using AutoMapper;
using MediatR;
using Persistence;

namespace Application.Activities.Commands
{
	public class DeleteActivity
	{
		public class Command : IRequest
		{
			public required string Id { get; set; }
		}

		public class Handler(AppDbContext _context) : IRequestHandler<Command>
		{
			public async Task Handle(Command request, CancellationToken cancellationToken)
			{
				var activity = await _context.Activities.FindAsync(request.Id, cancellationToken) ?? throw new Exception("Activity not found");
				_context.Activities.Remove(activity);
				await _context.SaveChangesAsync(cancellationToken);
			}
		}
	}
}
