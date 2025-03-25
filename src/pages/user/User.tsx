/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import useDocumentTitle from "../../hooks/PageTitle";
import UserRequirements from "../user/requirements/UserRequirements";
import { styles } from "./styles";
import { CgLogOff } from "react-icons/cg";
import { FaUser } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
export default function User() {
  useDocumentTitle("Requisitos");
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [filter, setFilter] = useState<"expected_date">("expected_date");
  console.log(filter);

  return (
    <div style={styles.container}>
      <div style={styles.logoutButtonContainer}>
        <button onClick={() => navigate('/profile')} style={styles.profileButton}>{<FaUser style={styles.iconButtonProfile}/>}</button>
        <button onClick={logout} style={styles.logoutButton}>{<CgLogOff style={styles.iconButton} />}</button>
      </div>
      <div style={styles.header}>
        <h3 style={styles.headerTitle}>Informações do Usuário</h3>
        <div style={styles.headerInfo}>
          <div style={styles.inputContainer}>
            <div style={styles.inputGroup}>
              <label style={styles.inputGroupLabel}>Nome:</label>
              <input
                type="text"
                value={user?.name ?? ""}
                readOnly
                style={styles.inputGroupInput}
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.inputGroupLabel}>Grau:</label>
              <input
                type="text"
                value={user?.degree ?? ""}
                readOnly
                style={styles.inputGroupInput}
              />
            </div>
          </div>
        </div>
      </div>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 15,
        gap: 10
      }}>
        <h4>Requisitos da Loja</h4>
     </div>
      <UserRequirements filter={filter} />
    </div>
  );
}
