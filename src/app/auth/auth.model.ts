export interface RegisterUser {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

export interface AuthToken {
  token: string;
}

export interface User {
  email: string;
  password: string;
}
