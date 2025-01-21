import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
// import Admin from "./pages/admin/Admin";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import TaskPage from "./pages/tasks/TaskPage";
import Instructions from "./pages/tasks/instructions/Instructions";
import Readings from "./pages/tasks/readings/Readings";
import CompletionWorks from "./pages/tasks/completionWorks/CompletionWorks";
import Visitations from "./pages/tasks/visitations/Visitations";

const PrivateRoute = ({ children, role }: { children: JSX.Element; role: 'admin' | 'user' }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if (user.role !== role) return <Navigate to="/" />;
  return children;
};

function App() {
  const { user } = useAuth();
  return (
    <Routes>
      <Route
        path="/register"
        element={
          user ?
            <Navigate
              to={
                user.role === 'user' ? '/home' : '/instructions'
              }
              replace
            />
            : <Register />}
      />
      <Route
        path="/login"
        element={
          user ? <Navigate to={user.role === 'admin' ? '/instructions' : '/home'} replace /> : <Login />
        }
      />
      <Route path="/admin" element={<PrivateRoute role="admin"><TaskPage /></PrivateRoute>} />
      <Route path="/home" element={<PrivateRoute role="user"><Home /></PrivateRoute>} />
      <Route path="/instructions" element={<Instructions />} />
      <Route path="/readings" element={<Readings />} />
      <Route path="/completionWorks" element={<CompletionWorks />} />
      <Route path="/visitations" element={<Visitations />} />
      <Route
        path="*"
        element={<Navigate to={user ? (user.role === 'admin' ? '/admin' : '/home') : '/login'} replace />}
      />
    </Routes>
  );
}

export default App;
