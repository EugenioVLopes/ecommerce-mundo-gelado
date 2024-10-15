import React from "react";
import { Input } from "@/src/components/ui/input";
import { Search } from "lucide-react";

interface SearchBarProps {
  searchTerm: string;
  onSearch: (term: string) => void;
}

export default function SearchBar({ searchTerm, onSearch }: SearchBarProps) {
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };

  return (
    <div className="flex items-center space-x-2 mb-2">
      <Search className="h-5 w-5 text-gray-400" />
      <Input
        placeholder="Buscar itens..."
        value={searchTerm}
        onChange={handleSearch}
        className="w-full"
      />
    </div>
  );
}
