import { TaskStatus } from "../task.module";
import { IsNotEmpty } from 'class-validator';

export class GetTaskFilterDTO{
    @IsNotEmpty()
    status: TaskStatus;
    
    @IsNotEmpty()
    search: string;
}