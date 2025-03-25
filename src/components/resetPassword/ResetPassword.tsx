import React, { useState } from 'react';
import { styles } from './styles';
import { changePassword } from '../../services/UserService';
import { useAuth } from '../../context/AuthContext';

interface PropsResetPassword {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResetPassword({ isOpen, onClose }: PropsResetPassword) {
  const { user } = useAuth();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: any) => {
    if (!user) return null;
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError('As senhas não coincidem!');
      return;
    }
    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      await changePassword(user.id, currentPassword, newPassword);
      setSuccess("Senha alterada com sucesso!");
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modalContent}>
        <h2>Alterar Senha</h2>
        <form onSubmit={handleSubmit}>
          {error && <p style={{ color: "red" }}>{error}</p>}
          {success && <p style={{ color: "green" }}>{success}</p>}
          <div style={styles.formGroup}>
            <label>Senha Atual</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label>Nova Senha</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label>Confirmar Nova Senha</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div style={styles.buttonGroup}>
            <button onClick={onClose} style={styles.cancelButton}>
              Cancelar
            </button>
            <button type="submit" style={styles.submitButton} disabled={loading} >
              {loading ? "Alterando..." : "Alterar Senha"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
