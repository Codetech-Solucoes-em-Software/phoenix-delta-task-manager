import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { createUser } from "../../services/UserService";
import { authenticateUser } from "../../services/AuthService";
import { useAuth } from "../../context/AuthContext";
import useDocumentTitle from "../../hooks/PageTitle";
import masonLogo from '../../assets/331d4371a7b3d149e94095a89c372632.jpg';
import MainLogo from '../../assets/logo-phoenix.jpeg';
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
  const [lodge, setLodge] = useState<"PHOENIX" | "DELTA">("PHOENIX");
  const role: string = 'USER';
  const [error, setError] = useState("");

  const lodgeMapping: Record<string, number> = {
    PHOENIX: 1,
    DELTA: 2
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault(); // Evita recarregar a página

    if (!name || !degree || !cim|| !password) {
      setError("Por favor, preencha todos os campos.");
      return;
    }

    const lodgeUpperCase = lodge.toUpperCase();
    const lodge_id: number = lodgeMapping[lodgeUpperCase];

    if (!lodge_id) setError('Lodge ID nulo');

    console.log("Lodge selecionado:", lodge); // Verifica se o valor está correto
    console.log("Lodge ID enviado:", lodge_id); // Confirma se o ID está sendo gerado corretamente

    try {
      // Chama a API para registrar o usuário
      await createUser({ 
        cim, 
        lodge_id, 
        name, 
        email, 
        password, 
        degree, 
        role 
      });

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
          <img style={styles.logoHeaderLogin} src={MainLogo} alt="Logo Maçonaria" />
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

          <select style={styles.input} value={lodge} onChange={(e) => setLodge(e.target.value as "PHOENIX" | "DELTA")}>
            <option value="PHOENIX">Phoenix</option>
            <option value="DELTA">Delta</option>
          </select>

          <button type="submit" style={styles.button}>Registrar</button>

          <p style={{ marginTop: "10px" }}>
            Já tem uma conta? <Link to="/login">Faça login aqui</Link>
          </p>
        </form>
      </div>

      <div className="col-sm-7">
        <img src={MainLogo} alt="Logo Principal" style={{...styles.logo, width: '90%'}} />
      </div>
    </div>
  );
}
