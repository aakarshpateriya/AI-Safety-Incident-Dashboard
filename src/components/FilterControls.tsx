import React, { useState } from "react";

interface Props {
  onFilterChange: (severity: string) => void;
}

const FilterControls: React.FC<Props> = ({ onFilterChange }) => {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  
  const handleFilterClick = (severity: string) => {
    setActiveFilter(severity);
    onFilterChange(severity);
  };

  return (
    <div className="filter-controls">
      <h3>Filter by Severity</h3>
      <div className="filter-buttons">
        <button 
          onClick={() => handleFilterClick("All")}
          style={{
            backgroundColor: activeFilter === "All" ? "#4a6fa5" : "",
            color: activeFilter === "All" ? "white" : ""
          }}
        >
          All
        </button>
        <button 
          onClick={() => handleFilterClick("Low")}
          style={{
            backgroundColor: activeFilter === "Low" ? "#27ae60" : "",
            color: activeFilter === "Low" ? "white" : ""
          }}
        >
          Low
        </button>
        <button 
          onClick={() => handleFilterClick("Medium")}
          style={{
            backgroundColor: activeFilter === "Medium" ? "#f39c12" : "",
            color: activeFilter === "Medium" ? "white" : ""
          }}
        >
          Medium
        </button>
        <button 
          onClick={() => handleFilterClick("High")}
          style={{
            backgroundColor: activeFilter === "High" ? "#e74c3c" : "",
            color: activeFilter === "High" ? "white" : ""
          }}
        >
          High
        </button>
      </div>
    </div>
  );
};

export default FilterControls;
