import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getInstructionById, updateInstruction } from "../../../../services/InstructionsService";
import { useAuth } from "../../../../context/AuthContext";
import useDocumentTitle from "../../../../hooks/PageTitle";
import { styles } from "./styles";

export default function UpdateInstruction() {
  useDocumentTitle("Editar Instrução");

  const { id } = useParams();
  console.log('Parâmetros da rota: ', useParams()); 
  const navigate = useNavigate();
  const { user } = useAuth();
  const [instruction, setInstruction] = useState({
    id: 0,
    userId: 0,
    name: "",
    expected_date: "",
    status: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const isFetched = useRef(false);

  console.log('Buscar a instrução clássica do usuário')
  useEffect(() => {
    if (isFetched.current) return;
    isFetched.current = true;

    console.log("Buscando instrução clássica do usuário", id);

    const parsedId = parseInt(id as string, 10);
    if (isNaN(parsedId)) {
      console.error("🚨 ID inválido para busca:", id);
      return;
    }

    getInstructionById(parsedId)
      .then((data: any) => {
        console.log("✅ Instrução carregada com sucesso", data.lesson);
        setInstruction(data.lesson);
      })
      .catch((error: any) => {
        console.error("🚨 Erro ao carregar instrução:", error);
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setInstruction({ ...instruction, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      await updateInstruction(instruction.id,instruction);
      alert("Instrução atualizada com sucesso!");
      navigate("/instructions");
    } catch (error) {
      console.error("🚨 Erro ao atualizar instrução:", error);
      alert("Erro ao atualizar instrução.");
    } finally {
      setSaving(false);
    }
  };

  // if (loading) return <p>Carregando...</p>;

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Editar Instrução</h2>
      <form style={styles.form} onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label style={styles.label}>
            Nome da Instrução:
          </label>
          <input type="text" name="name" value={instruction.name} onChange={handleChange} required style={styles.input} />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>
            Data Esperada de Finalização:
          </label>
          <input type="date" name="expected_date" value={instruction.expected_date} onChange={handleChange} required style={styles.input} />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Status:</label>
            <select name="status" value={instruction.status} onChange={handleChange} required style={styles.input}>
              <option value="PENDENTE">Pendente</option>
              <option value="CONCLUIDO">Concluído</option>
              <option value="REVISAR">Revisar</option>
              <option value="AGUARDANDO">Aguardando</option>
            </select>
        </div>
        <div style={styles.buttonGroup}>
          <button type="submit" disabled={saving} style={styles.button}>
            {saving ? "Salvando..." : "Salvar Alterações"}
          </button>
          <button style={styles.button} type="button" onClick={() => navigate("/instructions")}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
