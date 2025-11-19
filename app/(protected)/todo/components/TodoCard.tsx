import TaskCard from '@/components/ui/card';
import AddTaskModal from '@/components/ui/modal';
import { useDeleteTodo, useUpdateTodo } from '@/modules/todo/hooks';
import ConfirmDialog from '@/components/ui/confirm-dialog';
import { Task, TaskFormData } from '@/modules/todo/types';
import { showToast } from '@/lib/toast';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

export const TaskList: React.FC<any> = ({ data }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);

  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);

  const { mutateAsync: deleteTodo } = useDeleteTodo();
  const { mutateAsync: updateTodo } = useUpdateTodo();
  const queryClient = useQueryClient();

  // initial sort
  useEffect(() => {
    if (!data) return;

    const sorted = [...data].sort((a, b) => {
      const posA = a.position ?? 999999;
      const posB = b.position ?? 999999;
      return posA - posB;
    });

    setTasks(sorted);
  }, [data]);

  // Drag start
  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    setDraggedTaskId(taskId);
    e.dataTransfer.effectAllowed = 'move';
  };

  // Drag over - just prevent default
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  // Drop - simple position update
  const handleDrop = async (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    
    if (!draggedTaskId) return;

    try {
      const draggedIndex = tasks.findIndex(task => task.id === draggedTaskId);
      if (draggedIndex === -1 || draggedIndex === dropIndex) return;

      const newTasks = [...tasks];
      const [movedTask] = newTasks.splice(draggedIndex, 1);
      newTasks.splice(dropIndex, 0, movedTask);
      setTasks(newTasks);

      const newPosition = dropIndex + 1;
      
      const form = new FormData();
      form.append("position", String(newPosition));

      await updateTodo({ id: draggedTaskId, data: form });

      showToast.success("Task reordered successfully");

    } catch (error) {
      console.error('Reorder failed:', error);
      showToast.error("Failed to reorder task");
      queryClient.invalidateQueries({ queryKey: ["todoList"] });
    }

    setDraggedTaskId(null);
  };

  // edit
  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleUpdateTask = async (formData: TaskFormData) => {
    if (!editingTask) return;

    try {
      const fd = new FormData();
      fd.append("title", formData.title);
      fd.append("todo_date", formData.date);
      fd.append("priority", formData.priority);
      fd.append("description", formData.description);
      fd.append("position", String(editingTask.position ?? 0));

      await updateTodo({ id: editingTask.id, data: fd });

      showToast.success("Updated Todo successfully");
      setIsModalOpen(false);
      setEditingTask(null);
    } catch {
      showToast.error("Update failed");
    }
  };

  // delete
  const handleDeleteConfirm = async () => {
    if (!taskToDelete) return;

    try {
      await deleteTodo(taskToDelete);
      showToast.success("Deleted Todo successfully");
      setDeleteConfirmOpen(false);
      setTaskToDelete(null);
    } catch {
      showToast.error("Delete failed");
    }
  };

  return (
    <div className="p-6 min-h-screen">

      {/* modal */}
      <AddTaskModal
        key={editingTask?.id}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Update Task"
        onSubmit={handleUpdateTask}
        initialData={
          editingTask
            ? {
                title: editingTask.title,
                date: editingTask.todo_date,
                priority: editingTask.priority as "extreme" | "moderate" | "low",
                description: editingTask.description,
              }
            : undefined
        }
      />

      <ConfirmDialog
        isOpen={deleteConfirmOpen}
        onClose={() => {
          setDeleteConfirmOpen(false);
          setTaskToDelete(null);
        }}
        onConfirm={handleDeleteConfirm}
        title="Delete Task"
        message="Are you sure you want to delete this task? This action cannot be undone."
      />

      <h2 className="text-[18px]  text-[#0C0C0C] font-bold mb-6">Your Tasks</h2>

      <div className="flex flex-wrap gap-4">
        {tasks.map((task, index) => (
          <div
            key={task.id}
            draggable
            onDragStart={(e) => handleDragStart(e, task.id)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, index)}
            className={`transition-opacity ${
              draggedTaskId === task.id ? 'opacity-50' : 'opacity-100'
            }`}
          >
            <TaskCard
              task={task}
              onEdit={() => handleEdit(task)}
              onDelete={() => {
                setTaskToDelete(task.id);
                setDeleteConfirmOpen(true);
              }}
            />
          </div>
        ))}
        
        {tasks.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No tasks found. Create your first task!
          </div>
        )}
      </div>
    </div>
  );
};