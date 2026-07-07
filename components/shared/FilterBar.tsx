"use client";

import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface FilterOption {
  id: string;
  label: string;
}

interface FilterBarProps {
  onSearch?: (query: string) => void;
  filters?: FilterOption[];
  onFilterChange?: (selected: string[]) => void;
  placeholder?: string;
  className?: string;
}

export function FilterBar({
  onSearch,
  filters = [],
  onFilterChange,
  placeholder = 'Search...',
  className = ''
}: FilterBarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch?.(value);
  };

  const handleFilterToggle = (filterId: string) => {
    const updated = selectedFilters.includes(filterId)
      ? selectedFilters.filter(id => id !== filterId)
      : [...selectedFilters, filterId];
    setSelectedFilters(updated);
    onFilterChange?.(updated);
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedFilters([]);
    onSearch?.('');
    onFilterChange?.([]);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="relative group max-w-md">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
        <Input
          type="text"
          placeholder={placeholder}
          value={searchQuery}
          onChange={handleSearch}
          className="pl-10 h-11 bg-white border-slate-200 shadow-sm focus-visible:ring-indigo-500 focus-visible:border-indigo-500 transition-all rounded-xl"
        />
      </div>

      {filters.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          {filters.map(filter => {
            const isActive = selectedFilters.includes(filter.id);
            return (
              <button
                key={filter.id}
                onClick={() => handleFilterToggle(filter.id)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-md shadow-slate-900/10'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900 shadow-sm'
                }`}
              >
                {filter.label}
              </button>
            );
          })}
          
          {(searchQuery || selectedFilters.length > 0) && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearFilters}
              className="ml-2 text-slate-500 hover:text-slate-900 rounded-full h-8 px-3 text-xs font-semibold uppercase tracking-wider"
            >
              <X className="w-3.5 h-3.5 mr-1.5" />
              Clear All
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
