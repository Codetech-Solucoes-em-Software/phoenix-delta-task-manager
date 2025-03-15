import { useAuth } from "../../../context/AuthContext";
import useDocumentTitle from "../../../hooks/PageTitle";
import { useEffect, useState } from "react";
import { styles } from "./styles";
import { getRequirements } from "../../../services/LodgeService";
import DownloadModal from "../../../components/modalDownload/DownloadModal";

interface LodgeRequirementsProps {
  filter: "user" | "expected_date";
}

interface Requirement {
  id: number;
  lodge_id: number;
  status: string;
  is_voucher: boolean;
  voucher_id: number;
  user: {
    id: number;
    name: string;
  };
  requirements: {
    name: string;
    expected_date: string;
    approved_date: string;
    requirements_type: string;
  };
}

export default function LodgeRequirements({ filter }: LodgeRequirementsProps) {
  useDocumentTitle("Requisitos");
  const { user } = useAuth();
  const [requirements, setRequirements] = useState<Requirement[]>([]);
  const [loading, setLoading] = useState(false);
  const [expandedUsers, setExpandedUsers] = useState<number[]>([]);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [selectedDownloadRequirementId, setSelectedDownloadRequirementId] = useState<number | null>(null);
  const [selectedVoucherId, setSelectedVoucherId] = useState<number | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDENTE":
        return "red";
      case "ENTREGUE":
        return "orange";
      case "CONCLUÍDO":
        return "green";
      default:
        return "black";
    }
  }

  useEffect(() => {
    if (!user || !user.lodge_id) return;

    const fetchRequirements = async () => {
      setLoading(true);
      try {
        const data: any = await getRequirements(user.lodge_id, filter);
        const formattedData = Array.isArray(data) ? data : [data];
        setRequirements(formattedData);
      } catch (error) {
        console.error("Erro ao buscar requisitos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequirements();
  }, [user, filter]);

  const toggleUserExpand = (userId: number) => {
    setExpandedUsers((prev) =>
      prev.includes(userId) ? prev.filter(id => id !== userId) : [...prev, userId]
    );
  };

  if (loading) {
    return <p style={{ textAlign: "center", marginTop: 20 }}>Carregando requisitos...</p>;
  }

  if (requirements.length === 0) {
    return <p style={{ textAlign: "center", marginTop: 20 }}>Nenhum requisito encontrado.</p>;
  }

  if (filter === "user") {
    const groupedRequirements = requirements.reduce((acc, req) => {
      const userId = req.user.id;
      if (!acc[userId]) {
        acc[userId] = { user: req.user, requirements: [] };
      }
      acc[userId].requirements.push(req);
      return acc;
    }, {} as Record<number, { user: { id: number; name: string }; requirements: Requirement[] }>);

    const sortedUsers = Object.values(groupedRequirements).sort((a, b) => a.user.name.localeCompare(b.user.name));

    return (
      <div style={styles.container}>
        {sortedUsers.map(({ user, requirements }) => (
          <div key={user.id} style={{ 
            marginBottom: 15, 
            border: "1px solid #ccc", 
            borderRadius: 8, 
            padding: 10, 
            backgroundColor: "#f9f9f9" 
          }}>
            <h3 
              style={{ marginBottom: 15, border: "1px solid #ccc", borderRadius: 8, padding: 10, backgroundColor: "#f9f9f9" }}
              onClick={() => toggleUserExpand(user.id)}
            >
              {user.name}
            </h3>
            {expandedUsers.includes(user.id) && (
              <div style={styles.requirementsTable}>
                <div style={styles.tableHeader}>
                  <div style={styles.requirementsCol}>Requisito</div>
                  <div style={styles.requirementsCol}>Usuário</div>
                  <div style={styles.dateCol}>Data Prevista</div>
                  <div style={styles.dateCol}>Data Entrega</div>
                  <div style={styles.statusCol}>Situação</div>
                  <div style={styles.requirementsCol}>Comprovante</div>
                  <div style={styles.requirementsCol}>Grau</div>
                </div>
                {requirements.map((item) => (
                  <div key={item.id} style={styles.requirementsRow}>
                    <div style={styles.requirementsCol}>{item.requirements.name}</div>
                    <div style={styles.requirementsCol}>{item.user.name}</div>
                    <div style={styles.dateCol}>{new Date(item.requirements.expected_date).toLocaleDateString()}</div>
                    <div style={styles.dateCol}>{new Date(item.requirements.approved_date).toLocaleDateString()}</div>
                    <div style={{...styles.statusCol, color: item.status === 'ENTREGUE' ? 'green' : 'red'}}>{item.status}</div>
                    <div style={styles.requirementsCol}>
                      {item.status === "ENTREGUE" && item.voucher_id ? (
                        <button
                          style={{
                            ...styles.downloadButton,
                            backgroundColor: "#007bff",
                            color: "white",
                            textAlign: 'center'
                          }}
                          onClick={() => {
                            setSelectedDownloadRequirementId(item.id);
                            setSelectedVoucherId(item.voucher_id);
                            setIsDownloadModalOpen(true);
                          }}
                        >
                          Download
                        </button>
                      ) : (
                        <span style={{ color: "#888" }}>Sem comprovante</span>
                      )}
                    </div>
                    <div style={styles.requirementsCol}>{item.requirements.requirements_type}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.requirementsTable}>
        <div style={styles.tableHeader}>
          <div style={styles.requirementsCol}>Requisito</div>
          <div style={styles.requirementsCol}>Usuário</div>
          <div style={styles.dateCol}>Data Prevista</div>
          <div style={styles.dateCol}>Data Entrega</div>
          <div style={styles.statusCol}>Situação</div>
          <div style={styles.requirementsCol}>Comprovante</div>
          <div style={styles.requirementsCol}>Grau</div>
        </div>
        {requirements.map((item) => (
          <div key={item.id} style={styles.requirementsRow}>
            <div style={styles.requirementsCol}>{item.requirements.name}</div>
            <div style={styles.requirementsCol}>{item.user.name}</div>
            <div style={{...styles.dateCol, alignSelf: 'end'}}>{new Date(item.requirements.expected_date).toLocaleDateString()}</div>
            <div style={styles.dateCol}>{new Date(item.requirements.approved_date).toLocaleDateString()}</div>
            <div style={{...styles.statusCol, color: getStatusColor(item.status)}}>{item.status}</div>
            {/* Exibe o botão "Download" com estilo condicional */}
              {/* Botão para Download do Comprovante */}
              <div style={styles.requirementsCol}>
                {item.status === "ENTREGUE" && item.voucher_id ? (
                  <button
                    style={{
                      ...styles.downloadButton,
                      opacity: 1,
                      cursor: "pointer",
                      backgroundColor: "#007bff",
                      color: "white",
                      textAlign: 'center'
                    }}
                    onClick={() => {
                      setSelectedDownloadRequirementId(item.id);
                      setSelectedVoucherId(item.voucher_id);
                      setIsDownloadModalOpen(true);
                    }}
                  >
                    Download
                  </button>
                ) : (
                  <span style={{ color: "#888" }}>Sem comprovante</span>
                )}
              </div>
              <div>{item.requirements.requirements_type}</div>
          </div>
        ))}
          {/* Aqui é onde o modal será renderizado */}
          {isDownloadModalOpen &&
          selectedVoucherId && selectedDownloadRequirementId && (
            <DownloadModal
              isOpen={isDownloadModalOpen}
              onClose={() => setIsDownloadModalOpen(false)}
              voucher_id={selectedVoucherId}
            />
          )}
      </div>
    </div>
  );
}
