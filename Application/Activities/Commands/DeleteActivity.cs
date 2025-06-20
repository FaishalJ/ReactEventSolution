﻿using Application.Core;
using AutoMapper;
using MediatR;
using Persistence;

namespace Application.Activities.Commands
{
	public class DeleteActivity
	{
		public class Command : IRequest<Result<Unit>>
		{
			public required string Id { get; set; }
		}

		public class Handler(AppDbContext _context) : IRequestHandler<Command, Result<Unit>>
		{
			public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
			{
				var activity = await _context.Activities.FindAsync(request.Id, cancellationToken);
				if (activity == null) return Result<Unit>.Failure("Activity not found", 404);

				_context.Activities.Remove(activity);
				var deleted = await _context.SaveChangesAsync(cancellationToken) > 0;
				if (!deleted) return Result<Unit>.Failure("Failed to delete activity", 400);

				return Result<Unit>.Success(Unit.Value);
			}
		}
	}
}
