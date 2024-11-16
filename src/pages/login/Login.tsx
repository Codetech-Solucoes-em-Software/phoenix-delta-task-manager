import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
// import { getUser } from "../../services/UserService";
import { authenticateUser } from "../../services/AuthService";
import useDocumentTitle from "../../hooks/PageTitle";

export default function Login() {
  useDocumentTitle('Login');
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    const user = authenticateUser(email, password);

    if (!user) {
      setError('Usuário ou senha incorretos.');
    }

    login({ email: user?.email, role: user?.role, token: user?.token });

    navigate(user?.role === 'admin' ? '/admin' : '/home');
  };
  return (
    <>
      <h1>Login</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <input type="email" name="email" placeholder="Type your e-mail" onChange={(e) => setEmail(e.target.value)}/>
      </div>
      <div>
        <input type="password" name="" placeholder="Type your password" onChange={(e) => setPassword(e.target.value)}/>
      </div>
      <button onClick={handleLogin}>Login</button>
    </>
  );
}