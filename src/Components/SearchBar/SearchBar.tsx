import { useState } from "react";
import "./SearchBar.css";

interface SearchBarProps {
  placeholder?: string;
  handleSearch: (query: string) => void;
}

export default function SearchBar({
  placeholder = "Search pets...",
  handleSearch,
}: SearchBarProps) {
  const [query, setQuery] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    handleSearch(newQuery); 
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={handleChange}
      />
    </div>
  );
}
