import React from "react";
import { Input } from "@/src/components/ui/input";
import { Search } from "lucide-react";

interface SearchInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ value, onChange }) => (
  <div className="flex items-center space-x-2 mb-2">
    <Search className="h-5 w-5 text-gray-400" />
    <Input
      placeholder="Buscar itens..."
      value={value}
      onChange={onChange}
      className="w-full"
    />
  </div>
);

export default SearchInput;
