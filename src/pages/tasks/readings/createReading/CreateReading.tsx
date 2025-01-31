import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createInstruction } from '../../../../services/InstructionsService';
import { getAllUsers } from '../../../../services/UserService';
import { styles } from './styles';
import { useAuth } from '../../../../context/AuthContext';
import { IUserAuth } from '../../../../interfaces/IUserAuth';
import useDocumentTitle from '../../../../hooks/PageTitle';

export default function CreateReading() {
  useDocumentTitle('Adicionar Leitura')
  const { user } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [expectedDate, setExpectedDate] = useState('');
  const [userId, setUserId] = useState<number | "">("");
  const [users, setUsers] = useState<IUserAuth[]>([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        if (user) {
          const response: any = await getAllUsers();
          console.log("Resposta da API:", response);

          // Verifica se response.data existe e é um array
          if (response && Array.isArray(response)) {
            setUsers(response); // Definindo diretamente o array
          } else if (response && response.data && Array.isArray(response.data)) {
            setUsers(response.data);
          } else {
            console.error("Formato inesperado da resposta:", response);
            setUsers([]); // Garante que users nunca seja undefined
          }
        }
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
        setUsers([]);
      }
    }
    fetchUsers();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !expectedDate || !userId) {
      alert('Preencha todos os campos!');
      return;
    }

    try {
      await createInstruction({
        name,
        expected_date: expectedDate,
        status: 'PENDENTE',
        userId,
      });
      alert('Leitura criada com sucesso!');
      navigate('/admin');
    } catch (error) {
      console.error('Erro ao criar a leitura:', error);
      alert('Erro ao criar leitura. Tente novamente.');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Criar Nova Instrução</h2>
      <form style={styles.form} onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Nome da Leitura:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Data Esperada de Finalização:</label>
          <input
            type="date"
            value={expectedDate}
            onChange={(e) => setExpectedDate(e.target.value)}
            style={styles.input}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Atribuir para:</label>
          <select
            value={userId}
            onChange={(e) => setUserId(Number(e.target.value))}
            style={styles.input}
            required
          >
            <option value="">Selecione um usuário</option>
            {users.length > 0 ? (
              users.map((user) => (
                <option key={user.id} value={user.id}>{user.name}</option>
              ))
            ) : (
              <option disabled>Carregando usuários...</option>
            )}
          </select>
        </div>

        <div style={styles.buttonGroup}>
          <button type="submit" style={styles.button}>Adicionar Leitura</button>
          <button type="button" style={styles.button} onClick={() => navigate('/admin')}>Voltar</button>
        </div>
      </form>
    </div>
  );
}
