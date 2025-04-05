export const styles = {
  container: {
    display: 'flex' as 'flex',
    width: '100%' as const,
    height: '100vh' as const,
    flexDirection: 'column' as 'column'
  },
  form: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    justifyContent: 'center' as 'center',
    alignItems: 'center' as 'center',
    width: '65%' as const,
    height: '65%' as const,
    margin: '0 auto' as const,
    marginTop: 40,
    backgroundColor: '#F0ECF3' as const,
    border: 'none' as 'none',
    borderRadius: 6
  },
  inputContainer: {
    display: 'flex' as const, 
    flexDirection: 'column' as const,
    gap: 6,
    marginBottom: 30,
  },
  input: {
    width: 350,
    height: 35,
    border: 'none' as 'none',
    borderRadius: 6,
    backgroundColor: '#f5f5f5' as const,
    paddingLeft: 5,
    outline: 'none' as 'none'
  },
  button: {
    width: 350,
    height: 35,
    border: 'none' as 'none',
    borderRadius: 6,
    outline: 'none' as 'none',
    cursor: 'pointer' as 'pointer',
    backgroundColor: '#93BCC6' as const
  },
  buttonContainer: {
    display: 'flex' as 'flex',
    gap: 10,
    marginTop: 20,
    paddingLeft: 20,
    button: {
      width: 35,
      height: 35,
      border: 'none' as 'none',
      borderRadius: '50%' as const,
      cursor: 'pointer' as 'pointer'
    }
  }
};