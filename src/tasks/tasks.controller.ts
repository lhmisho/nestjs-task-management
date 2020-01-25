import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { Task, TaskStatus } from "./task.module";
import { CreateTaskDTO } from "./dto/create-task.dto";
import { GetTaskFilterDTO } from "./dto/get-task-filter.dto";

@Controller("tasks")
export class TasksController {
  constructor(private taskService: TasksService) {

  }

  @Get()
  getTasks(@Query() filterDto: GetTaskFilterDTO): Task[] {
    if(Object.keys(filterDto).length){
      return this.taskService.getTaskWithFilter(filterDto);
    }else{
      return this.taskService.getAllTasks();
    }
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Task{
    return this.taskService.getTaskById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDTO: CreateTaskDTO): Task {
    return this.taskService.createTask(createTaskDTO);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string): void{
    this.taskService.deleteTask(id);
  }

  @Patch('/:id/status')
  updateStatus(
    @Param('id') id: string,
    @Body('status') status: TaskStatus
  ): Task{
    console.log('id', id)
    console.log('status', status)
    return this.taskService.updateTask(id, status);
  }
  // approach way to parse requests
  // @Post()
  // createTaskOne(@Body() body) {
  //   console.log(body);
  // }

  // @Post()
  // createTaskTwo(
  //   @Body() title: string,
  //   @Body() description: string
  // ): Task {
  //   console.log(title, description);
  //   // return this.taskService.createTask(createTaskDTO);
  // }
}
