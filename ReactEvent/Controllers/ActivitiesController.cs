using Application.Activities.Queries;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace ReactEvent.Controllers
{
	public class ActivitiesController(IMediator _mediator) : BaseApiController
	{
		[HttpGet]
		public async Task<ActionResult<List<Activity>>> GetActivities()
		{
			return await _mediator.Send(new GetActivityList.Query());
		}

		[HttpGet("{id}")]
		public async Task<ActionResult<Activity>> GetActivity(string id)
		{
			return await _mediator.Send(new ActivityDetails.Query { Id = id });
		}
	}
}
