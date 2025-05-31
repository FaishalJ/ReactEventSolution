using Domain;
using MediatR;
using Persistence;

namespace Application.Activities.Queries
{
	public class ActivityDetails
	{
		public class Query : IRequest<Activity>
		{
			public required string Id { get; set; }
		}

		public class Handler(AppDbContext _context) : IRequestHandler<Query, Activity>
		{
			public async Task<Activity> Handle(Query request, CancellationToken cancellationToken)
			{
				var activity = await _context.Activities.FindAsync(request.Id, cancellationToken);

				return activity == null ? throw new Exception("Activity not found") : activity;
			}
		}
	}
}
