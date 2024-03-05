export interface UserData {
  user: User | null;
}

export interface User {
  id: string;
  userEmail: string;
  userName: string;
  userNumber: string;
}
