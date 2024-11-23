import { Task } from "../models/Task";

const API_URL = 'http://localhost:5000/tasks';

const getAllTasks = async (): Promise<Task[]> => {
  const response = fetch(API_URL);
  return (await response).json();
};

const createTask = async (task: Task): Promise<void> => {
  await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task),
  });
};

const updateTask = async (updatedTask: Task): Promise<void> => {
  await fetch(`${API_URL}/${updatedTask.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedTask),
  });
};

const deleteTask = async (taskId: number): Promise<void> => {
  await fetch(`${API_URL}/${taskId}`, {
    method: 'DELETE',
  });
};

const completeTask = async (taskId: number): Promise<void> => {
  const task = await fetch(`${API_URL}/${taskId}`).then((res) => res.json());
  task.isCompleted = true;
  await updateTask(task);
};

export {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
  completeTask
}