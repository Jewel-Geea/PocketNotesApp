import { useState, useEffect } from "react";
import Modal from "./Modal";
import PocketHeadingDiv from "./PocketHeadingDiv";
import PocketList from "./PocketList";

const LeftMainComponent = ({
  selectedPocketIndex,
  onSelectIndex,
  pocketItems,
  onAddPocketItem,
  onSelectPocketData,
}) => {
  const handleDataFromChild = (data) => {
    const { GroupName, color, abbreviation } = data;
    onAddPocketItem(GroupName, color, abbreviation); // Call the parent's addPocketItem function
  };

  const handleClick = (index, pocketItem) => {
    onSelectIndex(index); // Update selected index in parent
    onSelectPocketData(pocketItem); // Send selected pocket data to parent
  };

  return (
    <div className="left">
      <PocketHeadingDiv />

      {/* Render all PocketList components dynamically */}
      {pocketItems.map((pocketItem, index) => (
        <PocketList
          key={index}
          userDetails={pocketItem.userDetails}
          abbreviation={pocketItem.abbreviation}
          color={pocketItem.color}
          isSelected={selectedPocketIndex === index}
          onClick={() => handleClick(index, pocketItem)} // Pass the selected pocket item data on click
        />
      ))}
      <Modal onSendData={handleDataFromChild} />
    </div>
  );
};

export default LeftMainComponent;
