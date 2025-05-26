export interface User {
  userId: string;
  username: string;
  password: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  tasks: string[]; // Array of task IDs
  role: string; // 'user' or 'admin'
  isActive: boolean; // Indicates if the user is active
  lastLogin?: string; // Optional field for last login timestamp
  profilePicture?: string; // Optional field for user profile picture URL
}
