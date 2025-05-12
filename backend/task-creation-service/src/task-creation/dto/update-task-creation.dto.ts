import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskCreationDto } from './create-task-creation.dto';

export class UpdateTaskCreationDto extends PartialType(CreateTaskCreationDto) {}
