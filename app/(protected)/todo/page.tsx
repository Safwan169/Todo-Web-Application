'use client';
import { useState } from 'react';
import TodoHeader from './components/TodoHeader';
import TodoSearch from './components/TodoSearch';
import TodoFilter from './components/TodoFilter';
import TodoEmptyState from './components/TodoEmptyState';
import { TaskList } from './components/TodoCard';


export default function TodoPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState([
    { label: 'Deadline Today', value: 'today', checked: false },
    { label: 'Expires in 5 days', value: '5days', checked: false },
    { label: 'Expires in 10 days', value: '10days', checked: false },
    { label: 'Expires in 30 days', value: '30days', checked: false },
  ]);


  const todos = []; 

  const handleNewTask = () => {
    
    console.log('Opening new task form...');
  };

  const handleSearch = () => {
    console.log('Searching for:', searchQuery);
  
  };

  const handleFilterChange = (value: string, checked: boolean) => {
    setFilters(filters.map(f => 
      f.value === value ? { ...f, checked } : f
    ));
    console.log('Filter changed:', value, checked);
  };

  return (
    <div className="min-h-screen  p-6">
      <div className=" mx-auto">
        {/* Header */}
        <TodoHeader onNewTask={handleNewTask} />

        {/* Search and Filter Bar */}
        <div className="flex items-center gap-4 mb-6">
          <TodoSearch
            value={searchQuery}
            onChange={setSearchQuery}
            onSearch={handleSearch}
          />
          <TodoFilter
            filters={filters}
            onFilterChange={handleFilterChange}
          />
        </div>

        {/* Content Area */}
        <div className=" min-h-[500px] ">
          {todos.length === 1 ? (
            <TodoEmptyState />
          ) : (
            <div className='bg-transparent'>
           <TaskList/>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}