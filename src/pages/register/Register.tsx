import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { createUser } from "../../services/UserService";
import { authenticateUser } from "../../services/AuthService";
import { useAuth } from "../../context/AuthContext";
import useDocumentTitle from "../../hooks/PageTitle";
import masonLogo from '../../assets/331d4371a7b3d149e94095a89c372632.jpg';
import MainLogo from '../../assets/logo-lojas-2.png';
import { styles } from "./styles";
import { IUserAuth } from "../../interfaces/IUserAuth";

export default function Register() {
  useDocumentTitle("Registrar Usuário");
  const navigate = useNavigate();
  const { login } = useAuth();

  // Estados para os campos do formulário
  const [name, setName] = useState("");
  const [degree, setDegree] = useState("");
  const [cim, setCim] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [lodge, setLodge] = useState<"phoenix" | "delta">("phoenix");
  const role: string = 'USER';
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault(); // Evita recarregar a página

    if (!name || !degree || !cim|| !password) {
      setError("Por favor, preencha todos os campos.");
      return;
    }

    try {
      // Chama a API para registrar o usuário
      await createUser({ name, email, cim, password, degree, lodge, role });

      const userData = { cim, password };

      // Autentica o usuário após o cadastro
      const authenticatedUser = await authenticateUser(userData);

      if (!authenticatedUser || !authenticatedUser.access_token) {
        setError("Erro ao autenticar usuário após cadastro.");
        return;
      }

      const userAuth: IUserAuth = {
        id: authenticatedUser.access_token.user.id,
        lodge_id: authenticatedUser.access_token.user.lodge_id,
        name: authenticatedUser.access_token.user.name,
        cim: authenticatedUser.access_token.user.cim,
        role: authenticatedUser.access_token.user.role,
        degree: authenticatedUser.access_token.user.degree,
        token: authenticatedUser.access_token.access_token,
      };

      login({ user: userAuth });

      // Redireciona o usuário para a página correta
      navigate('/login');
    } catch (error) {
      console.error("Erro no cadastro:", error);
      setError("Erro ao registrar usuário. Tente novamente.");
    }
  };

  return (
    <div style={styles.container}>
      <div className="col-sm-5 d-flex justify-content-center">
        <form style={styles.registerForm} onSubmit={handleRegister}>
          <img style={styles.logoHeaderLogin} src={masonLogo} alt="Logo Maçonaria" />
          <h2>Registrar</h2>

          {error && <p style={{ color: "red" }}>{error}</p>}

          <input
            type="text"
            placeholder="Nome Completo"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
            required
          />

          <input
            type="text"
            placeholder="Digite o grau"
            value={degree}
            onChange={(e) => setDegree(e.target.value)}
            style={styles.input}
            required
          />

          <input
            type="email"
            placeholder="Digite seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
          />
          <input
            type="text"
            placeholder="Digite seu cim"
            value={cim}
            onChange={(e) => setCim(e.target.value)}
            style={styles.input}
            required
          />

          <input
            type="password"
            placeholder="Digite sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />

          <select style={styles.input} value={lodge} onChange={(e) => setLodge(e.target.value as "phoenix" | "delta")}>
            <option value="phoenix">Phoenix</option>
            <option value="delta">Delta</option>
          </select>

          <button type="submit" style={styles.button}>Registrar</button>

          <p style={{ marginTop: "10px" }}>
            Já tem uma conta? <Link to="/login">Faça login aqui</Link>
          </p>
        </form>
      </div>

      <div className="col-sm-7">
        <img src={MainLogo} alt="Logo Principal" style={styles.logo} />
      </div>
    </div>
  );
}
