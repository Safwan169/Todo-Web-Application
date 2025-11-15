import TaskCard from '@/components/ui/card';

import { useState } from 'react';

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Backend Infrastructure',
      description: 'Upgrading backend infrastructure for better performance',
      dueDate: '2025-04-15',
      priority: 'extreme',
    },
    {
      id: '2',
      title: 'Mobile App Redesign',
      description: 'Redesigning the mobile app interface for better user experience',
      dueDate: '2025-03-25',
      priority: 'moderate',
    },
    {
      id: '3',
      title: 'Analytics Dashboard',
      description: 'Creating a new analytics dashboard for clients',
      dueDate: '2025-03-30',
      priority: 'low',
    },
    {
      id: '4',
      title: 'Analytics Dashboard',
      description: 'Creating a new analytics dashboard for clients',
      dueDate: '2025-03-30',
      priority: 'low',
    },
  ]);

  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);

  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    setDraggedTaskId(taskId);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', e.currentTarget.innerHTML);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, dropTaskId: string) => {
    e.preventDefault();
    
    if (!draggedTaskId || draggedTaskId === dropTaskId) {
      setDraggedTaskId(null);
      return;
    }

    const draggedIndex = tasks.findIndex(t => t.id === draggedTaskId);
    const dropIndex = tasks.findIndex(t => t.id === dropTaskId);

    const newTasks = [...tasks];
    const [draggedTask] = newTasks.splice(draggedIndex, 1);
    newTasks.splice(dropIndex, 0, draggedTask);

    setTasks(newTasks);
    setDraggedTaskId(null);
  };

  const handleDragEnd = () => {
    setDraggedTaskId(null);
  };

  const handleEdit = (task: Task) => {
    console.log('Edit task:', task);
  };

  const handleDelete = (taskId: string) => {
    setTasks(tasks.filter(t => t.id !== taskId));
  };

  return (
    <div className="p-6  min-h-screen">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Tasks</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            draggable
            onDragStart={(e) => handleDragStart(e, task.id)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, task.id)}
            onDragEnd={handleDragEnd}
          >
            <TaskCard
              task={task}
              onEdit={handleEdit}
              onDelete={handleDelete}
              isDragging={draggedTaskId === task.id}
            />
          </div>
        ))}
      </div>

      {/* Drop Indicator */}
      {draggedTaskId && (
        <div className="fixed bottom-4 right-4 bg-primary text-white px-4 py-2 rounded-lg shadow-lg text-sm font-medium">
          Drag to reorder tasks
        </div>
      )}
    </div>
  );
}