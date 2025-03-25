export const styles = {
  container: {
    display: 'flex' as 'flex',
    flexDirection: 'column' as 'column',
    justifyContent: 'center' as 'center',
    alignItems: 'center' as 'center',
    marginTop: 50
  },
  header: {
    display: 'flex' as 'flex',
    justifyContent: 'center' as 'center',
    alignItems: 'center' as 'center',
    marginBottom: '20px',
    headerTitle: {
      marginBottom: '20px'
    }
  },
  form: {
    container: {
      display: 'flex' as 'flex',
      flexDirection: 'column' as 'column',
      justifyContent: 'center' as 'center',
      alignItems: 'center' as 'center',
      width: 500,
      height: 400
    },
    inputContainer: {
      display: 'flex' as 'flex',
      flexDirection: 'column' as 'column',
      gap: 6,
      marginTop: 6,
      input: {
        width: 250,
        height: 35,
        border: 'none' as 'none',
        borderRadius: 6,
        outline: 'none' as 'none',
        backgroundColor: '#ccc' as string,
        paddingLeft: 6
      }
    },
    buttonContainer: {
      display: 'flex' as 'flex',
      gap: 10,
      marginTop: 35,
      button: {
        width: 150,
        height: 35,
        border: 'none' as 'none',
        borderRadius: 6,
        cursor: 'pointer' as 'pointer'
      }
    }
  }
};