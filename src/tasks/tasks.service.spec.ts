import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { getRepositoryToken } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { SqlEntityRepository } from '@mikro-orm/postgresql';
describe('TasksService', () => {
  let service: TasksService;
  // let repository: EntityRepository<Task>;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let repository: SqlEntityRepository<Task>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: getRepositoryToken(Task),
          useClass: EntityRepository,
        },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
    repository = module.get<SqlEntityRepository<Task>>(
      getRepositoryToken(Task),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a task', async () => {
    const task = new Task();
    task.title = 'Test Task';
    task.description = 'Test Description';
    // jest.spyOn(repository, 'persistAndFlush').mockImplementation(async () => task);

    const createTaskDto: CreateTaskDto = {
      title: 'Test Task',
      description: 'Test Description',
    };
    const result = service.createTask(createTaskDto);
    expect(result).toEqual(task);
  });
});
