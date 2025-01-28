import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { AuthContextType } from "../models/AuthContextType";
import { IUserAuth } from "../interfaces/IUserAuth";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUserAuth | null>(null);

  // Restaurar sessão ao carregar a aplicação
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser: IUserAuth = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Erro ao restaurar usuário:", error);
        localStorage.removeItem("user"); // Evita erros futuros
      }
    }
  }, []);

  const login = (userData: { user: IUserAuth }) => {
    setUser(userData.user);
    localStorage.setItem('user', JSON.stringify(userData.user));
  };

  const logout = () => { 
    setUser(null);
    localStorage.removeItem('user');
  }  

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}