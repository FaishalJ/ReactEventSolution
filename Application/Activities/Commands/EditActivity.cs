﻿using Application.Activities.DTO;
using Application.Core;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities.Commands
{
	public class EditActivity
	{
		public class Command : IRequest<Result<Unit>>
		{
			public required EditActivityDto ActivityDto { get; set; }
		}

		public class Handler(AppDbContext _context, IMapper _mapper) : IRequestHandler<Command, Result<Unit>>
		{
			public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
			{
				var activity = await _context.Activities.FindAsync(request.ActivityDto.Id, cancellationToken);

				if (activity == null) return Result<Unit>.Failure("Activity not found", 404);

				_mapper.Map(request.ActivityDto, activity);

				var edited = await _context.SaveChangesAsync(cancellationToken) > 0;
				if(!edited) return Result<Unit>.Failure("Failed to Update activity", 400);

				return Result<Unit>.Success(Unit.Value);
			}
		}
	}
}
