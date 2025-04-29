import React, { useState, useEffect } from 'react';
import './ChatMessage.css';

const ChatMessage = ({ message, isBot, theme }) => {
  const [visible, setVisible] = useState(false);
  
  // Animation effect when messages appear
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  // Function to detect if message contains code
  const formatMessage = (text) => {
    if (text.includes('```')) {
      const parts = text.split('```');
      return (
        <>
          {parts.map((part, index) => {
            // Even indices are normal text, odd indices are code blocks
            if (index % 2 === 0) {
              return <span key={index}>{part}</span>;
            } else {
              return (
                <pre key={index} className="code-block">
                  <code>{part}</code>
                </pre>
              );
            }
          })}
        </>
      );
    }
    
    // Check for command output formatting
    if (text.startsWith('Available commands:')) {
      return (
        <pre className="command-list">
          {text}
        </pre>
      );
    }
    
    return text;
  };

  const getBotAvatar = () => {
    if (theme === 'cosmic') return '🌌';
    if (theme === 'forest') return '🌳';
    if (theme === 'ocean') return '🌊';
    return '✨';
  };

  return (
    <div className={`message-container ${isBot ? 'bot' : 'user'} ${visible ? 'visible' : ''}`}>
      <div className={`avatar ${theme ? `theme-${theme}` : ''}`}>
        {isBot ? getBotAvatar() : '👤'}
      </div>
      <div className="message">
        {formatMessage(message)}
      </div>
    </div>
  );
};

export default ChatMessage;
