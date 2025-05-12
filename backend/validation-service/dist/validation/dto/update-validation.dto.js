"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateValidationDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_validation_dto_1 = require("./create-validation.dto");
class UpdateValidationDto extends (0, mapped_types_1.PartialType)(create_validation_dto_1.CreateValidationDto) {
}
exports.UpdateValidationDto = UpdateValidationDto;
//# sourceMappingURL=update-validation.dto.js.map