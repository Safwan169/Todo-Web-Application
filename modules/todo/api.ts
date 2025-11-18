import axiosInstance from "@/lib/axios";

export const getTodoList = async () => {
 const res = await axiosInstance.get("/todos/");
 return res.data;
};


export const deleteTodoApi = async (id: string) => {
  const res = await axiosInstance.delete(`/todos/${id}/`);
  return res.data;
}

export const addTodoApi = async (data: FormData) => {
  const res = await axiosInstance.post("/todos/", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
}

export const updateTodoApi = async (id: string, data: FormData) => {
  try {
 
    
    const formDataEntries: Record<string, string> = {};
    for (const [key, value] of data.entries()) {
      formDataEntries[key] = typeof value === 'string' ? value : value.name || 'File';
    }
        
    let hasFiles = false;
    for (const value of data.values()) {
      if (value instanceof File) {
        hasFiles = true;
        break;
      }
    }
    
    const res = await axiosInstance.patch(`/todos/${id}/`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    
    return res.data;
  } catch (error: any) {
    console.error('Update API error:', error);
    console.error('Error response:', error?.response?.data);
    throw error;
  }
}