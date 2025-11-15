'use client';

import { useState } from 'react';
import { ArrowUpDown } from 'lucide-react';

interface FilterOption {
  label: string;
  value: string;
  checked: boolean;
}

interface TodoFilterProps {
  filters: FilterOption[];
  onFilterChange: (value: string, checked: boolean) => void;
}

export default function TodoFilter({ filters, onFilterChange }: TodoFilterProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* Filter Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-3 h-10 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
      >
        <ArrowUpDown className="w-4 h-4 text-gray-600" />
        <span className="text-gray-700 font-medium">Filter By</span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown Content */}
          <div className="absolute right-0 top-full mt-0 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-20 py-2">
            {/* Date Label */}
            <div className="mx-4 py-2 text-sm font-semibold border-b border-gray-300 text-gray-500">
              Date
            </div>

            {/* Filter Options */}
            {filters.map((filter) => (
              <label
                key={filter.value}
                className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={filter.checked}
                  onChange={(e) => onFilterChange(filter.value, e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-gray-700 text-sm">{filter.label}</span>
              </label>
            ))}
          </div>
        </>
      )}
    </div>
  );
}