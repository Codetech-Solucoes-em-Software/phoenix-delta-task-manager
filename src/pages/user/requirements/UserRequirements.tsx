import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import useDocumentTitle from "../../../hooks/PageTitle";
import { useEffect, useState } from "react";
import { styles } from "./styles";
import UploadModal from "../../../components/modalUpload/UploadModal";
import { getUserRequirements } from "../../../services/InstructionsService";
import React from "react";
interface LodgeRequirementsProps {
  filter: "expected_date";
}

interface UserRequirement {
  id: number;
  user_id: number;
  requirement_id: number;
  lodge_id: number;
  status: string;
  finished_date: string | null;
  approved_date: string | null;
  voucher_id?: number | null;
  expected_date: string;
  name: string;
  user_name: string;
  requirements_type: string;
  is_voucher: boolean;
}

export default function UserRequirements({ filter }: LodgeRequirementsProps) {
  useDocumentTitle("Requisitos");
  const { user } = useAuth();
  const navigate = useNavigate();
  const [userRequirements, setUserRequirements] = useState<UserRequirement[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedRequirementId, setSelectedRequirementId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!user || !user.lodge_id) return;

    const fetchRequirements = async () => {
      setLoading(true);
      try {
        const data: any = await getUserRequirements(user.id);
        const formattedData: any = Array.isArray(data) ? data : [data];

        // Se o usuário for "USER", filtramos apenas os requisitos que pertencem a ele

        setUserRequirements(formattedData);
      } catch (error) {
        console.error("Erro ao buscar requisitos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequirements();
  }, [user, filter]);

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
  };

  return (
    <div style={styles.container}>
      {loading ? (
        <p style={{ textAlign: "center", marginTop: 20 }}>Carregando requisitos...</p>
      ) : userRequirements.length === 0 ? (
        <p style={{ textAlign: "center", marginTop: 20 }}>Nenhum requisito encontrado.</p>
      ) : (
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
          {userRequirements.map((item) => (
            <div key={`${item.id}-${item.lodge_id}`} style={styles.requirementsRow}>
              <div style={styles.requirementsCol}>{item.name}</div>
              <div style={styles.requirementsCol}>{item.user_name}</div>
              <div style={styles.dateCol}>
                {new Date(item.expected_date).toLocaleDateString()}
              </div>
              <div style={styles.dateCol}>
                {item.finished_date
                  ? new Date(item.finished_date).toLocaleDateString()
                  : ""}
              </div>
              <div style={{ ...styles.statusCol, color: getStatusColor(item.status) }}>
                {item.status}
              </div>
              {/* Botão para Upload do Comprovante */}
              <div style={styles.requirementsCol}>
                <button
                  style={{
                    ...styles.uploadButton,
                    opacity: item.status === "PENDENTE" && item.is_voucher ? 1 : 0.5,
                    cursor: item.status === "PENDENTE" && item.is_voucher ? "pointer" : "not-allowed",
                    textAlign: "center" as const,
                  }}
                  disabled={!(item.status === "PENDENTE" && item.is_voucher)} 
                  onClick={() => {
                    if (item.status === "PENDENTE" && item.is_voucher) {
                      setSelectedRequirementId(item.id);
                      setIsModalOpen(true);
                    }
                  }}
                >
                  Upload
                </button>
              </div>
              <div>{item.requirements_type}</div>
            </div>
          ))}
          {/* Modal para Upload do Comprovante */}
          {isModalOpen && selectedRequirementId && (
            <UploadModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              requirementId={selectedRequirementId}
            />
          )}
        </div>
      )}
    </div>
  );
}
