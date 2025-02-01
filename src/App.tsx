import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Admin from "./pages/admin/Admin";
import InstructionView from "./views/instructions/InstructionsView";
import CompletionWorksView from "./views/completionWorks/CompletionWorksView";
import VisitationsView from "./views/visitations/VisitationsView";
import ReadingsView from "./views/readings/ReadingsView";
import TaskPage from "./pages/tasks/TaskPage";
import CreateInstruction from "./pages/tasks/TaskPage";
import CreateCompletionWork from "./pages/tasks/completionWorks/createCompletionWork/CreateCompletionWork";
import CreateReading from "./pages/tasks/readings/createReading/CreateReading";
import Register from "./pages/register/Register";
import UpdateInstruction from "./pages/tasks/instructions/updateInstruction/UpdateInstruction";

const PrivateRoute = ({ children, role }: { children: JSX.Element; role: 'ADMIN' | 'USER' }) => {
  const { user }: any = useAuth();
  
  if (!user) return <Navigate to="/login" replace />;
  
  if (user.role.toUpperCase() !== role.toUpperCase()) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  const { user } = useAuth();

  if (user === undefined) {
    return <div>Carregando...</div>; // Evita re-render desnecessário
  }

  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route
        path="/login"
        element={
          user ? <Navigate to={user.role === 'ADMIN' ? '/admin' : '/home'} replace /> : <Login />
        }
      />
      <Route path="/admin" element={<PrivateRoute role="ADMIN"><Admin /></PrivateRoute>} />
      {/* Rotas Instructions */}
      <Route path="/admin/createInstruction" element={<PrivateRoute role="ADMIN"><CreateInstruction /></PrivateRoute>} />
      <Route path="/admin/updateInstruction/:id" element={<PrivateRoute role="ADMIN"><UpdateInstruction /></PrivateRoute>} />
      {/* Rotas CompletionWork */}
      <Route path="/admin/createCompletionWork" element={<PrivateRoute role="ADMIN"><CreateCompletionWork /></PrivateRoute>} />
      {/* Rotas Readings */}
      <Route path="/admin/createReading" element={<PrivateRoute role="ADMIN"><CreateReading /></PrivateRoute>} />
      <Route path="/home" element={<PrivateRoute role="USER"><Home /></PrivateRoute>} />
      <Route path="/instructions" element={<InstructionView />} />
      <Route path="/readings" element={<ReadingsView />} />
      <Route path="/completionWorks" element={<CompletionWorksView />} />
      <Route path="/visitations" element={<VisitationsView />} />
      <Route
        path="*"
        element={<Navigate to={user ? (user.role === 'ADMIN' ? '/admin' : '/home') : '/login'} replace />}
      /> 
    </Routes>
  );
}

export default App;
