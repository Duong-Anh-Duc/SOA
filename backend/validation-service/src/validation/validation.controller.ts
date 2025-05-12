import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { ValidationService } from './validation.service';

@Controller('validate')
export class ValidationController {
  constructor(private readonly validationService: ValidationService) {}

  @Post('user')
  async validateUser(@Body('token') token: string) {
    return this.validationService.validateUser(token);
  }

  @Get('admin')
  async validateAdmin(
    @Query('userId') userId: string,
    @Query('teamId') teamId: string,
  ) {
    return this.validationService.validateAdmin(+userId, +teamId);
  }
}