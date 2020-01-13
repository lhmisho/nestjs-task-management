import { Controller, Get, Post, Body } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.module';
import { CreateTaskDTO } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
    constructor(private taskService: TasksService){

    }

    @Get()
    getAllTasks(): Task[]{
        return this.taskService.getAllTasks();
    }

    // first way to parse requests
    @Post()
    createTaskOne(@Body() body){
        console.log(body)
    }

    @Post()
    createTask(@Body() createTaskDTO: CreateTaskDTO){
        return this.taskService.createTask(createTaskDTO);
    }
}
