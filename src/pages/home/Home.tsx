import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { styles }from './styles';
import useDocumentTitle from '../../hooks/PageTitle';
import { useAuth } from '../../context/AuthContext';

export default function Home() {
  useDocumentTitle('Home');
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  return (
    <div style={styles.container}>
      {/* Cabeçalho */}
      <div style={styles.header}>
        <h1 style={{ marginBottom: '10px', textAlign: 'center' }}>Menu da Evolução</h1>
        <div style={styles.headerInfo}>
          <div style={styles.inputGroup}>
            <label style={styles.inputGroupLabel}>Nome:</label>
            <input
              type="text"
              value={user?.name}
              readOnly
              style={styles.inputGroupInput}
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.inputGroupLabel}>Grau:</label>
            <input
              type="text"
              value={user?.degree}
              readOnly
              style={styles.inputGroupInput}
            />
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
      <div style={{ 
        display: 'flex',
        justifyContent: 'center' 
      }}>
        <button
          onClick={handleLogout}
          style={{
            display: 'flex',
            marginTop: '10px',
            padding: '10px 20px',
            backgroundColor: '#d9534f',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};