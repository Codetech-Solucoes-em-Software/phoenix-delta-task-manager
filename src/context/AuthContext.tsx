import { ReactNode, createContext, useContext, useState } from "react";
import { UserRole } from "../enums/UserRole";

export type User = {
  id?: string;
  name?: string;
  degree?: string;
  lodge?: string;
  email?: string;
  password?: string;
  role?: string;
  token?: string;
  refreshToken?: string;
}

type AuthContextType = {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}

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