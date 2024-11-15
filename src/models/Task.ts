export type Task = {
  id: number;
  title: string;
  description?: string;
  isCompleted: boolean;
  createdBy?: string;
  createdAt?: Date;
  finishedAt?: Date;
  approvedAt?: Date;
};
