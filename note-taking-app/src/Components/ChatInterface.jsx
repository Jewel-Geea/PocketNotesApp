import { useState, useEffect } from "react";

const ChatInterface = ({ goLeft, check }) => {
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);

  const initialMessages = [
    {
      text: "Another productive way to use this tool to begin a daily writing routine. One way is to generate a random paragraph with the intention to try to rewrite it while still keeping the original meaning. The purpose here is to just get the writing started so that when the writer goes onto their day's writing projects, words are already flowing from their fingers.",
      date: "9/Mar/2023",
      time: "10:10 AM",
    },
  ];

  useEffect(() => {
    const storedMessages = JSON.parse(localStorage.getItem("chatMessages"));
    if (!storedMessages || storedMessages.length === 0) {
      localStorage.setItem("chatMessages", JSON.stringify(initialMessages));
      setChatMessages(initialMessages);
    } else {
      setChatMessages(storedMessages);
    }
  }, []);

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
      localStorage.setItem("chatMessages", JSON.stringify(updatedMessages));

      setMessage("");
    }
  };

  const formatDate = (date) => {
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" }); // 'Jan', 'Feb', etc.
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className={`${check ? "chatInterfaceHidden" : "chatInterface"}`}>
      <div className="PocketList chatInterfaceHeadingDiv">
        <button onClick={goLeft}>
          <img src="./backArrow.png" alt="Back" />
        </button>
        <p>MN</p>
        <p>My Notes</p>
      </div>

      <div className="chatViewWrapper">
        {chatMessages.map((message, index) => (
          <div key={index} className="chatView">
            <div className="chatMessage">
              <p>{message.text}</p>
              <ul>
                <li>{message.date}</li>
                <li>{message.time}</li>
              </ul>
            </div>
          </div>
        ))}
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
            placeholder="Enter your text here..........."
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
