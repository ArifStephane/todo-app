export interface Task {
  id: string;
  userId: string;
  title: string;
  status: string;
  dueDate: string;
  createdAt?: string; // Optional field for task creation timestamp
  updatedAt?: string; // Optional field for task update timestamp
  description?: string; // Optional field for task description
  priority?: string; // Optional field for task priority (e.g., 'low', 'medium', 'high')
  completed?: boolean; // Optional field to indicate if the task is completed
}
export interface CreateTaskDto {
  userId: string;
  title: string;
  status: string;
  dueDate: string;
  description?: string; // Optional field for task description
  priority?: string; // Optional field for task priority
}
export interface UpdateTaskDto {
  title?: string; // Optional field for task title
  status?: string; // Optional field for task status
  dueDate?: string; // Optional field for task due date
  description?: string; // Optional field for task description
  priority?: string; // Optional field for task priority
  completed?: boolean; // Optional field to indicate if the task is completed
}
