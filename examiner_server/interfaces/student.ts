export interface Student {
  name: string;
  rollno: string;
  password: string;
  email?: string;
  isLoggedIn: boolean;
  standard?: number;
}
