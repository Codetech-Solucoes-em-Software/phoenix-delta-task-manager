import React, { useEffect, useRef, useState } from "react";
import logoLojas from "../../../assets/logo-lojas-2.png";
import { styles } from "./styles";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { getInstructions } from "../../../services/InstructionsService";
import useDocumentTitle from "../../../hooks/PageTitle";
import { uploadFile } from "../../../services/FileService";

interface Instruction {
  id: number;
  userid: number;
  name: string;
  expected_date: string;
  finished_date: string;
  status: string;
}

export default function Instructions() {
  useDocumentTitle("Instruções Clássicas");
  const { user } = useAuth();
  const navigate = useNavigate();
  const [instructions, setInstructions] = useState<Instruction[]>([]);
  const [loading, setLoading] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (user) {
      getInstructions(user.role, user.id)
        .then((data: any) => {
          console.log("📌 Instruções carregadas:", data);
          if (user.role === 'ADMIN') {
            setInstructions(Array.isArray(data.classicalLessons) ? data.classicalLessons : []);
          } else {
            setInstructions(data.lessonsUser ? [data.lessonsUser] : []);
          }
        })
        .catch((error) => console.error("🚨 Erro ao buscar instruções:", error))
        .finally(() => setLoading(false));
    }
  }, [user]);

  if (!user) {
    return (
      <p style={{ textAlign: "center", marginTop: 20 }}>Carregando usuário...</p>
    );
  }

  return (
    <div style={styles.container}>
      {/* Cabeçalho */}
      <div style={styles.header}>
        <h1 style={styles.headerTitle}>
          A sua Jornada do Conhecimento começa aqui:
        </h1>
        <div style={styles.headerInfo}>
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
          <img src={logoLojas} style={styles.headerImage} />
        </div>
      </div>

      {/* Mensagem de carregamento */}
      {loading ? (
        <p style={{ textAlign: "center", marginTop: 20 }}>
          Carregando instruções...
        </p>
      ) : instructions.length === 0 ? (
        <p style={{ textAlign: "center", marginTop: 20 }}>
          {user.role === "ADMIN"
            ? "Nenhuma instrução encontrada."
            : "Não há instruções registradas para o usuário."}
        </p>
      ) : (
        <>
          {/* Tabela de Instruções */}
          <div style={styles.instructionsTable}>
            <div style={styles.tableHeader}>
              <div style={styles.instructionsCol}>Instruções Clássicas</div>
              <div style={styles.dateCol}>Data Prevista</div>
              <div style={styles.dateCol}>Data de Entrega</div>
              <div style={styles.statusCol}>Situação</div>
            </div>
            {instructions.map((item) => (
              <div key={item.id} style={styles.instructionRow}>
                <div style={styles.instructionsCol}>
                  <p style={styles.instructionsColP}>{item.name}</p>
                </div>
                <div style={styles.dateCol}>
                  <input
                    type="text"
                    value={
                      item.expected_date
                        ? new Date(item.expected_date).toLocaleDateString()
                        : ""
                    }
                    readOnly
                    style={styles.dateColInput}
                  />
                </div>
                <div style={styles.dateCol}>
                  <input
                    type="text"
                    value={
                      item.finished_date
                        ? new Date(item.finished_date).toLocaleDateString()
                        : ""
                    }
                    readOnly
                    style={styles.dateColInput}
                  />
                </div>
                <div style={styles.statusCol}>
                  <span style={styles.statusBadge}>{item.status}</span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      <div style={styles.buttonContainer}>
        <li style={styles.addInstructionButton}>
          <Link to="/admin" style={{ color: "white", textDecoration: "none" }}>
            Voltar
          </Link>
        </li>
        {user?.role === "ADMIN" && (
          <li style={styles.addInstructionButton}>
            <button
              onClick={() => navigate("/admin/createInstruction")}
              style={{
                color: "white",
                textDecoration: "none",
                border: "none",
                background: "transparent",
                cursor: "pointer",
              }}
            >
              Adicionar Instrução
            </button>
          </li>
        )}
      </div>
    </div>
  );
}
