import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Login from "./pages/login/Login";
//import Admin from "./pages/admin/Admin";
import InstructionView from "./views/instructions/InstructionsView";
import CreateInstruction from "./pages/tasks/TaskPage";
import Register from "./pages/register/Register";
import UpdateInstruction from "./pages/tasks/requirements/updateInstruction/UpdateInstruction";
import AdminView from "./views/admin/AdminView";
import UserView from "./views/user/UserView";

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
      <Route path="/admin" element={<PrivateRoute role="ADMIN"><AdminView /></PrivateRoute>} />
      {/* Rotas Instructions */}
      <Route path="/admin/createInstruction" element={<PrivateRoute role="ADMIN"><CreateInstruction /></PrivateRoute>} />
      <Route path="/admin/updateInstruction/:id" element={<PrivateRoute role="ADMIN"><UpdateInstruction /></PrivateRoute>} />
      <Route path="/home" element={<PrivateRoute role="USER"><UserView /></PrivateRoute>} />
      <Route path="/instructions" element={<InstructionView />} />
      <Route
        path="*"
        element={<Navigate to={user ? (user.role === 'ADMIN' ? '/admin' : '/home') : '/login'} replace />}
      /> 
    </Routes>
  );
}

export default App;
