/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Task } from "../../models/Task";
import { 
  completeTask, 
  createTask, 
  deleteTask, 
  getAllTasks 
} from "../../services/TaskService";
import { styles } from "./styles";
import useDocumentTitle from "../../hooks/PageTitle";

export default function TaskPage() {
  useDocumentTitle('Tasks');
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState({ title: '', description: '', isCompleted: false, createdBy: '', createdAt: new Date().getDate(), finishedAt: '', approvedAt: '' });

  useEffect(() => {
    (async () => {
      try {
        const tasks = await getAllTasks();
        setTasks(tasks);
      } catch (error) {
        console.error('Erro ao obter tarefas:', error);
      }
    })();
  }, []);
  
  const handleCreateTask = async () => {
    if (newTask.title && newTask.description) {
      const task: Task = {
        id: 1,
        title: newTask.title,
        description: newTask.description,
        isCompleted: false,
        createdBy: (user?.role === 'admin'? user?.name : ''),
        createdAt: new Date(),
      };
      createTask(task);
      setTasks(await getAllTasks());
      setNewTask({title: '', description: '', isCompleted: false, createdBy: '', createdAt: new Date().getDate(), finishedAt: '', approvedAt: '' });
    }
  };

  const handleCompleteTask = async (taskId: number) => {
    completeTask(taskId);
    setTasks(await getAllTasks());
  };

  const handleDeleteTask = async (taskId: number) => {
    deleteTask(taskId);
    setTasks(await getAllTasks());
  };
  return (
    <div style={styles.container}>
      <h2>Lista de Tarefas</h2>
      {user?.role === 'admin' && (
        <div style={styles.containerPage}>
          <h3>Criar Tarefa</h3>
          <div style={styles.registerWindow}>
            <input
              type="text"
              placeholder="Título"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              style={styles.input}
            />
            <input
              placeholder="Descrição"
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              style={styles.input}
            />
            <input
              type="text"
              placeholder="Usuário"
              value={newTask.createdBy}
              onChange={(e) => setNewTask({ ...newTask, createdBy: e.target.value })}
              style={styles.input}
            />
          </div>
          <button onClick={handleCreateTask} style={styles.button}>Criar Tarefa</button>
        </div>
      )}

      <ul style={styles.listTask}>
        <div style={styles.containerTitle}>
          <h2 style={styles.title}>Tarefas</h2>
        </div>
        {tasks.map(task => (
          <li key={task.id} style={styles.task}>
            <div>
              <h4>{task.title}</h4>
            </div>
            <div>
              <p>{task.description}</p>
            </div>
            <div>
             <p>Criado por: {task.createdBy}</p>
            </div>
            <div>
              {task.isCompleted ? (
                <p style={{ color: 'green' }}>Concluída</p>
              ) : (
                <button onClick={() => handleCompleteTask(task.id)}>
                  Finalizar Tarefa
                </button>
              )}
              {user?.role === 'admin' && (
                <button onClick={() => handleDeleteTask(task.id)}>Excluir</button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}