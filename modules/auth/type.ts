export type User = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  profile_image?: string;
  address?: string;
  contact_number?: string;
  birthday?: string;
  bio?: string;

};

export type AuthContextType = {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  todoList:any
};
