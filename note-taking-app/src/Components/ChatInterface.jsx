import React, { useState, useEffect } from "react";

const ChatInterface = ({
  chatKey,
  selectedPocketData,
  pocketIndex,
  goLeft,
}) => {
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);

  // Fetch stored chat messages for the selected pocket index
  useEffect(() => {
    if (pocketIndex !== null) {
      const storedMessages =
        JSON.parse(localStorage.getItem(`chatMessages_${pocketIndex}`)) || [];
      setChatMessages(storedMessages);
    }
  }, [pocketIndex]);

  const handleInputChange = (e) => setMessage(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim().length > 0) {
      const currentTime = new Date();
      const newMessage = {
        text: message,
        date: formatDate(currentTime),
        time: formatTime(currentTime),
      };

      const updatedMessages = [...chatMessages, newMessage];
      setChatMessages(updatedMessages);
      localStorage.setItem(
        `chatMessages_${pocketIndex}`,
        JSON.stringify(updatedMessages)
      );

      setMessage("");
    }
  };

  const formatDate = (date) => {
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const renderPocketData = () => {
    if (!selectedPocketData) {
      return (
        <div className="chatInterfaceHeadingDiv">
          <p className="fallbackAbbreviation">MN</p>
          <p className="fallbackUserDetails">My Notes</p>
        </div>
      );
    }

    return (
      <div className="chatInterfaceHeadingDiv">
        <button onClick={goLeft}>
          <img src="./backArrow.png" alt="Back" />
        </button>
        <div className="chatInitialWrapper">
          <p style={{ backgroundColor: selectedPocketData.color }}>
            {selectedPocketData.abbreviation}
          </p>
        </div>
        <p>{selectedPocketData.userDetails}</p>
      </div>
    );
  };

  return (
    <div key={chatKey} className="chatInterface">
      <div className="PocketList chatInterfaceHeadingDiv">
        {renderPocketData()}
      </div>
      <div className="chatViewWrapper">
        {chatMessages.length > 0 ? (
          chatMessages.map((message, index) => (
            <div key={index} className="chatView">
              <div className="chatMessage">
                <p>{message.text}</p>
                <ul>
                  <li>{message.date}</li>
                  <li>{message.time}</li>
                </ul>
              </div>
            </div>
          ))
        ) : (
          <p></p> //dummy message
        )}
      </div>
      <form onSubmit={handleSubmit}>
        <div className="chatInput">
          <button
            type="submit"
            className="sendButton"
            disabled={message.trim().length === 0}>
            <img className="sendButton" src="./sendButton.png" alt="Send" />
          </button>
          <textarea
            className="inputField"
            placeholder="Enter your text here..."
            value={message}
            onChange={handleInputChange}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
          />
        </div>
      </form>
    </div>
  );
};

export default ChatInterface;
