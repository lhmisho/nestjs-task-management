import { Injectable } from "@nestjs/common";
import { Task, TaskStatus } from "./task.module";
import * as uuid from "uuid/v1";
import { CreateTaskDTO } from "./dto/create-task.dto";
import { GetTaskFilterDTO } from "./dto/get-task-filter.dto";

@Injectable()
export class TasksService {
  private tasks: Task[] = []; // here Task is the task model

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskWithFilter(filterDto: GetTaskFilterDTO): Task[]{
    const {status, search} = filterDto;
    let tasks = this.getAllTasks();

    if(status){
      tasks = tasks.filter(task => task.status === status)
    }
    if(search){
      tasks = tasks.filter(task => {
        task.title.includes(search) || task.description.includes(search)
      })
    }

    return tasks;
  }

  getTaskById(id: string): Task{
    return this.tasks.find(task => task._id === id);
  }

  createTask(createTaskDTO: CreateTaskDTO): Task {
    const { title, description } = createTaskDTO;
    const task: Task = {
      _id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN
    };
    this.tasks.push(task);
    return task;
  }

  deleteTask(id: string): void{
    this.tasks = this.tasks.filter(task => task._id !== id);
  }

  updateTask(id: string, status: TaskStatus): Task{
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }


}
