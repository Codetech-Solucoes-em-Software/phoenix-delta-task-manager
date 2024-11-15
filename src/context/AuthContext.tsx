import { ReactNode, createContext, useContext, useState } from "react";
import { UserRole } from "../enums/UserRole";
import { User } from "../models/User";
import { AuthContextType } from "../models/AuthContextType";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (userData: User) => { 
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