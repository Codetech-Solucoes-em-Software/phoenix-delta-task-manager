/* eslint-disable import/no-anonymous-default-export */
const getTasks = () => JSON.parse(localStorage.getItem('tasks') || '[]');

const createTask = (task: any) => {
  const tasks = getTasks();
  localStorage.setItem('tasks', JSON.stringify([...tasks, task]));
};

const updateTask = (taskId: string, updateTask: any) => {
  const tasks = getTasks().map((task: any) => (task.id === taskId ? updateTask : task));
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

const deleteTask = (taskId: string) => {
  const tasks = getTasks().filter((task: any) => task.id !== taskId);
  localStorage.setItem('tasks', JSON.stringify(tasks)); 
};

export default {
  getTasks
}