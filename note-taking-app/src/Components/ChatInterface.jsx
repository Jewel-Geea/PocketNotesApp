import { useState } from "react";

//work under progress
const ChatInterface = ({ goLeft, check }) => {
  // console.log("this is the check condition in the chat interface" + check);
  return (
    <>
      <div className={`${check ? "chatInterfaceHidden" : "chatInterface"}`}>
        <div className="PocketList chatInterfaceHeadingDiv">
          <button onClick={goLeft}>
            <img src="./backArrow.png" />
          </button>
          <p>MN</p>
          <p>My Notes</p>
        </div>
        <div className="chatView">
          <p>
            Another productive way to use this tool to begin a daily writing
            routine. One way is to generate a random paragraph with the
            intention to try to rewrite it while still keeping the original
            meaning. The purpose here is to just get the writing started so that
            when the writer goes onto their day's writing projects, words are
            already flowing from their fingers.
          </p>
          <ul>
            <li>9 Mar 2023</li>
            <li>10:10 AM</li>
          </ul>
        </div>

        {/* end of chatView */}
        {/* enter the text area and the send button below*/}
        {/* search is chatInput  */}
        {/* search icon is sendButton */}
        {/* search input is inputField */}
        <form>
          <div className="chatInput">
            <button
              onClick={(e) => {
                e.preventDefault();
                console.log("its working");
              }}
              className="sendButton">
              <img className="sendButton" src="./sendButton.png" />
            </button>
            <textarea
              className="inputField"
              placeholder="Enter your text here..........."
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default ChatInterface;
