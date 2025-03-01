import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import useDocumentTitle from "../../../hooks/PageTitle";
import { useEffect, useState } from "react";
import { styles } from "./styles";
import { getRequirements } from "../../../services/LodgeService";

interface LodgeRequirementsProps {
  filter: "user" | "expected_date";
}

interface Requirement {
  id: number;
  lodge_id: number; // Corrigido de store_id para lodge_id
  status: string;
  is_voucher: boolean;
  user: {
    id: number;
    name: string;
  },
  requirements: {
    name: string;
    expected_date: string;
    approved_date: string;
  }
}

export default function LodgeRequirements({ filter }: LodgeRequirementsProps) {
  useDocumentTitle("Requisitos");
  const { user } = useAuth();
  const navigate = useNavigate();
  const [requirements, setRequirements] = useState<Requirement[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user || !user.lodge_id) return;

    const fetchRequirements = async () => {
      setLoading(true);
      try {
        if (isNaN(Number(user.lodge_id))) {
          throw new Error("lodge_id inválido: " + user.lodge_id);
        }
        const data: any = await getRequirements(user.lodge_id, filter);
        console.log(data);
        const formattedData = Array.isArray(data) ? data : [data]; 
        console.log(formattedData)
        // Verifica se a resposta é um array, se não, define como um array vazio
        setRequirements(formattedData);
      } catch (error) {
        console.error("Erro ao buscar requisitos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequirements();
  }, [user, filter]);

  const getStatusColor = (status: string) => {
    switch(status) {
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

  return (
    <div style={styles.container}>
      {loading ? (
        <p style={{ textAlign: "center", marginTop: 20 }}>Carregando requisitos...</p>
      ) : requirements.length === 0 ? (
        <p style={{ textAlign: "center", marginTop: 20 }}>
          Nenhum requisito encontrado.
        </p>
      ) : (
        <div style={styles.requirementsTable}>
          <div style={styles.tableHeader}>
            <div style={styles.requirementsCol}>Requisito</div>
            <div style={styles.requirementsCol}>Usuário</div>
            <div style={styles.dateCol}>Data Prevista</div>
            <div style={styles.dateCol}>Data Entrega</div>
            <div style={styles.statusCol}>Situação</div>
          </div>
          {requirements.map((item) => (
            <div key={`${item.id}-${item.lodge_id}`} style={styles.requirementsRow}>
              <div style={styles.requirementsCol}>{item.requirements.name}</div>
              <div style={styles.requirementsCol}>{item.user.name}</div>
              <div style={styles.dateCol}>{new Date(item.requirements.expected_date).toLocaleDateString()}</div>
              <div style={styles.dateCol}>{item.requirements.approved_date ? new Date(item.requirements.approved_date).toLocaleDateString() : ""}</div>
              <div style={{ ...styles.statusCol, color: getStatusColor(item.status)}}>
                {item.status}                
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
