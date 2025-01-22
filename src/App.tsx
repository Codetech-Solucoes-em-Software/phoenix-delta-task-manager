import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Admin from "./pages/admin/Admin";
import InstructionView from "./views/instructions/InstructionsView";
import CompletionWorksView from "./views/completionWorks/CompletionWorksView";
import VisitationsView from "./views/visitations/VisitationsView";
import ReadingsView from "./views/readings/ReadingsView";

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
      <Route path="/admin" element={<PrivateRoute role="admin"><Admin /></PrivateRoute>} />
      <Route path="/home" element={<PrivateRoute role="user"><Home /></PrivateRoute>} />
      <Route path="/instructions" element={<InstructionView />} />
      <Route path="/readings" element={<ReadingsView />} />
      <Route path="/completionWorks" element={<CompletionWorksView />} />
      <Route path="/visitations" element={<VisitationsView />} />
      <Route
        path="*"
        element={<Navigate to={user ? (user.role === 'admin' ? '/admin' : '/home') : '/login'} replace />}
      />
    </Routes>
  );
}

export default App;
