"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const microservices_1 = require("@nestjs/microservices");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.createMicroservice(app_module_1.AppModule, {
        transport: microservices_1.Transport.REDIS,
        options: {
            host: 'localhost',
            port: 6379,
            retryAttempts: 3,
            retryDelay: 1000,
        },
    });
    await app.listen();
    console.log('Task Service is listening on Redis');
}
bootstrap();
//# sourceMappingURL=main.js.map