export type User = {
  id?: string;
  lodge_id?: number;
  cim?: string;
  name?: string;
  email?: string;
  password?: string;
  degree?: string;
  role?: string;
  created_at: string;
  token?: string;
  refreshToken?: string;
}