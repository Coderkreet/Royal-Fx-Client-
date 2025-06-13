/* eslint-disable react/prop-types */
import { useState } from "react";

const TopMarketFilter = ({ onFilterChange }) => {
  const [coinName, setCoinName] = useState("");
  const [timeFilter, setTimeFilter] = useState("24h");
  const [topCount, setTopCount] = useState("100");

  const handleCoinNameChange = (e) => {
    setCoinName(e.target.value);
    onFilterChange({ coinName: e.target.value, timeFilter, topCount });
  };

  const handleTimeFilterChange = (e) => {
    setTimeFilter(e.target.value);
    onFilterChange({ coinName, timeFilter: e.target.value, topCount });
  };

  const handleTopCountChange = (e) => {
    setTopCount(e.target.value);
    onFilterChange({ coinName, timeFilter, topCount: e.target.value });
  };

  return (
    <div
      className="top-filter"
      style={{ display: "flex", gap: "1rem", padding: "1rem" }}
    >
      <input
        type="text"
        placeholder="Search by coin..."
        value={coinName}
        onChange={handleCoinNameChange}
      />
      <div className="right">
        <select value={timeFilter} onChange={handleTimeFilterChange}>
          <option value="1h">1 Hour</option>
          <option value="24h">24 Hours</option>
          <option value="7d">7 Days</option>
        </select>

        <select value={topCount} onChange={handleTopCountChange}>
          <option value="10">Top 10</option>
          <option value="25">Top 25</option>
          <option value="100">Top 100</option>
        </select>
      </div>
    </div>
  );
};

export default TopMarketFilter;
