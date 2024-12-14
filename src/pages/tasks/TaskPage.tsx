/* eslint-disable react-hooks/exhaustive-deps */
import { v4 as uuidv4 } from 'uuid';
import { FaCheck, FaTrashAlt } from "react-icons/fa";
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
        id: uuidv4(),
        title: newTask.title,
        description: newTask.description,
        isCompleted: false,
        createdBy: user?.role === 'admin' ? user?.name : '',
        createdAt: new Date(),
      };
  
      try {
        const createdTask: any = await createTask(task); // Certifique-se de que o tipo retornado seja Task
        if (createdTask) {
          setTasks(prevTasks => [...prevTasks, createdTask]); // Atualiza o estado apenas se válido
        } else {
          console.error('Erro: createTask não retornou uma tarefa válida');
        }
        setNewTask({ title: '', description: '', isCompleted: false, createdBy: '', createdAt: new Date().getDate(), finishedAt:  '' , approvedAt: '' });
      } catch (error) {
        console.error('Erro ao criar tarefa:', error);
      }
    }
  };
  
  const handleCompleteTask = async (taskId: string) => {
    completeTask(taskId);
    setTasks(await getAllTasks());
  };

  const handleDeleteTask = async (taskId: string) => {
    deleteTask(taskId);
    setTasks(await getAllTasks());
  };
  return (
    <div style={styles.container}>
      {user?.role === 'admin' && (
        <div style={styles.containerPage}>
          <h3>A sua jornada do conhecimento começa aqui</h3>
          <div style={styles.registerWindow}>
            <label htmlFor="">
              Nome:
              {user.name}
            </label>
            <label htmlFor="">
              Grau:
              {user.degree}
            </label>
            {/* <input
              type="date"
              value={newTask.finishedAt}
              onChange={(e) => setNewTask({ ...newTask, finishedAt: e.target.value })}
              style={styles.input}
            /> */}
          </div>
        </div>
      )}

      <ul style={styles.listTask}>
        <div style={styles.containerTitle}>
          <h2 style={styles.title}>Tarefas</h2>
        </div>
        {tasks.map((task, index) => (
          <li key={task.id || index} style={styles.task}>
            <div>
              <h6>{task.title}</h6>
            </div>
            <div>
              <p>{task.description}</p>
            </div>
            <div>
             <p>Criado por: {task.createdBy}</p>
            </div>
            <div>
             <p>Finalizdo em: {task.finishedAt?.toDateString()}</p>
            </div>
            <div>
              {task.isCompleted ? (
                <p style={{ backgroundColor: 'green', padding: 5, borderRadius: 5, color: '#fff' }}>Concluída</p>
              ) : (
                <button onClick={() => handleCompleteTask(task.id)} style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>
                  <FaCheck size={20} color="green" />
                </button>
              )}
              {user?.role === 'admin' && (
                <button onClick={() => handleDeleteTask(task.id)} style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>
                  <FaTrashAlt size={20} color="red" />
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
