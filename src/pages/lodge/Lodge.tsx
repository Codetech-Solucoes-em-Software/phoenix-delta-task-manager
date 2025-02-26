import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import useDocumentTitle from "../../hooks/PageTitle";
import LodgeRequirements from "./requirements/RequirementsLodge";
import { styles } from "./styles";

export default function Lodge() {
  useDocumentTitle("Menu da Loja");
  const { user } = useAuth();
  const [filter, setFilter] = useState<"user" | "date">("user");

  return (
    <div style={styles.container}>
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

      <div>
        <h2>Requisitos da Loja</h2>
        <div style={styles.filterContainer}>
          <button 
            onClick={() => setFilter("user")} 
            style={filter === "user" ? styles.activeFilterButton : styles.filterButton}
          >
            Por Usuário
          </button>
          <button 
            onClick={() => setFilter("date")} 
            style={filter === "date" ? styles.activeFilterButton : styles.filterButton}
          >
            Por Data de Entrega
          </button>
        </div>

        {/* Passa o filtro como prop para LodgeRequirements */}
        <LodgeRequirements filter={filter} />
      </div>
    </div>
  );
}
