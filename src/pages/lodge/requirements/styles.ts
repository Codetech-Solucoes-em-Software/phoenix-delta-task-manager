export const styles = {
  container: {

  },
  requirementsTable: {},
  requirementsCol: {
    minWidth: '150px'
  },
  dateCol: {
    display: 'flex',
    justifyContent: 'center' as 'center',
    alignItems: 'flex-end' 
  },
  requirementsRow: {
    display: 'grid',
    gridTemplateColumns: 'minmax(250px, 1.5fr) repeat(7, minmax(70px, 1fr))', // 8 colunas (1.5fr + 7x1fr)
    gap: '4px', // Reduzi um pouco o gap para garantir o espaço
    marginTop: 15,
    alignItems: 'start',
    width: '100%',
    overflow: 'hidden', // Evita qualquer quebra
  },
  tableHeader: {
    display: 'grid',
    gridTemplateColumns: 'minmax(250px, 1.5fr) repeat(7, minmax(70px, 1fr))', // 8 colunas
    gap: '4px',
    borderBottom: '1px solid #ccc',
    padding: '10px 0',
    fontWeight: 'bold',
    marginTop: 20,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    width: '100%',
    overflow: 'hidden'
  },
  
  /*requirementsRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 0.5fr 0.5fr 0.5fr 0.5fr 0.5fr 0.5fr',
    gap: '6px',
    marginTop: 15
  },
  tableHeader: {
    display: 'grid',
    gridTemplateColumns: '1fr 0.5fr 0.5fr 0.5fr 0.5fr 0.5fr 0.5fr',
    gap: '6px',
    borderBottom: '1px solid #ccc',
    paddingBottom: '5px',
    fontWeight: 'bold',
    marginTop: 20
  }, */
  statusCol: {
    width: 150,
    border: 'none',
    borderRadius: 6
  },
  downloadButton: {
    padding: "10px 20px",
    backgroundColor: "#4CAF50", // Cor verde para o botão
    color: "white",
    border: "none",
    borderRadius: "5px",
    textAlign: "center",
    fontSize: "14px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  userContainer: {
    backgrounndColor: '#ccc',
    border: 'none' as 'none',
    borderRadius: 6
  }
}; 

/* export const styles = {
  container: {
    padding: '10px',
    width: '100vw',
    maxWidth: '1366px',
    margin: '0 auto',
    overflowX: 'auto' as const,
    boxSizing: 'border-box' as const,
  },
  requirementsTable: {
    width: '100%',
    display: 'grid',
    gridTemplateColumns: 'repeat(8, 1fr)', // 8 colunas iguais
    gap: '8px',
  },
  requirementsCol: {
    padding: '10px 8px',
    whiteSpace: 'nowrap' as const,
    overflow: 'hidden',
    textOverflow: 'ellipsis' as const,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.85rem',
    minWidth: '0', // Permite que o texto seja truncado
  },
  dateCol: {
    padding: '10px 5px',
    display: 'flex',
    justifyContent: 'center' as const,
    alignItems: 'center',
    whiteSpace: 'nowrap' as const,
    fontSize: '0.85rem',
  },
  requirementsRow: {
    display: 'contents', // Faz com que os filhos diretos participem do grid pai
    '& > div': {
      backgroundColor: '#f9f9f9',
      padding: '10px 8px',
      borderRadius: '4px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }
  },
  tableHeader: {
    display: 'contents',
    '& > div': {
      backgroundColor: '#f2f2f2',
      padding: '12px 8px',
      fontWeight: 'bold',
      position: 'sticky' as const,
      top: '0',
      zIndex: '1',
    }
  },
  statusCol: {
    padding: '8px 5px',
    textAlign: 'center' as const,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '0.85rem',
  },
  downloadButton: {
    padding: '6px 8px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '0.8rem',
    cursor: 'pointer',
    whiteSpace: 'nowrap' as const,
    width: '100%',
    maxWidth: '90px',
    margin: '0 auto',
  },
  userContainer: {
    gridColumn: '1 / -1', // Ocupa todas as colunas
    backgroundColor: '#f0f0f0',
    borderRadius: '8px',
    padding: '12px',
    margin: '8px 0',
  }
}; */
