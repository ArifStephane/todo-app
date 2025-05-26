import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { User } from 'src/interfaces/user';

@Injectable()
export class UsersService {
  private usersPath: string = path.join(__dirname, 'users.json');

  getUsers(): User[] {
    const data: string = fs.readFileSync(this.usersPath, 'utf8');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return JSON.parse(data) || [];
  }
}
