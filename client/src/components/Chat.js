// src/components/Chat.js

import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import ScrollToBottom from 'react-scroll-to-bottom';
import ChatInput from './ChatInput';
import Message from './Message';
import './Chat.css';

const socket = io('http://localhost:8000'); // Thay URL này bằng URL của server Socket.io của bạn

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState('User' + Math.floor(Math.random() * 1000));

  useEffect(() => {
    socket.on('sendMessage', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off('sendMessage');
    };
  }, [socket]);

  const sendMessage = (text) => {
    const message = { username, text };
    socket.emit('sendMessage', message);
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  return (
    <div className="chat-container">
      <ScrollToBottom className="messages">
        {messages.map((msg, index) => (
          <Message key={index} message={msg} />
        ))}
      </ScrollToBottom>
      <ChatInput sendMessage={sendMessage} />
    </div>
  );
};

export default Chat;
