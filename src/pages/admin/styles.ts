export const styles = {
  container: {
    fontFamily: 'sans-serif' as 'sans-serif',
    width: '80%',
    margin: '20px auto',
    border: '1px solid #ccc',
    padding: '20px',
    boxSizing: 'border-box' as 'border-box',
  },
  header: {
    marginBottom: '20px',
  },
  headerInfo: {
    display: 'flex',
    justifyContent: 'center' as 'center',
    alignItems: 'center' as 'center',
    gap: '20px',
  },
  inputGroup: {
    display: 'flex' as 'flex',
    flexDirection: 'column' as 'column',
    marginRight: '20px' as string,
  },
  inputGroupLabel: {
    marginBottom: '5px',
  },
  inputGroupInput: {
    padding: '5px',
    border: '1px solid #ccc',
    borderRadius: '3px',
  },
  headerImage: {
    width: '150px',
    height: '150px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  dashboard: {
    display: 'flex' as 'flex',
    flexDirection: 'column' as 'column',
    alignItems: 'center' as 'center',
  },
  dashboardTitle: {
    marginBottom: '20px',
  },
  linkList: {
    listStyle: 'none' as 'none',
    padding: 0,
    display: 'flex' as 'flex',
    flexDirection: 'row' as 'row',
    alignItems: 'center' as 'center',
    justifyContent: 'center' as 'center',
    gap: 10,
    marginTop: 30
  },
  linkItem: {
    marginBottom: '10px',
  },
  linkButton: {
    padding: '10px 20px',
    width: 250,
    backgroundColor: '#3498db',
    color: 'white' as 'none',
    textDecoration: 'none' as 'none',
    borderRadius: '5px',
  },
};