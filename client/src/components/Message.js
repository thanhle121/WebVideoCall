// src/components/Message.js

import React from 'react';

const Message = ({ message: { username, text } }) => (
  <div className="message">
    <p>
      <strong>{username}</strong>: {text}
    </p>
  </div>
);

export default Message;
