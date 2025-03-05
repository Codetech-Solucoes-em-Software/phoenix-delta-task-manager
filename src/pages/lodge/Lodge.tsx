import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import useDocumentTitle from "../../hooks/PageTitle";
import LodgeRequirements from "./requirements/RequirementsLodge";
import { styles } from "./styles";
import { CgLogOff } from "react-icons/cg";

export default function Lodge() {
  useDocumentTitle("Menu da Loja");
  const { user, logout } = useAuth();
  const [filter, setFilter] = useState<"user" | "expected_date">("user");
  console.log(filter);

  return (
    <div style={styles.container}>
      <div style={styles.logoutButtonContainer}>
        <button onClick={logout} style={styles.logoutButton}>{<CgLogOff style={styles.iconButton} />}</button>
      </div>
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
      <LodgeRequirements filter={filter} />
    </div>
  );
}
