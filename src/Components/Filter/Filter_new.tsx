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
        ENTITY TYPE:
        <select name="type" value={filters.type} onChange={handleChange}>
          <option value="">ALL TYPES</option>
          <option value="Dog">CANINE</option>
          <option value="Cat">FELINE</option>
          <option value="Rabbit">LAGOMORPH</option>
        </select>
      </label>

      <label>
        GENDER MATRIX:
        <select name="gender" value={filters.gender} onChange={handleChange}>
          <option value="">ALL GENDERS</option>
          <option value="male">MALE</option>
          <option value="female">FEMALE</option>
        </select>
      </label>

      <label>
        AGE CYCLE:
        <select name="age" value={filters.age} onChange={handleChange}>
          <option value="">ALL AGES</option>
          <option value="baby">JUVENILE</option>
          <option value="young">YOUNG ADULT</option>
          <option value="adult">MATURE</option>
          <option value="senior">ELDER</option>
        </select>
      </label>

      <label>
        SIZE MATRIX:
        <select name="size" value={filters.size} onChange={handleChange}>
          <option value="">ALL SIZES</option>
          <option value="small">COMPACT</option>
          <option value="medium">STANDARD</option>
          <option value="large">ENHANCED</option>
          <option value="extra_large">MAXIMUM</option>
        </select>
      </label>

      <label>
        TRAIT TAGS:
        <select name="tags" value={filters.tags} onChange={handleChange}>
          <option value="">ALL TRAITS</option>
          {availableTags.map((tag) => (
            <option key={tag} value={tag}>
              {tag.toUpperCase()}
            </option>
          ))}
        </select>
      </label>

      <label>
        HYBRID STATUS:
        <select
          name="mixed"
          value={String(filters.mixed)}
          onChange={handleChange}
        >
          <option value="">ANY STATUS</option>
          <option value="true">HYBRID</option>
          <option value="false">PURE BREED</option>
        </select>
      </label>
    </div>
  );
}
