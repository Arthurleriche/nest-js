import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { classToClassFromExist } from 'class-transformer';
import {Task } from './task.entity'
import {TaskStatus} from './task-status.enum'
import { CreateTaskDto } from './dto/create-task-dto';
import { TaskRepository } from './task.repository';
// import { Task, TaskStatus } from './task.model';
// import { v1 as uuid} from 'uuid';

@Injectable()
export class TasksService {
    
    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository
    ){}




    // private tasks: Task[] = []

    // getAllTasks(){
    //     return this.tasks
    // }
    
    async getTaskById(id: number): Promise<Task> {
        const found = await this.taskRepository.findOne(id);

        if(!found){
            throw new NotFoundException('task With id not found')
        }

        return found
    }

    // getOneTask(id: string): Task{
    //     const found = this.tasks.find(t => t.id === id)

    //     if(!found){
    //         throw new NotFoundException('task With id not found')
    //     }

    //     return found
    // }
    
    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
       return this.taskRepository.createTask(createTaskDto)
    }

    // createTask(createTaskDto: CreateTaskDto): Task{
    //     const {title, description} = createTaskDto
    //     const task: Task = {
    //         id: uuid(),
    //         title,
    //         description,
    //         status: TaskStatus.OPEN
    //     }
        
    //     this.tasks.push(task)
    //     return task 
    // }

    // updateTaskStatus(id: string, status: TaskStatus): Task {
    //     const task = this.getOneTask(id)
    //     task.status = status
    //     return task
    // }

   async deleteTask(id: number): Promise<void> {
        const result = await this.taskRepository.delete(id)
    }
}
