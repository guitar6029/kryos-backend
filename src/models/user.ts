export type User = {
  id: number;
  name: string;
  email: string;
  passsword_hash: string;
  created_at: Date;
  updated_at: Date;
};

export type SafeUser = {
  id: number;
  name: string;
  email: string;
  created_at: Date;
  updated_at: Date;
};
