import { User } from "./User";

export type AuthContextType = {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}
