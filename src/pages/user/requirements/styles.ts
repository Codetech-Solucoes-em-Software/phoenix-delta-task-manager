export const styles = {
  container: {

  },
  requirementsTable: {},
  requirementsCol: {

  },
  dateCol: {},
  
  requirementsRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr 1fr',
    marginTop: 15
  },
  tableHeader: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr 1fr',
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
  uploadButton: {
    padding: "8px 12px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "4px",
    textAlign: "center" as const,
    fontSize: "14px",
    transition: "0.3s",
    cursor: "pointer",
    width: 110
  },
}