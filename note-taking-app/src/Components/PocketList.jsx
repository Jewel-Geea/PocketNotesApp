import React from "react";

function PocketList({ userDetails, abbreviation, color, isSelected, onClick }) {
  return (
    <div className="PocketListWrapper">
      <div
        className={`PocketList ${isSelected ? "selected" : ""}`} // Add 'selected' class if this div is clicked
        onClick={onClick} // Trigger the click event
      >
        <p style={{ backgroundColor: color }}>{abbreviation}</p>
        <p>{userDetails}</p>
      </div>
    </div>
        );
}

export default PocketList;
