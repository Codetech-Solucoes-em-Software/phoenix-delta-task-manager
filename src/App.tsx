import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Admin from "./pages/admin/Admin";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";

const PrivateRoute = ({ children, role }: { children: JSX.Element; role: 'admin' | 'user' }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if (user.role !== role) return <Navigate to="/" />;
  return children;
};

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/admin" element={<PrivateRoute role="admin"><Admin /></PrivateRoute>} />
      <Route path="/home" element={<PrivateRoute role="user"><Home /></PrivateRoute>} />
    </Routes>
  );
}

export default App;
