import ChatInterface from "./ChatInterface";

const RightMainComponent = () => {

  return (
     <div className="right">
      <div className="imageDiv">
        <img src="./home-image.png" />
      </div>
      <div className="rightHeading">
        <h1>Pocket Notes</h1>
      </div>
      <div className="rightText">
        <p>
          Send and receive messages without keeping your phone online.
          <br />
          Use Pocket Notes on up to 4 linked devices and 1 mobile phone
        </p>
      </div>
      <div className="encryptionDiv">
        <div className="lockDiv">
          <img src="./lock.png" />
        </div>
        <p>end-to-end encrypted</p>
      </div>
    </div>
  );
};

export default RightMainComponent;
