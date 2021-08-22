export interface Task {
  id: number;
  title: string;
  description: string | null;
  priority: number;
  project: any;
  completed: boolean;
}
