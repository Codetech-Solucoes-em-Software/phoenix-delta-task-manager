import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import useDocumentTitle from "../../hooks/PageTitle";
import UserRequirements from "../user/requirements/UserRequirements";
import { styles } from "./styles";

export default function Lodge() {
  useDocumentTitle("Requisitos");
  const { user, logout } = useAuth();
  const [filter, setFilter] = useState<"user" | "expected_date">("expected_date");
  console.log(filter);

  return (
    <div style={styles.container}>
      <button onClick={logout} style={styles.logoutButton}>Logout</button>
      <div style={styles.header}>
        <h1 style={styles.headerTitle}>Administração da Loja</h1>
        <div style={styles.headerInfo}>
          <div style={styles.headerTitInfo}>
            <h5>Identificação do Administrador:</h5>
          </div>
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
        <h2>Requisitos da Loja</h2>
        <div style={styles.filterContainer}>
          <button 
            onClick={() => setFilter("user")} 
            style={filter === "user" ? styles.activeFilterButton : styles.filterButton}
          >
            Por Usuário
          </button>
          <button 
            onClick={() => setFilter("expected_date")} 
            style={filter === "expected_date" ? styles.activeFilterButton : styles.filterButton}
          >
            Por Data de Entrega
          </button>
        </div>
      </div>
      <UserRequirements filter={filter} />
    </div>
  );
}
