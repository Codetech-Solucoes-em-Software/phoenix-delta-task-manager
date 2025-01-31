export interface IUserAuth {
  id: number;
  name: string;
  email: string;
  degree: string;
  role: string;
  token?: string;
}