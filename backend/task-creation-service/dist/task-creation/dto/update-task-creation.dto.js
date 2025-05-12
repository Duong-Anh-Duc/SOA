"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTaskCreationDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_task_creation_dto_1 = require("./create-task-creation.dto");
class UpdateTaskCreationDto extends (0, mapped_types_1.PartialType)(create_task_creation_dto_1.CreateTaskCreationDto) {
}
exports.UpdateTaskCreationDto = UpdateTaskCreationDto;
//# sourceMappingURL=update-task-creation.dto.js.map