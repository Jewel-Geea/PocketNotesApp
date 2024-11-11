import React from "react";

function PocketList({ userDetails, abbreviation, color, isSelected, onClick }) {


  return (
    <div className={`PocketWrapper ${isSelected ? "selected" : ""}`} onClick={onClick} >
      <div
        className='PocketList' // Add 'selected' class if this div is clicked
        // Trigger the click event
      >
        <div className="initialWrapper">
          <p style={{ backgroundColor: color }}>{abbreviation}</p>
        </div>
        <p>{userDetails}</p>
      </div>
    </div>
        );
}

export default PocketList;
