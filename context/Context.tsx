"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { AuthContextType, User } from "@/modules/auth/type";
import { useTodoList } from "@/modules/todo/hooks";

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [todoList, setTodoList] = useState<any[]>([]);

  useEffect(() => {
    const storedUser = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Error parsing user from localStorage:', e);
      }
    }
    setLoading(false);
  }, []);

  const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
  const shouldFetchTodos = !!token && !!user && !loading;
  const {data} = useTodoList({ enabled: shouldFetchTodos });
  
  useEffect(()=>{
    if (data) {
      if (Array.isArray(data)) {
        setTodoList(data);
      } else if (data?.results && Array.isArray(data.results)) {
        setTodoList(data.results);
      } else {
        setTodoList([]);
      }
    } else {
      setTodoList([]);
    }
  },[data])



  return (
    <AuthContext.Provider value={{ user, loading, setUser, todoList }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuthContext must be used within AuthProvider");
  return ctx;
};
