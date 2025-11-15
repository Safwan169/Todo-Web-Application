// app/(protected)/todo/components/TodoSearch.tsx

import { Search } from 'lucide-react';

interface TodoSearchProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
}

export default function TodoSearch({ value, onChange, onSearch }: TodoSearchProps) {
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div className="flex items-center  gap-3 flex-1">
      <div className="relative flex-1">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Search your task here..."
          className="w-full text-xs text-[#4B5563] font-semibold bg-tertiary px-4 py-3 pr-12 border  border-[#D1D5DB] rounded-lg focus:outline-none   placeholder-[#4B5563]"
        />
         <button
        onClick={onSearch}
        className="flex absolute right-0 top-0 items-center justify-center w-10 h-full bg-primary hover:bg-blue-700 text-white rounded-lg transition-colors shadow-sm"
      >
        <Search className="w-4 h-4" />
      </button>
      </div>
      
     
    </div>
  );
}