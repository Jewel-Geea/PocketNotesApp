import LeftMainComponent from "./LeftMainComponent";
import ChatInterface from "./ChatInterface";
import RightMainComponent from "./RightMainComponent";
import { useState } from "react";
const MainComponent = () => {
  //on progress
  const [state, setState] = useState(true);
  
  const toggleChatVisibility = () => {
    setState(!state);
  };
  return (
    <div className="MainflexContainer">
      <LeftMainComponent />
      {state ? <ChatInterface /> : <RightMainComponent />}
    </div>
  );
};

export default MainComponent;
