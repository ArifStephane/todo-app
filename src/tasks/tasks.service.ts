import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from 'src/interfaces/task';
// export interface Task {
//   id: string;
//   userId: string;
//   title: string;
//   status: string;
//   dueDate: string;
// }

@Injectable()
export class TasksService {
  private tasksPath: string = path.join(__dirname, 'tasks.json');

  constructor() {
    this.ensureTasksFileExists();
  }

  private ensureTasksFileExists(): void {
    if (!fs.existsSync(this.tasksPath)) {
      fs.mkdirSync(path.dirname(this.tasksPath), { recursive: true });
      fs.writeFileSync(this.tasksPath, JSON.stringify([]));
    }
  }

  getTasks(userId: string): Task[] {
    const data: string = fs.readFileSync(this.tasksPath, 'utf8');
    const json: Task[] = JSON.parse(data);
    return json.filter(task => task.userId === userId);
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const data: string = fs.readFileSync(this.tasksPath, 'utf8');
    const json: Task[] = JSON.parse(data);
    const newTask: Task = { id: Date.now().toString(), ...createTaskDto };
    json.push(newTask);
    fs.writeFileSync(this.tasksPath, JSON.stringify(json, null, 2));
    return newTask;
  }

  updateTask(id: string, updateTaskDto: UpdateTaskDto): Task | null {
    const data: string = fs.readFileSync(this.tasksPath, 'utf8');
    const json: Task[] = JSON.parse(data);
    const taskIndex: number = json.findIndex(task => task.id === id);
    if (taskIndex !== -1) {
      json[taskIndex] = { ...json[taskIndex], ...updateTaskDto };
      fs.writeFileSync(this.tasksPath, JSON.stringify(json, null, 2));
      return json[taskIndex];
    }
    return null;
  }

  deleteTask(id: string): boolean {
    const data: string = fs.readFileSync(this.tasksPath, 'utf8');
    const json: Task[] = JSON.parse(data);
    const taskIndex: number = json.findIndex(task => task.id === id);
    if (taskIndex !== -1) {
      json.splice(taskIndex, 1);
      fs.writeFileSync(this.tasksPath, JSON.stringify(json, null, 2));
      return true;
    }
    return false;
  }
}
