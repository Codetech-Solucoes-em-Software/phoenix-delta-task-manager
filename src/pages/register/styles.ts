export const styles = {
  container: {
    display: 'flex' as 'flex'
  },
  logo: {
    width: '100%',
    height: '100vh'
  },
  registerForm: {
    display: 'flex' as 'flex',
    flexDirection: 'column' as 'column',
    justifyContent: 'center' as 'center',
    alignItems: 'center' as 'center',
    gap: 8,
    padding: 20
  },
  input: {
    width: 350,
    height: 30,
    paddingLeft: 7,
    borderRadius: 10,
    border: 'none' as 'none',
    outline: 'none' as 'none',
    backgroundColor: '#535353' as string,
    color: '#f5f5f5' as string
  },
  button: {
    width: 350,
    height: 30,
    backgroundColor: '#252525' as string,
    border: 'none' as 'none',
    borderRadius: 10,
    ':hover': {
      backgroundColor: '#121212' as string
    }
  }
};