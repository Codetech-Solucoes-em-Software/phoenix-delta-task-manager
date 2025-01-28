export interface IUserAuth {
  id: number | undefined;
  name: string;
  email: string;
  degree?: string;
  role?: string;
  token?: string;
}