import { useEffect, useState } from "react";
import { changeUserPassword, getAllUsers } from "../../../services/UserService";
import { styles } from "./styles";
import useDocumentTitle from "../../../hooks/PageTitle";
import { useAuth } from "../../../context/AuthContext";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { useNavigate } from "react-router-dom";

interface User {
  id: number;
  name: string;
  cim: string;
  email: string;
  password: string;
  role: string;
  degree: string;
  created_at: Date;
  token: string;
  refreshToken: string;
}

export default function ResetUsersPassword() {
  useDocumentTitle('Alterar Senha Usuário')
  const { user } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number>();
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  const handleResetPassword = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // caso esteja dentro de um <form>
    console.log(selectedUserId);
    console.log(newPassword);
    console.log(confirmPassword);

    if (!selectedUserId || !newPassword || !confirmPassword) {
      alert("Preencha todos os campos.");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("As senhas não coincidem.");
      return;
    }

    try {
      await changeUserPassword(selectedUserId, newPassword);
      alert("Senha redefinida com sucesso!");
      setNewPassword("");
      setConfirmPassword("");
      setSelectedUserId(undefined);
    } catch (error) {
      console.error("Erro ao redefinir senha:", error);
      alert("Erro ao redefinir a senha.");
    }
  };


  useEffect(() => {
    const fetchUsers = async () => {
      const listUsers: any = await getAllUsers();
      setUsers(listUsers);
    };
    fetchUsers();
  }, []);

  if (!user) return null; 

  return (
    <div style={styles.container}>
      <div style={styles.buttonContainer}>
        <button onClick={() => user.role === 'ADMIN' ? navigate('/admin') : navigate('/home')} style={styles.buttonContainer.button}>{<MdOutlineArrowBackIosNew />}</button>
      </div>
      <div style={styles.form}>
        <h3>Alterar Senha de Usuário</h3>

        <div style={styles.inputContainer}>
          <label htmlFor="user-select">Selecionar Usuário</label>
          <select
            id="user-select"
            value={selectedUserId}
            onChange={(e) => setSelectedUserId(parseInt(e.target.value))}
            style={styles.input}
          >
            <option value="">-- Selecione um usuário --</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>

        <div style={styles.inputContainer}>
          <label htmlFor="password">Nova Senha</label>
          <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
            <input
              id="password"
              type={showPassword ? "text" : "password"} // Alterna entre "text" e "password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              style={{ ...styles.input, paddingRight: "40px" }} // Espaço pro botão do olho
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              style={{
                position: "absolute",
                right: "10px",
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: "18px",
              }}
            >
              {showPassword ? "👁️" : "👁️‍🗨️"}
            </button>
          </div>
        </div>
        <div style={styles.inputContainer}>
          <label htmlFor="password">Confirme Senha</label>
          <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
            <input
              id="password"
              type={showConfirmPassword ? "text" : "password"} // Alterna entre "text" e "password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={{ ...styles.input, paddingRight: "40px" }} // Espaço pro botão do olho
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              style={{
                position: "absolute",
                right: "10px",
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: "18px",
              }}
            >
              {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
            </button>
          </div>
        </div>
        <div style={styles.inputContainer}>
          <button onClick={handleResetPassword} style={styles.button}>Alterar Senha</button>
        </div>
      </div>
    </div>
  );
}