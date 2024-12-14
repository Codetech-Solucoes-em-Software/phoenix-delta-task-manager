import { IUserAuth } from "../interfaces/IUserAuth";

export type AuthContextType = {
  role?: string;
  user: IUserAuth | null;
  login: (userData: IUserAuth) => void;
  logout: () => void;
}
