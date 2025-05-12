"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const cors = require("cors");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use(cors({
        origin: 'http://localhost:5173',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
    }));
    await app.listen(3006);
    console.log('Gateway is running on port 3006');
}
bootstrap();
//# sourceMappingURL=main.js.map