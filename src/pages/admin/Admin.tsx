import React from 'react';
import { Link } from 'react-router-dom';
import { styles } from './styles';
import useDocumentTitle from '../../hooks/PageTitle';

export default function Admin() {
  useDocumentTitle('Dashboard');
  return (
    <div style={styles.container}>
      {/* Cabeçalho */}
      <div style={styles.header}>
        <h1 style={{marginBottom: '10px', textAlign: 'center'}}>Administração do Sistema</h1>
        <div style={styles.headerInfo}>
          <div style={styles.inputGroup}>
            <label style={styles.inputGroupLabel}>Nome:</label>
            <input type="text" value="Fulano de Tal" readOnly style={styles.inputGroupInput} />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.inputGroupLabel}>Grau:</label>
            <input type="text" value="XYZ" readOnly style={styles.inputGroupInput}/>
          </div>
        </div>
      </div>
      <div style={styles.dashboard}>
        <ul style={styles.linkList}>
          <li style={styles.linkItem}>
            <Link to="/instructions" style={styles.linkButton}>Instruções Clássicas</Link>
          </li>
          <li style={styles.linkItem}>
            <Link to="/visitations" style={styles.linkButton}>Visitas Lojas e Entidades</Link>
          </li>
          <li style={styles.linkItem}>
            <Link to="/readings" style={styles.linkButton}>Leituras Complementares</Link>
          </li>
          <li style={styles.linkItem}>
            <Link to="/completionWorks" style={styles.linkButton}>Trabalhos de Conclusão</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};