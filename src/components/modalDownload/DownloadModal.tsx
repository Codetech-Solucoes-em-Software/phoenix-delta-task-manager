import React, { useState } from 'react'
import { styles } from './styles';
import { downloadVoucher } from '../../services/FileService';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  voucher_id: number;
}

const DownloadModal = ({ isOpen, onClose, voucher_id }: DownloadModalProps) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isHoveredCancel, setIsHoveredCancel] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      await downloadVoucher(voucher_id);
    } catch (error) {
      console.error("Erro ao baixar comprovante:", error);
    } finally {
      setIsDownloading(false);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h3 style={{ textAlign: 'center'}}>Download do Comprovante</h3>
        <p style={{ marginTop: 20 }}>Deseja baixar o comprovante deste requisito?</p>
        <div style={styles.buttonContainer}>
          <button style={{
            ...styles.cancelButton,
            backgroundColor: isHoveredCancel ? "red" : "darkred",}} 
            onClick={onClose}
            onMouseEnter={() => setIsHoveredCancel(true)}
            onMouseLeave={() => setIsHoveredCancel(false)}
            disabled={isDownloading}>
            Cancelar
          </button>
          <button style={{
            ...styles.downloadButton,
            backgroundColor: isHovered ? 'blue' : '#007bff',
            border: 'none',
            borderRadius: 6,
            color: 'white'
          }} onClick={handleDownload} 
             onMouseEnter={() => setIsHovered(true)}
             onMouseLeave={() => setIsHovered(false)}
              disabled={isDownloading}>
            {isDownloading ? "Baixando..." : "Baixar Comprovante"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DownloadModal