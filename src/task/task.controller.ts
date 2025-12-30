import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get('by-id/:id')
  findById(@Param('id') id: string) {
    return this.taskService.findById(Number(id));
  }

  @Get('all')
  findAll() {
    return this.taskService.findAll();
  }

  @Post()
  createTask(@Body() dto: CreateTaskDto) {
    return this.taskService.createTask(dto);
  }
}
