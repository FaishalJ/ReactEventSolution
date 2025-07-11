﻿using Application.Activities.Commands;
using Application.Activities.DTO;
using Application.Activities.Queries;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ReactEvent.Controllers
{
	public class ActivitiesController() : BaseApiController
	{
		[HttpGet]
		public async Task<ActionResult<List<ActivityDto>>> GetActivities()
		{
			return await Mediator.Send(new GetActivityList.Query());
		}

		[HttpGet("{id}")]
		public async Task<ActionResult<ActivityDto>> GetActivity(string id)
		{
			return HandleResult(await Mediator.Send(new ActivityDetails.Query { Id = id }));

		}
		[HttpPost]
		public async Task<ActionResult<String>> CreateActivity(CreateActivityDto activityDto)
		{
			return HandleResult(await Mediator.Send(new CreateActivity.Command { ActivityDto = activityDto }));
		}

		[HttpPut("{id}")]
		[Authorize(Policy = "IsActivityHost")]
		public async Task<ActionResult> EditActivity(string id, EditActivityDto activity)
		{
			activity.Id = id;
			return HandleResult(await Mediator.Send(new EditActivity.Command { ActivityDto = activity }));
		}

		[HttpDelete("{id}")]
		[Authorize(Policy = "IsActivityHost")]
		public async Task<ActionResult> DeleteActivity(string id)
		{
			return HandleResult(await Mediator.Send(new DeleteActivity.Command { Id = id }));
		}

		[HttpPost("{id}/attend")]
		public async Task<ActionResult> Attend(string id)
		{
			return HandleResult(await Mediator.Send(new UpdateAttendance.Command { Id = id }));
		}
	}
}
