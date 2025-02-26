export const styles = {
  container: {
    fontFamily: 'sans-serif' as 'sans-serif',
    width: '80%' as string,
    margin: '20px auto' as string,
    //border: '1px solid #ccc' as string,
    padding: '20px' as '20px',
    boxSizing: 'border-box' as 'border-box',
  },
  header: {
    marginBottom: '20px',
  },
  headerTitle: {
    marginBottom: '10px',
  },
  headerInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  },
  inputGroup: {
    display: 'flex' as 'flex',
    flexDirection: 'column' as 'column',
    marginRight: '20px' as string,
  },
  inputGroupLabel: {
    marginBottom: '5px'
  },
  inputGroupInput: {
    padding: '5px',
    border: '1px solid #ccc',
    borderRadius: '3px',
  },
  headerImage: {
    width: '170px',
    height: '170px',
    // border: '1px solid #ccc',
    borderRadius: '5px',
    marginLeft: '20rem'
  },
  instructionsTable: {
    width: '100%',
  },
  tableHeader: {
    display: 'grid',
    gridTemplateColumns: '3fr 1fr 1fr 1fr 1fr',
    borderBottom: '1px solid #ccc',
    paddingBottom: '5px',
    fontWeight: 'bold',
  },
  instructionRow: {
    display: 'grid',
    gridTemplateColumns: '3fr 1fr 1fr 1fr 1fr',
    padding: '10px 0',
  },
  instructionsCol: {
    padding: '5px',
  },
  instructionsColP: {
    margin: '0',
  },
  dateCol: {
    padding: '5px',
  },
  dateColInput: {
    width: '100px',
    padding: '5px',
    border: '1px solid #ccc',
  },
  uploadCol: {
    padding: '5px',
  },
  uploadColButton: {
    width: 130,
    height: 35,
    padding: '4px 12px',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  statusCol: {
    padding: '5px',
  },
  statusBadge: {
    width: 140,
    display: 'inline-block',
    padding: '5px 10px',
    borderRadius: '5px',
    fontWeight: 'bold',
    textAlign: 'center' as 'center'
  },
  statusBadgeConcluido: {
    backgroundColor: '#2ecc71',
    color: 'white',
  },
  statusBadgeRevisar: {
    backgroundColor: '#f1c40f',
    color: 'white',
  },
  statusBadgeAguardando: {
    backgroundColor: '#e74c3c',
    color: 'white',
  },
  addInstructionButton: {
    padding: '10px',
    marginTop: '10px',
    width: 200,
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '3px',
    cursor: 'pointer',
    textAlign: 'center' as 'center'
  },
  headerLogos: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '10px',
  },
  headerLogo: {
    width: '70px',
    height: '70px',
    borderRadius: '50%',
  },
  buttonContainer: {
    display: 'flex' as 'flex',
    gap: 15
  }
};
