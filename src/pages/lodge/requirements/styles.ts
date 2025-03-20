export const styles = {
  container: {

  },
  requirementsTable: {},
  requirementsCol: {

  },
  dateCol: {
    display: 'flex',
    justifyContent: 'center' as 'center',
    alignItems: 'flex-end' 
  },
  
  requirementsRow: {
    display: 'grid',
    gridTemplateColumns: '1.5fr 1.5fr 1fr 1fr 1fr 1fr 1fr',
    marginTop: 15,
    alignItems: 'center'
  },
  tableHeader: {
    display: 'grid',
    gridTemplateColumns: '1.5fr 1.5fr 1fr 1fr 1fr 1fr 1fr',
    borderBottom: '1px solid #ccc',
    paddingBottom: '5px',
    fontWeight: 'bold',
    marginTop: 20
  },
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
}