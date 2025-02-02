import React, { useEffect, useRef, useState } from "react";
import logoLojas from "../../../assets/logo-lojas-2.png";
import { styles } from "./styles";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { getInstructions } from "../../../services/InstructionsService";
import useDocumentTitle from "../../../hooks/PageTitle";
import { uploadFile } from "../../../services/FileService";
import { MdEdit, MdDelete } from 'react-icons/md';

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
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!user) return;

    setLoading(true);

    getInstructions(user.role, user.id)
      .then((data: any) => {
        if (user.role === "ADMIN") {
          setInstructions(Array.isArray(data.classicalLessons) ? data.classicalLessons : []);
        } else {
          // Garante que `data.lessonsUser` seja um array ou um array vazio
          const userInstructions = Array.isArray(data.lessonsUser)
            ? data.lessonsUser
            : data.lessonsUser
              ? [data.lessonsUser]
              : [];

          setInstructions(userInstructions);
        }
      })
      .catch((error) => {
        console.error("🚨 Erro ao buscar instruções:", error);
        setInstructions([]); // Garante que `instructions` seja sempre um array
      })
      .finally(() => setLoading(false));
  }, [user]);

  const getStatusBadgeClasses = (status: string) => {
    switch (status) {
      case 'CONCLUÍDO':
        return { ...styles.statusBadge, ...styles.statusBadgeConcluido };
      case 'CONCLUíDO':
        return { ...styles.statusBadge, ...styles.statusBadgeConcluido };
      case 'REVISAR':
        return { ...styles.statusBadge, ...styles.statusBadgeRevisar }
      case 'AGUARDANDO':
        return { ...styles.statusBadge, ...styles.statusBadgeAguardando }
      case 'PENDENTE':
        return { ...styles.statusBadge, ...styles.statusBadgeAguardando }
      default:
        return styles.statusBadge;
    }
  };

  return (
    <div style={styles.container}>
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

      {loading ? (
        <p style={{ textAlign: "center", marginTop: 20 }}>
          Carregando instruções...
        </p>
      ) : instructions.length === 0 ? (
        <p style={{ textAlign: "center", marginTop: 20 }}>
          {user?.role === "ADMIN"
            ? "Nenhuma instrução encontrada."
            : "Não há instruções registradas para o usuário."}
        </p>
      ) : (
        <>
          <div style={styles.instructionsTable}>
            <div style={styles.tableHeader}>
              <div style={styles.instructionsCol}>Instruções Clássicas</div>
              <div style={styles.dateCol}>Data Prevista</div>
              <div style={styles.dateCol}>Data de Entrega</div>
              <div style={styles.statusCol}>Situação</div>
              {user?.role === 'ADMIN' && (
                <div style={styles.actions}>Ações</div>
              )}
            </div>
            {instructions.map((item) => (
              <div key={item.id} style={user?.role === 'ADMIN' ? styles.instructionRow : styles.instructionRowUser}>
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
                  <span style={getStatusBadgeClasses(item.status)}>{item.status}</span>
                </div>
                {user?.role === 'ADMIN' && (
                  <>
                    <div>
                      <button
                        onClick={() => navigate(`/admin/updateInstruction/${item.id}`)}
                        style={styles.updateInstructionButton}
                      >
                        <MdEdit />
                      </button>
                    </div>
                    <div>
                      <button
                        onClick={() => navigate(`/admin/removeInstruction/${item.id}`)}
                        style={styles.removeInstructionButton}
                      >
                        <MdDelete />
                      </button>
                    </div>
                  </>
                )}
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
