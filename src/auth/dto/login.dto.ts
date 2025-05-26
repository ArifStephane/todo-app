import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ description: 'The username of the user', example: 'john_doe' })
  readonly username: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'password123',
  })
  readonly password: string;

  @ApiProperty({
    description: 'The email of the user',
    example: 'zer@yopmail.com',
  })
  readonly email: string;
}
