import { useState } from "react";
import "./SearchBar.css";

interface SearchBarProps {
  placeholder?: string;
  handleSearch: (query: string) => void;
}

export default function SearchBar({
  placeholder = "INITIATE NEURAL COMPANION SCAN...",
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
        aria-label="Neural companion search interface"
        aria-describedby="search-help"
      />
      <div id="search-help" className="sr-only">
        Enter keywords like breed, size, or age to search for pets
      </div>
    </div>
  );
}
