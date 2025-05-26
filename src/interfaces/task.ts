export interface Task {
  id: string;
  userId: string;
  title: string;
  status: string;
  dueDate: string;
  createdAt?: string;
  updatedAt?: string;
  description?: string;
  priority?: string;
  completed?: boolean;
}
