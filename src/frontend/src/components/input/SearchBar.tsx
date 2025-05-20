import React, { useState } from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <div className="absolute top-8 left-1/2 -translate-x-1/2 w-96">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            onSearch(e.target.value);
          }}
          placeholder="Search stages or artifacts..."
          className="w-full bg-black/30 backdrop-blur-sm text-white placeholder-white/50 rounded-full px-5 py-3 pl-12 pr-12 border border-white/10 focus:outline-none focus:border-white/30"
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
};