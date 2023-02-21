import React from "react";

const Message = () => {
  return (
    <div className="message owner">
      <div className="messageInfo">
        <img
          src="https://images.pexels.com/photos/11593955/pexels-photo-11593955.jpeg"
          alt=""
        />
        <span>just now</span>
      </div>

      <div className="messageContent">
        <p>hello</p>
        <img
          src="https://images.pexels.com/photos/11593955/pexels-photo-11593955.jpeg"
          alt=""
        />
      </div>
    </div>
  );
};

export default Message;
