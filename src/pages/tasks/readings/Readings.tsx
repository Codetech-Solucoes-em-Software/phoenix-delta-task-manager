import React, { useEffect, useState } from 'react';
import logoLojas from '../../../assets/logo-lojas-2.png';
import { styles } from './styles';
import useDocumentTitle from '../../../hooks/PageTitle';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { getReadings } from '../../../services/ReadingsService';

interface Reading {
  id: number;
  userId: number;
  name: string;
  expected_date: string;
  finished_date: string;
  approved_date: string;
  status: string;
}

// Definição dos estilos como um objeto JavaScript

export default function Readings() {
  useDocumentTitle('Leituras Complementares');
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [readings, setReadings] = useState<Reading[]>([]);

  useEffect(() => {
    if (!user) return;

    setLoading(true);

    getReadings(user.role, user.id)
      .then((data: any) => {
        if (user.role === "ADMIN") {
          setReadings(Array.isArray(data.classicalLessons) ? data.classicalLessons : []);
        } else {
          // Garante que `data.lessonsUser` seja um array ou um array vazio
          const userInstructions = Array.isArray(data.lessonsUser)
            ? data.lessonsUser
            : data.lessonsUser
              ? [data.lessonsUser]
              : [];

          setReadings(userInstructions);
        }
      })
      .catch((error) => {
        console.error("🚨 Erro ao buscar instruções:", error);
        setReadings([]); // Garante que `instructions` seja sempre um array
      })
      .finally(() => setLoading(false));
  }, [user]);


  // Função para gerar as classes de status badge
  const getStatusBadgeClasses = (status: string) => {
    switch (status) {
      case 'CONCLUIDO':
        return { ...styles.statusBadge, ...styles.statusBadgeConcluido };
      case 'REVISAR':
        return { ...styles.statusBadge, ...styles.statusBadgeRevisar }
      case 'AGUARDANDO':
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
            <input type="text" value="Fulano de Tal" readOnly style={styles.inputGroupInput} />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.inputGroupLabel}>Grau:</label>
            <input type="text" value="XYZ" readOnly style={styles.inputGroupInput} />
          </div>
          <img src={logoLojas} style={styles.headerImage} />
        </div>
      </div>

      {/* Tabela de Instruções */}
      <div style={styles.instructionsTable}>
        <div style={styles.tableHeader}>
          <div style={styles.instructionsCol}>Leituras Complementares</div>
          <div style={styles.dateCol}>Data Prevista:</div>
          <div style={styles.dateCol}>Data de Entrega:</div>
          <div style={styles.uploadCol}></div>
          <div style={styles.statusCol}>Situação:</div>
        </div>
        {readings.map((item) => (
          <div key={item.userId} style={styles.instructionRow}>
            <div style={styles.instructionsCol}>
              <p style={styles.instructionsColP}>
                {item.name}
              </p>

            </div>
            <div style={styles.dateCol}>
              <input type="text" value={item.expected_date} readOnly style={styles.dateColInput} />
            </div>
            <div style={styles.dateCol}>
              <input type="text" value={item.approved_date} readOnly style={styles.dateColInput} />
            </div>
            <div style={styles.uploadCol}>
              <button style={styles.uploadColButton}>Upload</button>
            </div>
            <div style={styles.statusCol}>
              <span style={getStatusBadgeClasses(item.status)}>{item.status}</span>
            </div>
          </div>
        ))}
      </div>

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