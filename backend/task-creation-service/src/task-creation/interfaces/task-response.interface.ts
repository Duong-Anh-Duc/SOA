export interface TaskResponse {
    id: number;
    title: string;
    description: string;
    deadline: string;
    assigneeIds: number[];
    teamId: number;
    createdById: number;
    status: string;
    priority: string;
    startDate: string;
  }