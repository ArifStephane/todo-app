import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { getRepositoryToken } from '@mikro-orm/nestjs';
import { EntityRepository, EntityManager } from '@mikro-orm/postgresql';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';

describe('TasksService', () => {
  let service: TasksService;
  let repository: EntityRepository<Task>;
  let entityManager: EntityManager;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: getRepositoryToken(Task),
          useValue: {
            create: jest.fn(),
            findOne: jest.fn(),
            findAll: jest.fn(),
            getEntityManager: jest.fn().mockReturnValue({
              persistAndFlush: jest.fn(),
              flush: jest.fn(),
              removeAndFlush: jest.fn(),
            }),
          },
        },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
    repository = module.get<EntityRepository<Task>>(getRepositoryToken(Task));
    entityManager = repository.getEntityManager();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a task', async () => {
    const createTaskDto: CreateTaskDto = {
      title: 'Test Task',
      description: 'Test Description',
    };
    const task = new Task();
    jest.spyOn(repository, 'create').mockReturnValue(task);
    jest.spyOn(entityManager, 'persistAndFlush').mockResolvedValue(undefined);

    const result = await service.create(createTaskDto);
    expect(result).toEqual(task);
  });
});
