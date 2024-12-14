import { ReactNode, createContext, useContext, useState } from "react";
import { AuthContextType } from "../models/AuthContextType";
import { IUserAuth } from "../interfaces/IUserAuth";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUserAuth | null>(null);

  const login = (userData: IUserAuth) => { 
    setUser(userData);
    window.alert('Login realizado com sucesso'); 
  };
  const logout = () => setUser(null);

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