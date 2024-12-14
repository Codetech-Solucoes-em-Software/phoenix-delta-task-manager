export interface IUserAuth {
  id: number | undefined;
  name: string | undefined;
  email: string | undefined;
  degree?: string | undefined;
  role?: string;
  token?: string;
}