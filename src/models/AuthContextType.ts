import { IUserAuth } from "../interfaces/IUserAuth";

export type AuthContextType = {
  user: IUserAuth | null;
  login: (userData: { user: IUserAuth} ) => void;
  logout: () => void;
}
