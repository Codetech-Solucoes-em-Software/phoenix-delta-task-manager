/* eslint-disable @typescript-eslint/no-unused-vars */
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import { userExists, createUser, getUserByEmail } from "../../services/UserService";
import { generateRefreshToken, generateToken } from "../../services/AuthService";
import useDocumentTitle from "../../hooks/PageTitle";
import masonLogo from '../../assets/331d4371a7b3d149e94095a89c372632.jpg';
import MainLogo from '../../assets/logo-lojas-2.png';
import { styles } from "./styles";

export default function Register() {
  useDocumentTitle('Register');
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [name, setName] = useState('');
  const [degree, setDegree] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const role = 'admin';
  const [lodge, setLodge] = useState<'phoenix' | 'delta'>('phoenix');
  const [error, setError] = useState('');

  const handleRegister = async () => {
    try {
      if (!email || !password) {
        setError('Por favor, preencha todos os campos.');
        return;
      }

      const exists = await userExists(email);
      if (await exists) {
        setError('Usuário já existe.');
        return;
      }

      const newUser = {
        id: new Date().getDate().toString(),
        name,
        degree,
        lodge,
        email,
        password,
        role,
        token: generateToken(email),
        refreshToken: generateRefreshToken(email),
      };
      
      const success = createUser(newUser);
      if (!success) {
        setError('Erro ao criar usuário.');
        return;
      }

      const registeredUser = await getUserByEmail(email); // Aguarda a resolução da Promise

      if (!registeredUser || registeredUser.password !== password) {
        setError('Usuário ou senha incorretos.');
        return;
      }

      // Garante que o usuário encontrado possui um token
      if (registeredUser.token) {
        login({
          email: registeredUser.email,
          role: registeredUser.role,
          token: registeredUser.token,
        });

        // Redireciona o usuário com base na função
        navigate(registeredUser.role === 'admin' ? '/admin' : '/home');
      } else {
        setError('Erro ao obter o token do usuário.');
      }
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
        <form action="" style={styles.registerForm}>
          <img style={styles.logoHeaderLogin} src={masonLogo} alt="Logo Maçonaria" />
          <h2>Registrar</h2>
          {error && <p style={{ color: 'red' }}>{error}</p>}
            <input
              type="text"
              placeholder="Nome Completo"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={styles.input}
            />
            <input
              type="text"
              placeholder="Digite o grau"
              value={degree}
              onChange={(e) => setDegree(e.target.value)}
              style={styles.input}
            />
            <input
              type="text"
              placeholder="Digite seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
            />
            <input
              type="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
            />
            <select
              style={styles.input} 
              onChange={(e) => setLodge(e.target.value as 'phoenix' | 'delta')}>
              <option value="phoenix">Phoenix</option>
              <option value="delta">Delta</option>
            </select>
          <button style={styles.button} onClick={handleRegister}>Registrar</button>
        </form>
      </div>
      <div className="col-sm-7">
        <img src={MainLogo} alt="Logo Principal" style={styles.logo}/>
      </div>
    </div>
  );
}