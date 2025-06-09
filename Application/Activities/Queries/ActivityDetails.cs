using Application.Core;
using Domain;
using MediatR;
using Persistence;
using System.Reflection.Metadata.Ecma335;

namespace Application.Activities.Queries
{
	public class ActivityDetails
	{
		public class Query : IRequest<Result<Activity>>
		{
			public required string Id { get; set; }
		}

		public class Handler(AppDbContext _context) : IRequestHandler<Query, Result<Activity>>
		{
			public async Task<Result<Activity>> Handle(Query request, CancellationToken cancellationToken)
			{
				var activity = await _context.Activities.FindAsync(request.Id, cancellationToken);
				if (activity == null) return Result<Activity>.Failure("Activity not found", 404);

				return Result<Activity>.Success(activity);
			}
		}
	}
}
