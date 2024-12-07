export const styles = {
  container: {
    display: 'flex' as 'flex'
  },
  logo: {
    width: '100%',
    height: '100vh'
  },
  logoHeaderLogin: {
    width: 100,
    height: 100,
    border: 'none' as 'none',
    borderRadius: '50%',
    marginBottom: 20
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
    backgroundColor: '#EEF6F0' as string,
    color: '#000000' as string
  },
  button: {
    width: 350,
    height: 30,
    backgroundColor: '#415DBB' as string,
    border: 'none' as 'none',
    borderRadius: 10,
    ':hover': {
      backgroundColor: '##173187' as string
    }
  }
};