using Application.Activities.DTO;
using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Activities.Commands
{
	public class CreateActivity
	{
		public class Command : IRequest<Result<string>>
		{
			public required CreateActivityDto ActivityDto { get; set; }
		}

		public class Handler(AppDbContext _context, IMapper _mapper) : IRequestHandler<Command, Result<string>>
		{
			public async Task<Result<string>> Handle(Command request, CancellationToken cancellationToken)
			{
				var activity = _mapper.Map<Activity>(request.ActivityDto);

				_context.Activities.Add(activity);
				var created = await _context.SaveChangesAsync(cancellationToken) > 0;
				if (!created) return Result<string>.Failure("Failed to create activity", 400);

				return Result<string>.Success(activity.Id);
			}
		}
	}
}
