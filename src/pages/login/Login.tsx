import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
// import { getUser } from "../../services/UserService";
import { authenticateUser } from "../../services/AuthService";
import useDocumentTitle from "../../hooks/PageTitle";
import MainLogo from '../../assets/331d4371a7b3d149e94095a89c372632.jpg';
import { styles } from "./styles";

export default function Login() {
  useDocumentTitle('Login');
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const user = await authenticateUser(email, password);
  
      if (!user) {
        setError('Usuário ou senha incorretos.');
        return;
      }
  
      login({ email: user.email, role: user.role, token: user.token });  
      navigate(user.role === 'admin' ? '/admin' : '/home');
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      setError('Ocorreu um erro ao tentar fazer login.');
    }
  };
  return (
    <div style={styles.container}>
      <div className={`
        col-sm-5 d-flex justify-content-center
      `}>
        <form action="" style={styles.loginForm}>
          <h1>Login</h1>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <div>
            <input type="email" name="email" placeholder="Type your e-mail" onChange={(e) => setEmail(e.target.value)}/>
          </div>
          <div>
            <input type="password" name="" placeholder="Type your password" onChange={(e) => setPassword(e.target.value)}/>
          </div>
          <button onClick={handleLogin}>Login</button>
        </form>
      </div>
      <div className={`
        col-sm-7 d-flex
      `}>
        <img src={MainLogo} alt="Logo Principal" style={styles.logo} />
      </div>
    </div>
  );
}