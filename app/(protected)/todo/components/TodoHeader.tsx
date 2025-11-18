'use client';
import AddTaskModal from '@/components/ui/modal';
import { useAddTodo } from '@/modules/todo/hooks';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { TaskFormData } from '@/modules/todo/types';

interface TodoHeaderProps {
  onNewTask: () => void;
}


export default function TodoHeader({ onNewTask }: TodoHeaderProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const {mutateAsync} = useAddTodo();
    
    const handleSubmit = async (data: TaskFormData) => {
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('todo_date', data.date);
        formData.append('priority', data.priority);
        formData.append('description', data.description);
        
        await mutateAsync(formData);
        setIsModalOpen(false);
        onNewTask();
    };
  return (
    <div className="flex items-center justify-between mb-6">
      {/* Title */}
    <div className="flex flex-col gap-1">
        <h1 className="text-4xl font-bold text-gray-900">Todos</h1>
      <span className='bg-primary h-0.5 mx-1 w-16'></span>
    </div>

      {/* New Task Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="flex items-center  gap-2 px-3 py-2 bg-primary hover:bg-blue-700 text-white font-normal text-[16px] rounded-lg transition-colors shadow-sm"
      >
        <Plus className="w-4 h-4" />
        New Task
      </button>
        <AddTaskModal
        title="Add New Task"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
      />
    </div>
  );
}