import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Login from "./pages/login/Login";
//import Admin from "./pages/admin/Admin";
import Register from "./pages/register/Register";
import AdminView from "./views/admin/AdminView";
import UserView from "./views/user/UserView";
import React from "react";

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
      <Route path="/home" element={<PrivateRoute role="USER"><UserView /></PrivateRoute>} />
      <Route
        path="*"
        element={<Navigate to={user ? (user.role === 'ADMIN' ? '/admin' : '/home') : '/login'} replace />}
      /> 
    </Routes>
  );
}

export default App;
