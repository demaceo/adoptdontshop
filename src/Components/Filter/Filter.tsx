import { useState } from "react";
import "./Filter.css";

interface FilterProps {
  onFilterChange: (filters: {
    type: string;
    gender: string;
    age: string;
  }) => void;
}

export default function Filter({ onFilterChange }: FilterProps) {
  const [filters, setFilters] = useState({
    type: "",
    gender: "",
    age: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    const updatedFilters = { ...filters, [name]: value };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters); // Pass selected filters back
  };

  return (
    <div className="filter-container">
      <label>
        Type:
        <select name="type" value={filters.type} onChange={handleChange}>
          <option value="">All</option>
          <option value="dog">Dog</option>
          <option value="cat">Cat</option>
          <option value="rabbit">Rabbit</option>
        </select>
      </label>

      <label>
        Gender:
        <select name="gender" value={filters.gender} onChange={handleChange}>
          <option value="">All</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </label>

      <label>
        Age:
        <select name="age" value={filters.age} onChange={handleChange}>
          <option value="">All</option>
          <option value="baby">Baby</option>
          <option value="young">Young</option>
          <option value="adult">Adult</option>
          <option value="senior">Senior</option>
        </select>
      </label>
    </div>
  );
}
