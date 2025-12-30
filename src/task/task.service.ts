import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TaskService {
  tasks = [
    {
      id: 1,
      title: 'Learn nest',
      isCompleted: false
    },
     {
      id: 2,
      title: 'Learn REST',
      isCompleted: true
    },
  ];

  findById(id: number) {
    const task = this.tasks.find(task => task.id == id);

    if (!task) {
      throw new NotFoundException(`Task with id: ${id} not found`);
    }

    return task;
  }

  findAll() {
    return this.tasks;
  }

  createTask(dto: CreateTaskDto) {
    const { title } = dto;
    
    const newTask = {
        id: this.tasks.length + 1,
        title: title,
        isCompleted: false
    };

    this.tasks.push(newTask);
    return newTask;
  }
}
