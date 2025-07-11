﻿using Application.Activities.DTO;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities.Queries
{
	public class GetActivityList
	{
		public class Query : IRequest<List<ActivityDto>> { }

		public class Handler(AppDbContext _context, IMapper mapper) : IRequestHandler<Query, List<ActivityDto>>
		{
			public async Task<List<ActivityDto>> Handle(Query request, CancellationToken cancellationToken)
			{
				return await _context.Activities.ProjectTo<ActivityDto>(mapper.ConfigurationProvider)
					.ToListAsync(cancellationToken);
			}
		}
	}
}
