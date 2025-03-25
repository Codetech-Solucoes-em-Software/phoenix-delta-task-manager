import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import useDocumentTitle from "../../../hooks/PageTitle";
import { styles } from "./styles";
import { MdOutlineArrowBackIos } from 'react-icons/md';
import ResetPassword from "../../../components/resetPassword/ResetPassword";
import { useState } from "react";

export default function Profile() {
  useDocumentTitle('Perfil');
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  if(!user) {return null};
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h3 style={styles.header.headerTitle}>Perfil do Usuário</h3>
      </div>
      <div>
        <form action="" method="get" style={styles.form.container}>
          <div style={styles.form.inputContainer}>
            <label htmlFor="Nome">Nome</label>
            <input style={styles.form.inputContainer.input} type="text" name="name" id="" value={user.name} readOnly/>
          </div>
          <div style={styles.form.inputContainer}>
            <label htmlFor="cim">CIM</label>
            <input style={styles.form.inputContainer.input} type="text" name="cim" id="" value={user.cim} readOnly/>
          </div>
          <div style={styles.form.inputContainer}>
            <label htmlFor="">E-mail</label>
            <input style={styles.form.inputContainer.input} type="text" name="name" id="" readOnly/>
          </div>
          <div style={styles.form.inputContainer}>
            <label htmlFor="">Grau</label>
            <input style={styles.form.inputContainer.input} type="text" name="name" id="" value={user.degree} readOnly />
          </div>
          <div style={styles.form.buttonContainer}>
            <div>
              <button onClick={() => user.role === 'ADMIN' ? navigate('/admin') : navigate('/home')} style={styles.form.buttonContainer.button}>{<MdOutlineArrowBackIos />}</button>
            </div>
            <div>
              <button type="button" onClick={() => setIsModalOpen(true)} style={styles.form.buttonContainer.button}>Alterar Senha</button>
            </div>
          </div>
        </form>
        {/* Modal de Alteração de Senha */}
        <ResetPassword isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
    </div>
  )
}