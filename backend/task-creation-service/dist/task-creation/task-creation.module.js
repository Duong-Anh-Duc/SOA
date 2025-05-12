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
const microservices_1 = require("@nestjs/microservices");
const typeorm_1 = require("@nestjs/typeorm");
const event_store_service_1 = require("../event-store/event-store.service");
const event_entity_1 = require("../event-store/event.entity");
const create_task_handler_1 = require("./commands/handlers/create-task.handler");
const task_creation_controller_1 = require("./task-creation.controller");
const task_creation_service_1 = require("./task-creation.service");
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
                entities: [event_entity_1.EventEntity],
                synchronize: true,
            }),
            typeorm_1.TypeOrmModule.forFeature([event_entity_1.EventEntity]),
            cqrs_1.CqrsModule,
            microservices_1.ClientsModule.register([
                {
                    name: 'NOTIFICATION_SERVICE',
                    transport: microservices_1.Transport.REDIS,
                    options: {
                        host: 'localhost',
                        port: 6379,
                        retryAttempts: 3,
                        retryDelay: 1000,
                    },
                },
                {
                    name: 'TASK_SERVICE',
                    transport: microservices_1.Transport.REDIS,
                    options: {
                        host: 'localhost',
                        port: 6379,
                        retryAttempts: 3,
                        retryDelay: 1000,
                    },
                },
            ]),
        ],
        controllers: [task_creation_controller_1.TaskCreationController],
        providers: [task_creation_service_1.TaskCreationService, event_store_service_1.EventStoreService, create_task_handler_1.CreateTaskHandler],
    })
], AppModule);
//# sourceMappingURL=task-creation.module.js.map