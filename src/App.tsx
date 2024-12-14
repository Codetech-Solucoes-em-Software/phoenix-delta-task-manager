import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
// import Admin from "./pages/admin/Admin";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import TaskPage from "./pages/tasks/TaskPage";

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
                user.role === 'admin' ? '/admin' : '/home'
              }
              replace
            />
            : <Register />}
      />
      <Route
        path="/login"
        element={
          user ? <Navigate to={user.role === 'admin' ? '/admin' : '/home'} replace /> : <Login />
        }
      />
      <Route path="/admin" element={<PrivateRoute role="admin"><TaskPage /></PrivateRoute>} />
      <Route path="/home" element={<PrivateRoute role="user"><Home /></PrivateRoute>} />
      <Route
        path="*"
        element={<Navigate to={user ? (user.role === 'admin' ? '/admin' : '/home') : '/login'} replace />}
      />
    </Routes>
  );
}

export default App;
