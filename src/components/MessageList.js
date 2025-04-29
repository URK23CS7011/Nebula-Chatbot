import React, { useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage';
import './MessageList.css';

const MessageList = ({ messages, theme }) => {
  const messagesEndRef = useRef(null);

  // Auto-scroll to the bottom when new messages are added
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className={`message-list ${theme ? `theme-${theme}` : ''}`}>
      {messages.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">💫</div>
          <p>Your conversation will appear here</p>
          <p className="empty-hint">Try saying "Hello" to start</p>
        </div>
      )}
      {messages.map((msg, index) => (
        <ChatMessage 
          key={index} 
          message={msg.text} 
          isBot={msg.sender === 'bot'} 
          theme={theme}
        />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
