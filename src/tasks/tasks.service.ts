import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: EntityRepository<Task>,
  ) {}

  async findAll(): Promise<Task[]> {
    return this.taskRepository.findAll();
  }

  async findOne(id: number): Promise<Task | null> {
    return this.taskRepository.findOne(id);
  }

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = this.taskRepository.create({
      ...createTaskDto,
      done: false,
      createdAt: new Date(),
    });
    await this.taskRepository.getEntityManager().persistAndFlush(task);
    return task;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = await this.taskRepository.findOne(id);
    if (!task) {
      throw new Error('Task not found');
    }
    this.taskRepository.assign(task, updateTaskDto);
    await this.taskRepository.getEntityManager().flush();
    return task;
  }

  async remove(id: number): Promise<void> {
    const task = await this.taskRepository.findOne(id);
    if (!task) {
      throw new Error('Task not found');
    }
    await this.taskRepository.getEntityManager().removeAndFlush(task);
  }
}
