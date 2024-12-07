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

export default function Login() {
  useDocumentTitle('Login');
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const handleLogin = async (e: any) => {
    e.preventDefault(); // Impede o comportamento padrão do formulário

    try {
      if (!email || !password) {
        setError('Por favor, preencha todos os campos.');
        return;
      }
  
      const registeredUser = await getUserByEmail(email);
  
      // Valida se o usuário existe e se a senha está correta
      if (!registeredUser || registeredUser.password !== password) {
        setError('Usuário ou senha incorretos.');
        return;
      }

      let newToken;
  
      if (registeredUser.email) {
        newToken = generateToken(registeredUser.email);
        registeredUser.token = newToken;   
        const updated = await updateUser(registeredUser); 
        if (!updated) {
          setError('Erro ao atualizar o token do usuário.');
          return;
        }    
      }

      // Realiza o login e redireciona para a página correta
      login({
        email: registeredUser.email,
        role: registeredUser.role,
        token: newToken,
      });
  
      navigate(registeredUser.role === 'admin' ? '/admin' : '/home');
    } catch (error) {
      console.error('Erro durante o login:', error);
      setError('Erro no servidor.');
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
            <input type="email" name="email" placeholder="Type your e-mail" onChange={(e) => setEmail(e.target.value)} style={styles.input}/>
          </div>
          <div>
            <input type="password" name="" placeholder="Type your password" onChange={(e) => setPassword(e.target.value)} style={styles.input}/>
          </div>
          <select name="" id="" style={styles.input}>
            <option value="Phoenix">Phoenix</option>
            <option value="Delta">Delta Phoenix</option>
          </select>
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