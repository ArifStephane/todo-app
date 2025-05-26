import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get(':userId')
  @ApiOperation({ summary: 'Get tasks for a user' })
  @ApiParam({ name: 'userId', description: 'The ID of the user' })
  @ApiResponse({ status: 200, description: 'List of tasks for the user' })
  getTasks(@Param('userId') userId: string) {
    return this.tasksService.getTasks(userId);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new task' })
  @ApiBody({ type: CreateTaskDto })
  @ApiResponse({ status: 201, description: 'Task successfully created' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  createTask(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.createTask(createTaskDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a task' })
  @ApiParam({ name: 'id', description: 'The ID of the task' })
  @ApiBody({ type: UpdateTaskDto })
  @ApiResponse({ status: 200, description: 'Task successfully updated' })
  @ApiResponse({ status: 404, description: 'Task not found' })
  updateTask(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.updateTask(id, updateTaskDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a task' })
  @ApiParam({ name: 'id', description: 'The ID of the task' })
  @ApiResponse({ status: 200, description: 'Task successfully deleted' })
  @ApiResponse({ status: 404, description: 'Task not found' })
  deleteTask(@Param('id') id: string) {
    return this.tasksService.deleteTask(id);
  }
}
