import React, { useState } from 'react';
import logoLojas from '../../../assets/logo-lojas-2.png';
import { styles } from './styles'; 

interface Instruction {
  id: number;
  userId: number;
  name: string;
  expected_date: string;
  finished_date: string;
  approved_date: string;
  status: string;
}

// Definição dos estilos como um objeto JavaScript

export default function Instructions() {
  // Estado para as instruções
  const [instructions, setInstructions] = useState<Instruction[]>([
    {
      id: 1, userId: 1, name: 'Resenha da 1°', expected_date: '01/01/2001', finished_date: '01/01/2001', status: 'CONCLUIDO',
      approved_date: ''
    },
    {
      id: 2, userId: 1, name: 'Resenha da 2°', expected_date: '01/01/2001', finished_date: '01/01/2001', status: 'REVISAR',
      approved_date: ''
    },
  ]);

  // Função para adicionar uma nova linha de instrução
  const addInstructionLine = () => {
    const newId = instructions.length > 0 ? instructions[instructions.length - 1].id + 1 : 1;
    setInstructions([...instructions, {
      id: newId,
      userId: 1,
      name: `Resenha da ${newId}°`,
      expected_date: '',
      finished_date: '',
      approved_date: '',
      status: ''
    }]);
  };

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
          <div style={styles.instructionsCol}>Instruções Clássicas</div>
          <div style={styles.dateCol}>Data Prevista:</div>
          <div style={styles.dateCol}>Data de Entrega:</div>
          <div style={styles.uploadCol}></div>
          <div style={styles.statusCol}>Situação:</div>
        </div>
        {instructions.map((item) => (
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

      <button style={styles.addInstructionButton} onClick={addInstructionLine}>Adicionar Instrução</button>
    </div>
  );
}