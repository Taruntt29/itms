import React, { useState } from "react";

function SearchDateFilter() {
  const [searchResults, setSearchResults] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleStartDateChange = (e) => {
    const date = e.target.value;
    setStartDate(date);
    filterResults(date, endDate);
  };

  const handleEndDateChange = (e) => {
    const date = e.target.value;
    setEndDate(date);
    filterResults(startDate, date);
  };

  const filterResults = (start, end) => {
    // TODO: Fetch data and filter based on start and end dates
    // You can use a library like moment.js to parse and manipulate dates
    // and then filter the search results based on the selected dates
  };

  return (
    <div className="d-flex gap-2">
      <label htmlFor="start-date">Invoice From:</label>
      <br />
      <input
        type="date"
        id="start-date"
        name="start-date"
        value={startDate}
        onChange={handleStartDateChange}
        sx={{ width: 300 }}
      />

      <label htmlFor="end-date">Invoice To:</label>
      <br />
      <input
        type="date"
        id="end-date"
        name="end-date"
        value={endDate}
        onChange={handleEndDateChange}
        sx={{ width: 300 }}
      />

      <ul>
        {searchResults.map((result) => (
          <li key={result.id}>{result.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default SearchDateFilter;
