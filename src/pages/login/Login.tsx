/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-restricted-globals */
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
// import { getUser } from "../../services/UserService";
import { authenticateUser, generateRefreshToken, generateToken } from "../../services/AuthService";
import useDocumentTitle from "../../hooks/PageTitle";
import MainLogo from '../../assets/logo-lojas-2.png';
import masonLogo from '../../assets/331d4371a7b3d149e94095a89c372632.jpg';
import { styles } from "./styles";
import { createUser, getUserByEmail, updateUser, userExists } from "../../services/UserService";
import { IUserAuth } from "../../interfaces/IUserAuth";
export default function Login() {
  useDocumentTitle('Login');
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!email || !password) {
      setError('Por favor, preencha todos os campos.');
      return;
    }
  
    try {
      const data: any = { email, password };
      console.log('Dados enviados: ', data);
      const response: any = await authenticateUser(data);

      console.log(response);
  
      if (response && response.access_token && response.access_token.access_token) {
        const { access_token, user }: any = response.access_token;
        const userAuth: IUserAuth = {
          id: user.id ? Number(user.id) : undefined,
          name: user.name,
          email: user.email,
          role: user.role,
          token: access_token,
        };
  
        login({ user: userAuth });
        const path = user.role === 'ADMIN' ? '/admin' : '/home';
        navigate(path);      
      } else {
        setError('Credenciais inválidas ou resposta inválida.');
      }
    } catch (error) {
      console.error('Erro durante o login:', error);
      setError('Erro no servidor. Tente novamente mais tarde.');
    }
  };
  
  return (
    <div style={styles.container}>
      <div className={`
        col-sm-5 d-flex justify-content-center
      `}>
        <form action="" style={styles.loginForm}>
          <img style={styles.logoHeaderLogin} src={masonLogo} alt="Logo Maçonaria" />
          <h1>Login</h1>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <div>
            <input type="email" name="email" placeholder="Type your e-mail" onChange={(e) => setEmail(e.target.value)} style={styles.input} />
          </div>
          <div>
            <input type="password" name="" placeholder="Type your password" onChange={(e) => setPassword(e.target.value)} style={styles.input} />
          </div>
          <button style={styles.button} type="submit" onClick={handleLogin}>Login</button>
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