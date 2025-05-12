import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { TaskService } from '../../task.service';

export class GetTasksQuery {
  constructor(
    public readonly teamId: number,
    public readonly userId?: number,
  ) {}
}

@QueryHandler(GetTasksQuery)
export class GetTasksHandler implements IQueryHandler<GetTasksQuery> {
  constructor(private readonly taskService: TaskService) {}

  async execute(query: GetTasksQuery) {
    const { teamId, userId } = query;
    if (userId) {
      return this.taskService.findByTeamAndUser(teamId, userId);
    }
    return this.taskService.findByTeam(teamId);
  }
}