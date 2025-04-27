import React, { useState } from "react";

interface Props {
  onSortChange: (order: string) => void;
}

const SortControls: React.FC<Props> = ({ onSortChange }) => {
  const [activeSort, setActiveSort] = useState<string>("Newest First");
  
  const handleSortClick = (order: string) => {
    setActiveSort(order);
    onSortChange(order);
  };

  return (
    <div className="sort-controls">
      <h3>Sort by Date</h3>
      <div className="sort-buttons">
        <button 
          onClick={() => handleSortClick("Newest First")}
          style={{
            backgroundColor: activeSort === "Newest First" ? "#4a6fa5" : "",
            color: activeSort === "Newest First" ? "#fff" : "#000"
          }}
        >
          Newest First
        </button>
        <button 
          onClick={() => handleSortClick("Oldest First")}
          style={{
            backgroundColor: activeSort === "Oldest First" ? "#4a6fa5" : "",
            color: activeSort === "Oldest First" ? "#fff" : "#000"
          }}
        >
          Oldest First
        </button>
      </div>
    </div>
  );
};

export default SortControls;
