import { useSearchParams } from "react-router-dom";
import { sortOptions } from "./sortOptions";
import type { SortKey } from "./sort.types";


const SortDropdown = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentSort = (searchParams.get("sort") as SortKey) || "";

  const handleChange = (value: SortKey) => {
    const params = new URLSearchParams(searchParams);
    params.set("sort", value);
    setSearchParams(params);
  };

  return (
    <div>
      <label style={{ marginRight: "8px" }}>Sort by</label>
      <select
        value={currentSort}
        onChange={(e) => handleChange(e.target.value as SortKey)}
      >
        <option value="">Select</option>
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SortDropdown;
