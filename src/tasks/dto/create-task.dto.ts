import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({ description: 'The ID of the user', example: '123' })
  readonly userId: string;

  @ApiProperty({ description: 'The title of the task', example: 'Complete project' })
  readonly title: string;

  @ApiProperty({ description: 'The status of the task', example: 'pending' })
  readonly status: string;

  @ApiProperty({ description: 'The due date of the task', example: '2023-12-31' })
  readonly dueDate: string;
}
