import { Controller, Get } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.module';

@Controller('tasks')
export class TasksController {
    constructor(private taskService: TasksService){

    }

    @Get()
    getAllTasks(): Task[]{
        return this.taskService.getAllTasks();
    }
}
