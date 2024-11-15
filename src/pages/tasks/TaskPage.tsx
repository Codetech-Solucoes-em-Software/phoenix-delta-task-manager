import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Task } from "../../models/Task";
import { 
  completeTask, 
  createTask, 
  deleteTask, 
  getAllTasks 
} from "../../services/TaskService";

export default function TaskPage() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState({ title: '', description: '', isCompleted: false, createdBy: '', createdAt: new Date().getDate(), finishedAt: '', approvedAt: '' });

  useEffect(() => {
    setTasks(getAllTasks());
  }, []);

  const handleCreateTask = () => {
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
      setTasks(getAllTasks());
      setNewTask({title: '', description: '', isCompleted: false, createdBy: '', createdAt: new Date().getDate(), finishedAt: '', approvedAt: '' });
    }
  };

  const handleCompleteTask = (taskId: number) => {
    completeTask(taskId);
    setTasks(getAllTasks());
  };

  const handleDeleteTask = (taskId: number) => {
    deleteTask(taskId);
    setTasks(getAllTasks());
  };
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <h2>Lista de Tarefas</h2>
      {user?.role === 'admin' && (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          width: 500,
          height: 500,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#232323',
          border: 'none',
          borderRadius: 14,
          padding: 20,
          gap: 6
        }}>
          <h3>Criar Tarefa</h3>
          <input
            type="text"
            placeholder="Título"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            style={{
              width: 300,
              height: 30,
              paddingLeft: 8,
              border: 'none',
              borderRadius: 10,
              outline: 'none'
            }}
          />
          <textarea
            placeholder="Descrição"
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            style={{
              width: 300,
              height: 200,
              paddingLeft: 8,
              paddingTop: 6,
              border: 'none',
              borderRadius: 10,
              outline: 'none'
            }}
          />
          <input
            type="text"
            placeholder="Usuário"
            value={newTask.createdBy}
            onChange={(e) => setNewTask({ ...newTask, createdBy: e.target.value })}
            style={{
              width: 300,
              height: 30,
              paddingLeft: 8,
              border: 'none',
              borderRadius: 10,
              outline: 'none'
            }}
          />
          <button onClick={handleCreateTask}>Criar Tarefa</button>
        </div>
      )}

      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <h4>{task.title}</h4>
            <p>{task.description}</p>
            <p>Criado por: {task.createdBy}</p>
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
          </li>
        ))}
      </ul>
    </div>
  );
}