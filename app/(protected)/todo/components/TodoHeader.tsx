'use client';
import AddTaskModal from '@/components/ui/modal';
import { Plus } from 'lucide-react';
import { useState } from 'react';

interface TodoHeaderProps {
  onNewTask: () => void;
}


export default function TodoHeader({ onNewTask }: TodoHeaderProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = async (data: any) => {
    console.log('Form Data:', data);
    // Call your API here
    // await createTask(data);
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
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
      />
    </div>
  );
}