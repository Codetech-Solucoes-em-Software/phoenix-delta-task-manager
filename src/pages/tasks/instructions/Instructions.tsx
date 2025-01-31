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
  approved_date: string;
  status: string;
}

export default function Instructions() {
  useDocumentTitle('Instruções Clássicas');
  const { user } = useAuth();
  const [instructions, setInstructions] = useState<Instruction[]>([]);
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (user) {
      getInstructions(user.role, user.id)
        .then((data: any) => {
          console.log("📌 Instruções carregadas:", data);
          setInstructions(data.classicalLessons);
        })
        .catch((error: any) => console.error("🚨 Erro ao buscar instruções:", error))
        .finally(() => setLoading(false));
    }
  }, [user]);

  if (!user) {
    return <p style={{ textAlign: "center", marginTop: 20 }}>Carregando usuário...</p>;
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileData: any = e.target.files?.[0];
    if (fileData) {
      setFile(fileData);
      handleUpload(fileData);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  }

  const handleUpload = async (file: File) => {
    if (file) {
      try {
        const result = await uploadFile(file, user.id); // Chama a função da service
        console.log('Arquivo enviado com sucesso:', result);
      } catch (error) {
        console.error('Erro ao enviar o arquivo:', error);
      }
    } else {
      console.error('Nenhum arquivo selecionado');
    }
  };


  const getStatusBadgeClasses = (status: string) => {
    switch (status) {
      case 'CONCLUIDO':
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
      {/* Cabeçalho */}
      <div style={styles.header}>
        <h1 style={styles.headerTitle}>A sua Jornada do Conhecimento começa aqui:</h1>
        <div style={styles.headerInfo}>
          <div style={styles.inputGroup}>
            <label style={styles.inputGroupLabel}>Nome:</label>
            <input type="text" value={user?.name ?? ""} readOnly style={styles.inputGroupInput} />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.inputGroupLabel}>Grau:</label>
            <input type="text" value={user?.degree ?? ""} readOnly style={styles.inputGroupInput} />
          </div>
          <img src={logoLojas} style={styles.headerImage} />
        </div>
      </div>

      {/* Mensagem de carregamento */}
      {loading ? (
        <p style={{ textAlign: "center", marginTop: 20 }}>Carregando instruções...</p>
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
            {instructions.length > 0 ? (
              instructions.map((item) => (
                <div key={item.id} style={styles.instructionRow}>
                  <div style={styles.instructionsCol}>
                    <p style={styles.instructionsColP}>{item.name}</p>
                  </div>
                  <div style={styles.dateCol}>
                    <input
                      type="text"
                      value={item.expected_date ? new Date(item.expected_date).toLocaleDateString() : ""}
                      readOnly
                      style={styles.dateColInput}
                    />
                  </div>
                  <div style={styles.dateCol}>
                    <input
                      type="text"
                      value={item.finished_date ? new Date(item.finished_date).toLocaleDateString() : ""}
                      readOnly
                      style={styles.dateColInput}
                    />
                  </div>
                  <div style={styles.uploadCol}>
                    <button style={styles.uploadColButton} onClick={handleButtonClick}>Upload</button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      style={{ display: 'none' }}
                      onChange={handleFileChange}
                    />
                  </div>
                  <div style={styles.statusCol}>
                    <span style={getStatusBadgeClasses(item.status)}>{item.status}</span>
                  </div>
                </div>
              ))
            ) : (
              <p style={{ textAlign: "center", marginTop: 20 }}>Nenhuma instrução encontrada.</p>
            )}
          </div>
        </>
      )}

      <div style={styles.buttonContainer}>
        <li style={styles.addInstructionButton}>
          <Link to="/admin" style={{ color: "white", textDecoration: "none" }}>Voltar</Link>
        </li>
        {user?.role === "ADMIN" && (
          <li style={styles.addInstructionButton}>
            <button
              onClick={() => navigate("/admin/createInstruction")}
              style={{ color: "white", textDecoration: "none", border: "none", background: "transparent", cursor: "pointer" }}
            >
              Adicionar Instrução
            </button>
          </li>
        )}
      </div>
    </div>
  );
}
