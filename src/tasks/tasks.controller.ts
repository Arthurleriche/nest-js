import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { create } from 'domain';
import { CreateTaskDto } from './dto/create-task-dto';
import { TasksService } from './tasks.service';
import {Task} from './task.entity';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService){}
    
    // @Get('/')
    // getAllTasks(): Task[]{
    //     return this.tasksService.getAllTasks()
    // }

    @Get(':id')
    getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task>{
        return this.tasksService.getTaskById(id)
    }

    @Post('/')
    @UsePipes(ValidationPipe)
    createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task>{
        return this.tasksService.createTask(createTaskDto)
    }

    

    @Delete('/:id')
    deleteTask(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.tasksService.deleteTask(id)
    }

    // @Patch(':id/status') 
    // updateTaskStatus(@Param('id') id: string, @Body() status:TaskStatus): Task{
    //     return this.tasksService.updateTaskStatus(id, status)
    // }
}