import { CSSProperties } from "react";

export const styles: { [key: string]: CSSProperties } = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Fundo escuro semi-transparente
    backdropFilter: "blur(5px)", // Efeito de desfoque no fundo
    display: "flex" as "flex",
    alignItems: "center" as "center",
    justifyContent: "center" as "center",
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  modal: {
    display: 'flex' as 'flex',
    flexDirection: 'column' as 'column',
    justifyContent: 'center' as 'center',
    alignItems: 'center' as 'center',
    backgroundColor: "white",
    width: "400px",
    height: "350px",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
    outline: "none",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
  },
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    gap: 10,
    marginTop: 20, 
    padding: 10
  },
  buttonDownload: {
    width: 100,
    height: 35,
    border: "none",
    borderRadius: 6,
    color: "white",
    cursor: "pointer",
  },
  cancelButton: {
    width: 100,
    height: 35,
    border: "none",
    borderRadius: 6,
    color: "white",
    cursor: "pointer",
  }
};
