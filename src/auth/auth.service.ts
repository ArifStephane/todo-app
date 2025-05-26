import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { LoginDto } from './dto/login.dto';
import { User } from 'src/interfaces/user';

@Injectable()
export class AuthService {
  private usersPath: string = path.join(
    __dirname,
    '..',
    '..',
    'users',
    'users.json',
  );

  constructor() {
    this.ensureUsersFileExists();
  }

  private ensureUsersFileExists(): void {
    if (!fs.existsSync(this.usersPath)) {
      fs.mkdirSync(path.dirname(this.usersPath), { recursive: true });
      fs.writeFileSync(this.usersPath, JSON.stringify([]));
    }
  }

  register(loginDto: LoginDto): User {
    const users: User[] = this.getUsers();
    const newUser: User = {
      userId: Date.now().toString(), // Generate a unique ID
      username: loginDto.username,
      password: loginDto.password,
      email: loginDto.email,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      tasks: [],
      role: 'user', // Default role
      isActive: true, // Default status
      lastLogin: new Date().toISOString(),
      profilePicture: '', // Default empty string
    };
    users.push(newUser);
    this.saveUsers(users);
    return newUser;
  }

  login(loginDto: LoginDto): User | null {
    const users: User[] = this.getUsers();
    const user: User | undefined = users.find(
      (u) =>
        u.username === loginDto.username && u.password === loginDto.password,
    );
    if (user) {
      return user;
    }
    return null;
  }

  getAllUsers(): User[] {
    return this.getUsers();
  }

  private getUsers(): User[] {
    const data: string = fs.readFileSync(this.usersPath, 'utf8');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return JSON.parse(data) || [];
  }

  private saveUsers(users: User[]): void {
    fs.writeFileSync(this.usersPath, JSON.stringify(users, null, 2));
  }
}
