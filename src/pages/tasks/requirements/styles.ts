export const styles = {
  container: {
    fontFamily: 'sans-serif' as 'sans-serif',
    width: '85%' as string,
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
  headerTitInfo: {
    display: 'flex' as 'flex',
    alignItems: 'center' as 'center'
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
    gridTemplateColumns: '1.75fr 0.75fr 0.85fr 0.85fr 0.60fr 0.85fr',
    borderBottom: '1px solid #ccc',
    paddingBottom: '5px',
    fontWeight: 'bold',
  },
  instructionRow: {
    display: 'grid',
    gridTemplateColumns: '2fr 0.85fr 0.85fr 0.85fr 1fr 0.35fr 0.5fr',
    padding: '10px 0',
  },
  instructionRowUser: {
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
  actions: {
    padding: '5px',
    textAlign: 'center' as 'center',
    marginRight: 25
  },
  statusBadge: {
    display: 'inline-block',
    padding: '5px 10px',
    borderRadius: '5px',
    fontWeight: 'bold',
  },
  statusBadgeConcluido: {
    width: 140,
    backgroundColor: '#2ecc71',
    color: 'white' as 'white',
    textAlign: 'center' as 'center'
  },
  statusBadgeRevisar: {
    width: 140,
    backgroundColor: '#f1c40f',
    color: 'white',
    textAlign: 'center' as 'center'
  },
  statusBadgeAguardando: {
    width: 140,
    backgroundColor: '#e74c3c',
    color: 'white',
    textAlign: 'center' as 'center'
  },
  uploadButton: {
    padding: '5px' as string,
    marginTop: '5px' as string,
    width: 120,
    height: 35,
    backgroundColor: '#3498db',
    color: 'white' as 'white',
    border: 'none' as 'none',
    borderRadius: '3px',
    cursor: 'pointer' as string,
    textAlign: 'center' as 'center'
  },
  addInstructionButton: {
    padding: '10px' as string,
    marginTop: '10px' as string,
    width: 200,
    backgroundColor: '#3498db',
    color: 'white' as 'white',
    border: 'none' as 'none',
    borderRadius: '3px',
    cursor: 'pointer' as string,
    textAlign: 'center' as 'center'
  },
  updateInstructionButton: {
    //padding: '5px',
    marginTop: '5px',
    width: 50,
    height: 35,
    backgroundColor: '#2ecc71',
    color: 'white',
    border: 'none',
    borderRadius: '3px',
    cursor: 'pointer',
    textAlign: 'center' as 'center',
    alignItems: 'center' as 'center'
  },
  removeInstructionButton: {
    padding: '5px',
    marginTop: '5px',
    width: 50,
    backgroundColor: '#e74c3c',
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
