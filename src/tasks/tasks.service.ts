import { Injectable } from "@nestjs/common";
import { Task, TaskStatus } from "./task.module";
import * as uuid from "uuid/v1";
import { CreateTaskDTO } from "./dto/create-task.dto";

@Injectable()
export class TasksService {
  private tasks: Task[] = []; // here Task is the task model

  getAllTasks(): Task[] {
    return this.tasks;
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
