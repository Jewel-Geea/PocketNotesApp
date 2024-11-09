import { useState, useEffect } from "react";
import Modal from "./Modal";
import PocketHeadingDiv from "./PocketHeadingDiv";
import PocketList from "./PocketList";

const LeftMainComponent = ({ check }) => {
  // Initialize state with data from local storage or default to an initial array
  const [pocketItems, setPocketItems] = useState(() => {
    const storedItems = localStorage.getItem("pocketItems");
    return storedItems
      ? JSON.parse(storedItems)
      : [{ userDetails: "My Notes", color: "#0047ff", abbreviation: "MN" }];
  });

  // Track the selected pocket list item (by index)
  const [selectedPocketIndex, setSelectedPocketIndex] = useState(null);

  // Function to add a new pocket item
  function addPocketItem(groupName, color, abbreviation) {
    const newPocketItem = {
      userDetails: groupName,
      color: color,
      abbreviation: abbreviation,
    };

    // Update state with the new pocket item
    setPocketItems((prevItems) => [...prevItems, newPocketItem]);
  }

  // Save pocketItems to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("pocketItems", JSON.stringify(pocketItems));
  }, [pocketItems]);

  // Handle data passed from the Modal component
  const handleDataFromChild = (data) => {
    const groupName = data.GroupName;
    const color = data.color;
    const abbreviation = data.abbreviation;
    addPocketItem(groupName, color, abbreviation);
  };

  // Handle click event to update selected index
  const handleClick = (index) => {
    setSelectedPocketIndex(index === selectedPocketIndex ? null : index);
  };

  return (
    <div className='left'>
      <PocketHeadingDiv />

      {/* Render all PocketList components dynamically */}
      {pocketItems.map((pocketItem, index) => (
        <PocketList
          key={index} // Ensure each PocketList has a unique key
          userDetails={pocketItem.userDetails}
          abbreviation={pocketItem.abbreviation}
          color={pocketItem.color}
          isSelected={selectedPocketIndex === index} // Pass isSelected to each PocketList
          onClick={() => handleClick(index)} // Pass the click handler
        />
      ))}

      <Modal onSendData={handleDataFromChild} />
    </div>
  );
};

export default LeftMainComponent;
