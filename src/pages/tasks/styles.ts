export const styles = {
  container: {
    display: 'flex' as 'flex',
    flexDirection: 'column' as 'column',
    justifyContent: 'center' as 'center',
    alignItems: 'center' as 'center'
  }, 
  containerPage: {
    display: 'flex' as 'flex',
    flexDirection: 'column' as 'column',
    width: 1000,
    height: 110,
    justifyContent: 'center' as 'center',
    alignItems: 'center' as 'center',
    backgroundColor: '#232323' as string,
    border: 'none' as 'none',
    borderRadius: 14,
    padding: 20,
    gap: 6
  },
  registerWindow: {
    display: 'flex' as 'flex', 
    gap: 14
  },
  input: {
    width: 300,
    height: 30,
    paddingLeft: 8,
    border: 'none' as 'none',
    borderRadius: 10,
    outline: 'none' as 'none'
  },
  button: {
    width: 300, 
    height: 35,
    backgroundColor: 'black' as 'black', 
    border: 'none' as 'none',
    borderRadius: 14, 
    cursor: 'pointer' as 'pointer', 
    color: 'white' as 'white', 
    padding: 5, 
    marginTop: 5
  },
  listTask: {
    width: 1000,
    height: 170,
    backgroundColor: '#232323' as string,
    border: 'none' as 'none',
    borderRadius: 14,
    padding: 20,
    gap: 6
  },
  containerTitle: {
    display: 'flex' as 'flex',
    width: '100%',
    height: 40,
    alignItems: 'start' as 'start',
    justifyContent: 'center' as 'center',
    marginBottom: 20

  },
  title: {
    display: 'flex' as 'flex',
    justifyContent: 'center' as 'center',
    alignItems: 'start' as 'start',
    fontSize: 20,
    color: '#f5f5f5' as string,
  },
  task: {
    display: 'flex' as 'flex',
    justifyContent: 'space-evenly' as 'space-evenly',
    alignItems: 'center' as 'center',
    width: 1000,
    height: 50,
    backgroundColor: '#323232' as string,
    border: 'none' as 'none',
    borderRadius: 14,
    color: '#f5f5f5' as string,
    gap: 10,
    marginTop: 10
  }
};