/* eslint-disable import/no-anonymous-default-export */
import { Task } from "../models/Task";

const getAllTasks = (): Task[] => {
  const tasks = localStorage.getItem('tasks');
  return tasks ? JSON.parse(tasks) : [];
};

const saveTasks = (tasks: Task[]) => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

const createTask = (task: Task) => {
  const tasks = getAllTasks();
  tasks.push(task);
  saveTasks(tasks);
};

const updateTask = (updatedTask: Task) => {
  const tasks = getAllTasks();
  const index = tasks.findIndex(task => task.id === updatedTask.id);
  if (index !== -1) {
    tasks[index] = updatedTask;
    saveTasks(tasks);
  }
};

const deleteTask = (taskId: number) => {
  const tasks = getAllTasks().filter(task => task.id !== taskId);
  saveTasks(tasks);
};

const completeTask = (taskId: number) => {
  const tasks = getAllTasks();
  const index = tasks.findIndex(task => task.id === taskId);
  if (index !== -1) {
    tasks[index].isCompleted = true;
    saveTasks(tasks);
  }
};

export {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
  completeTask
}