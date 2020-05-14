export interface User {
  email: string;
  password: string;
  name?: string;
  // for firebase expired token field
  returnSecureToken?: boolean;
}
