import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { addTodoApi, deleteTodoApi, getTodoList, updateTodoApi } from "./api"
import { showToast } from "@/lib/toast"

export const useTodoList = (options?: { enabled?: boolean }) => {
  return useQuery({
    queryKey: ['todoList'],
    queryFn: getTodoList,
    enabled: options?.enabled ?? true,
    initialData: [],
  })
}


export const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteTodoApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todoList"] });
      showToast.success("Task deleted successfully!");
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || error?.response?.data?.error || "Failed to delete task. Please try again.";
      showToast.error(errorMessage);
    },
  });
};

export const useAddTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: FormData) => {
      return addTodoApi(data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todoList"] });
      showToast.success("Task added successfully!");
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || error?.response?.data?.error || "Failed to add task. Please try again.";
      showToast.error(errorMessage);
    },
  });
};

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: FormData }) => {
      return updateTodoApi(id, data);
    },
    onSuccess: (data, variables) => {

      queryClient.invalidateQueries({ queryKey: ["todoList"] });

      const formData = variables.data;
      const isPositionUpdate = formData.has('position') &&
        formData.get('title') !== undefined;

      if (!isPositionUpdate) {
        showToast.success("Task updated successfully!");
      }
    },
    onError: (error: any, variables) => {
      console.error('Update mutation error for task:', variables.id, error);
      const errorMessage = error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        "Failed to update task. Please try again.";
      console.error('Error message:', errorMessage);
      showToast.error('Failed to update task. Please try again.');
    },
  });
};