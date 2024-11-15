/* eslint-disable @typescript-eslint/no-unused-vars */
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import { userExists, createUser, getUser } from "../../services/UserService";
import { generateRefreshToken, generateToken } from "../../services/AuthService";

export default function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [name, setName] = useState('');
  const [degree, setDegree] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const role = 'admin';
  const [lodge, setLodge] = useState<'phoenix' | 'delta'>('phoenix');
  const [error, setError] = useState('');

  const handleRegister = () => {
    if (!email || !password) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    if (userExists(email)) {
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
    
    if (!createUser(newUser)) {
      setError('Erro ao criar usuário.');
      return;
    }

    const registeredUser = getUser(email);

    if (registeredUser) {
      login({ email, role, token: registeredUser.token });
      navigate(role === 'admin' ? '/admin' : '/home');
    }
  };
  return (
    <div style={{ display: 'flex', width: 400, height: 400, flexDirection: 'column', padding: 30, alignItems: 'center', justifyContent: 'center', gap: 6, border: 'none',
    borderRadius: 14, backgroundColor: '#232323' }}>
      <h2>Registrar</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <label htmlFor="name">
        Nome:
        <input
          type="text"
          placeholder="Type your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label htmlFor="degree">
        Grau:
        <input
          type="text"
          placeholder="Type your degree"
          value={degree}
          onChange={(e) => setDegree(e.target.value)}
        />
      </label>
      <label htmlFor="email">
        E-mail:
        <input
          type="text"
          placeholder="Type your e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label htmlFor="password">
        Senha:
        <input
          type="password"
          placeholder="Type your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <label htmlFor="lodge">
        Loja:
        <select onChange={(e) => setLodge(e.target.value as 'phoenix' | 'delta')}>
          <option value="phoenix">Phoenix</option>
          <option value="delta">Delta</option>
        </select>
      </label>
      <button onClick={handleRegister}>Registrar</button>
    </div>
  );
}