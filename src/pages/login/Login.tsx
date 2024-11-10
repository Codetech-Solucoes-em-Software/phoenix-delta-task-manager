import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    email === 'admin@admin.com' && password === '123456' ? 
    login({ email, role: 'admin', password}) : 
    login({ email, role: 'user', password}) ;
  };
  return (
    <>
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