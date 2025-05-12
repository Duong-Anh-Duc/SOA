"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const typeorm_1 = require("@nestjs/typeorm");
const create_task_handler_1 = require("./task/commands/handlers/create-task.handler");
const task_entity_1 = require("./task/entities/task.entity");
const get_tasks_handler_1 = require("./task/queries/handlers/get-tasks.handler");
const task_service_1 = require("./task/task.service");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: 'localhost',
                port: 5434,
                username: 'postgres',
                password: '123456',
                database: 'SOA',
                entities: [task_entity_1.Task],
                synchronize: false,
            }),
            typeorm_1.TypeOrmModule.forFeature([task_entity_1.Task]),
            cqrs_1.CqrsModule,
        ],
        providers: [task_service_1.TaskService, get_tasks_handler_1.GetTasksHandler, create_task_handler_1.CreateTaskHandler],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map