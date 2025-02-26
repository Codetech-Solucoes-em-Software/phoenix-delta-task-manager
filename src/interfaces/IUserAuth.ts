export interface IUserAuth {
  id: number;
  lodge_id: number;
  name: string;
  cim: string;
  degree: string;
  role: string;
  token?: string;
}