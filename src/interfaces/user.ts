export interface User {
  userId: string;
  username: string;
  password: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  tasks: string[];
  role: string;
  isActive: boolean;
  lastLogin?: string;
  profilePicture?: string;
}
