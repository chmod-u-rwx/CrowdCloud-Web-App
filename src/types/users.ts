export type UserRole = "individual" | "company";

export interface User {
  user_id: string; //UUID as string
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone_number: string;
  role: UserRole;
  company_name?: string;
  company_address?: string;
}

export interface UserCreate {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  role: UserRole;
  password: string;
  confirm_password: string;
  company_name?: string;
  company_address?: string;
}

export interface UserAuth {
  access_token: string;
  token_type: string;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  user_id: string;
  role: UserRole;
  company_name?: string;
  company_address?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface UserUpdate {
  first_name?: string;
  last_name?: string;
  username?: string;
  email?: string;
  password?: string;
}