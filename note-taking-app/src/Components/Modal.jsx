import React, { useState } from "react";
import ShowModal from "./ShowModal";

const Modal = ({ onSendData }) => {
  const [showModal, setShowModal] = useState(false);
  const [inputValue, setInputValue] = useState(""); // Tracks group name
  const [selectedColor, setSelectedColor] = useState(false); // Tracks selected color

  // Toggle modal visibility
  const ToggleModal = () => {
    setShowModal(!showModal);
    setSelectedColor(false); // Reset selected color when modal is toggled
  };

  // Handle input value change
  const handleChange = (e) => {
    setInputValue(e.target.value); // Updates group name state
  };

  // Handle form submission
 const handleSubmit = (e) => {
  e.preventDefault(); // Prevent form submission
  const words = inputValue.trim().split(/\s+/); // Split input by spaces and trim whitespace
  let abbreviation = "";

  if (words.length === 1) {
    // If there's only one word, take the first letter
    abbreviation = words[0][0].toUpperCase();
  } else if (words.length >= 2) {
    // If there are two or more words, take the first letter of the first and second words
    abbreviation = `${words[0][0].toUpperCase()}${words[1][0].toUpperCase()}`;
  }

  const user = {
    GroupName: inputValue,
    color: selectedColor,
    abbreviation: abbreviation,
  };

  // Send data to parent component (LeftMainComponent)
  onSendData(user);

  // Close the modal after submission
  ToggleModal();
};


  return (
    <>
      <button className="modalButton" onClick={ToggleModal}>
        +
      </button>

      {showModal && (
        <div className="modal-wrapper" onClick={ToggleModal}>
          <div className="modalContainer" onClick={(e) => e.stopPropagation()}>
            <ShowModal
              handleSubmit={handleSubmit}
              handleChange={handleChange}
              selectedColor={selectedColor}
              setSelectedColor={setSelectedColor}
              ToggleModal={ToggleModal}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
