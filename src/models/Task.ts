export type Task = {
  id: string;
  title: string;
  description?: string;
  isCompleted: boolean;
  createdBy?: string;
  createdAt?: Date;
  finishedAt?: Date;
  approvedAt?: Date;
};
