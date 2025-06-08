import { useState } from "react";
import "./Filter.css";
import { FilterProps } from "../../utils/Types";

export default function Filter({ onFilterChange, availableTags }: FilterProps) {
  const [filters, setFilters] = useState({
    size: "",
    type: "",
    gender: "",
    age: "",
    tags: "",
    published_at: "",
    mixed: "" as string | boolean,
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    const updatedFilters = { ...filters, [name]: value };
    if (name === "mixed") {
      updatedFilters.mixed = value === "true"; 
    }
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  return (
    <div className="filter-container">
      <label>
        Type:
        <select name="type" value={filters.type} onChange={handleChange}>
          <option value="">All</option>
          <option value="Dog">Dog</option>
          <option value="Cat">Cat</option>
          <option value="Rabbit">Rabbit</option>
        </select>
      </label>
      <label>
        Gender:
        <select name="gender" value={filters.gender} onChange={handleChange}>
          <option value="">All</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
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
      <label>
        Size:
        <select name="size" value={filters.size} onChange={handleChange}>
          <option value="">All</option>
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
          <option value="extra_large">Extra Large</option>
        </select>
      </label>
      </label>
      <label>
        Tags:
        <select name="tags" value={filters.tags} onChange={handleChange}>
          {/* <option value="any">Any</option>
          <option value="none">None</option> */}
          <option value="">Any</option>
          {availableTags.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </label>
      <label>
        Mixed:
        <select
          name="mixed"
          value={String(filters.mixed)}
          onChange={handleChange}
        >
          <option value="">Any</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </label>

      {/* <label>
        Published Date:
        <select name="tags" value={filters.published_at} onChange={handleChange}>
          <option value="older">Oldest</option>
          <option value="newer">Newest</option>
        </select>
      </label> */}
    </div>
  );
}