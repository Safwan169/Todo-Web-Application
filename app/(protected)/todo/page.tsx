// app/(protected)/todo/page.tsx

'use client';

import { useState } from 'react';
import TodoHeader from './components/TodoHeader';
import TodoSearch from './components/TodoSearch';
import TodoFilter from './components/TodoFilter';
import TodoEmptyState from './components/TodoEmptyState';
// import TodoList from './components/TodoList'; // You already have this

export default function TodoPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState([
    { label: 'Deadline Today', value: 'today', checked: false },
    { label: 'Expires in 5 days', value: '5days', checked: false },
    { label: 'Expires in 10 days', value: '10days', checked: false },
    { label: 'Expires in 30 days', value: '30days', checked: false },
  ]);

  // Your todos data (replace with actual data from API/state)
  const todos = []; // Empty for now to show empty state

  const handleNewTask = () => {
    // Open modal or navigate to create task
    console.log('Opening new task form...');
  };

  const handleSearch = () => {
    console.log('Searching for:', searchQuery);
    // Implement search logic here
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
        <div className="bg-white rounded-xl border border-gray-200 min-h-[500px] p-6">
          {todos.length === 0 ? (
            <TodoEmptyState />
          ) : (
            <div>
              {/* Your TodoList component will go here */}
              {/* <TodoList todos={todos} /> */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}