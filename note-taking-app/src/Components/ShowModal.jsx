import React from "react";

const ShowModal = ({
  ToggleModal,
  handleSubmit,
  handleChange,
  selectedColor,
  setSelectedColor,
  
}) => {
  const colors = [
    "#B38BFA",
    "#FF79F2",
    "#43E6FC",
    "#F19576",
    "#0047FF",
    "#6691FF",
  ];

  function renderColorButtons() {
    return colors.map((item, index) => (
      <input
        key={index}
        type="radio"
        name="color"
        value={item}
        required
        style={{
          backgroundColor: item,
          border:
            selectedColor === item
              ? "2px solid black"
              : "2px solid transparent",
        }}
        onClick={() => setSelectedColor(item)} // Update selected color state
      />
    ));
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="groupHeading">Create New Group</h1>
      <div className="createGroupNameDiv">
        <span>Group name</span>
        <input
          type="text"
          required
          placeholder="Enter group name"
          onChange={handleChange} // Capture group name
        />
      </div>
      <div className="colorSelectionDiv">
        <span>Choose color</span>
        <div className="RadioDiv">{renderColorButtons()}</div>
      </div>
      <button type="submit" className="createGroupButton">
        Create
      </button>
    </form>
  );
};

export default ShowModal;
