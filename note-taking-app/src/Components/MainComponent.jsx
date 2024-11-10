import { useState, useEffect } from "react";
import LeftMainComponent from "./LeftMainComponent";
import RightMainComponent from "./RightMainComponent";
import ChatInterface from "./ChatInterface";

const MainComponent = () => {
  const [state, setState] = useState(false); // Controls chat visibility
  const [selectedPocketIndex, setSelectedPocketIndex] = useState(() => {
    const storedIndex = localStorage.getItem("selectedPocketIndex");
    return storedIndex !== null ? JSON.parse(storedIndex) : null;
  });
  const [mainIndex, setMainIndex] = useState(() => {
    const storedIndex = localStorage.getItem("selectedPocketIndex");
    return storedIndex !== null ? JSON.parse(storedIndex) : null;
  });

  const [selectedPocketData, setSelectedPocketData] = useState(() => {
    const storedData = localStorage.getItem("selectedPocketData");
    return storedData ? JSON.parse(storedData) : null;
  });

  const [pocketItems, setPocketItems] = useState(() => {
    const storedItems = localStorage.getItem("pocketItems");
    return storedItems
      ? JSON.parse(storedItems)
      : [{ userDetails: "My Notes", color: "#0047ff", abbreviation: "MN" }];
  });

  const [isSmallScreen, setIsSmallScreen] = useState(false); // To track screen size

  // Handle selecting a pocket item
  const handleSelectedIndex = (index) => {
    if (index === selectedPocketIndex) {
      // Deselect the pocket
      setSelectedPocketIndex(null);
      setMainIndex(null);
      setState(false); // Ensure RightMainComponent shows when no pocket is selected
    } else {
      // Select a new pocket
      setSelectedPocketIndex(index);
      setMainIndex(index);
      setState(true); // Show chat interface

      // Save to localStorage
      localStorage.setItem("selectedPocketIndex", JSON.stringify(index));
      const selectedData = pocketItems[index];
      setSelectedPocketData(selectedData);
      localStorage.setItem("selectedPocketData", JSON.stringify(selectedData));
    }
  };

  // Detect screen size change
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 738) {
        setIsSmallScreen(true); // Set state to true if screen is small
      } else {
        setIsSmallScreen(false); // Otherwise, false
      }
    };

    // Attach event listener
    window.addEventListener("resize", handleResize);

    // Call it initially to set the state on mount
    handleResize();

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Load stored data on component mount
  useEffect(() => {
    const storedPocketItems = localStorage.getItem("pocketItems");
    if (storedPocketItems) {
      setPocketItems(JSON.parse(storedPocketItems));
    }
  }, []);

  return (
    <div className="MainflexContainer">
      {/* Conditionally render the LeftMainComponent on large screens */}
      {!isSmallScreen && (
        <LeftMainComponent
          selectedPocketIndex={selectedPocketIndex}
          onSelectIndex={handleSelectedIndex}
          pocketItems={pocketItems}
          onAddPocketItem={(groupName, color, abbreviation) => {
            const newPocketItem = {
              userDetails: groupName,
              color,
              abbreviation,
            };
            const updatedPocketItems = [...pocketItems, newPocketItem];
            setPocketItems(updatedPocketItems);
            localStorage.setItem(
              "pocketItems",
              JSON.stringify(updatedPocketItems)
            );
          }}
          onSelectPocketData={(data) => {
            setSelectedPocketData(data);
            localStorage.setItem("selectedPocketData", JSON.stringify(data));
          }}
        />
      )}

      {/* Conditionally render the ChatInterface when a pocket item is selected */}
      {state && !isSmallScreen && (
        <ChatInterface
          chatKey={mainIndex}
          selectedPocketData={selectedPocketData}
          pocketIndex={selectedPocketIndex}
          goLeft={() => {
            setState(false); // Hide ChatInterface
          }}
        />
      )}

      {/* RightMainComponent: Only visible when no chat is active on desktop */}
      {!isSmallScreen && !state && <RightMainComponent />}

      {/* Mobile layout (when chat interface is not active, show LeftMainComponent) */}
      {isSmallScreen && !state && (
        <LeftMainComponent
          selectedPocketIndex={selectedPocketIndex}
          onSelectIndex={handleSelectedIndex}
          pocketItems={pocketItems}
          onAddPocketItem={(groupName, color, abbreviation) => {
            const newPocketItem = {
              userDetails: groupName,
              color,
              abbreviation,
            };
            const updatedPocketItems = [...pocketItems, newPocketItem];
            setPocketItems(updatedPocketItems);
            localStorage.setItem(
              "pocketItems",
              JSON.stringify(updatedPocketItems)
            );
          }}
          onSelectPocketData={(data) => {
            setSelectedPocketData(data);
            localStorage.setItem("selectedPocketData", JSON.stringify(data));
          }}
        />
      )}

      {/* Mobile layout ChatInterface */}
      {isSmallScreen && state && (
        <ChatInterface
          chatKey={mainIndex}
          selectedPocketData={selectedPocketData}
          pocketIndex={selectedPocketIndex}
          goLeft={() => {
            setState(false); // Hide ChatInterface
          }}
        />
      )}
    </div>
  );
};

export default MainComponent;
