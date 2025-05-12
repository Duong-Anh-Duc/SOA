# API Gateway

This service routes requests to appropriate microservices.

## Setup

1. Install dependencies: `npm install`
2. Run in dev mode: `npm run start:dev`
3. Build for production: `npm run build`

## API Endpoints

- POST /api/task-creation/create-and-assign - Create and assign a task
- GET /api/tasks/:id - Get task by ID
- GET /api/teams/:id - Get team by ID
- GET /api/teams/:id/members - Get members of a team
- GET /api/users/:id - Get user by ID
- GET /api/users/by-ids/:ids - Get multiple users by IDs
- GET /api/validate/admin - Validate if a user is an admin
- POST /api/notifications/send - Send a notification
