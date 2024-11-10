import { Navigate, Route, Router, Routes } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { UserRole } from "./enums/UserRole";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Admin from "./pages/admin/Admin";
import Home from "./pages/home/Home";

const PrivateRoute = ({ children, role }: { children: JSX.Element, role: UserRole }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if (user.role !== role) return <Navigate to="/" />;
  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<PrivateRoute role={UserRole.admin}><Admin /></PrivateRoute>} />
        <Route path="/" element={<PrivateRoute role={UserRole.user}><Home /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
