import React, { useState, useRef, useEffect } from 'react';
import './ChatInput.css';

const ChatInput = ({ onSendMessage, theme }) => {
  const [message, setMessage] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const inputRef = useRef(null);
  
  // Focus the input field when the component mounts
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() === '') return;
    
    onSendMessage(message);
    setMessage('');
    setSuggestions([]);
  };

  // Handle input changes and suggest commands
  const handleInputChange = (e) => {
    const value = e.target.value;
    setMessage(value);
    
    // Show command suggestions when typing '/'
    if (value === '/') {
      setSuggestions([
        '/help', 
        '/theme cosmic', 
        '/theme forest', 
        '/theme ocean', 
        '/clear',
        '/joke',
        '/fact'
      ]);
    } else if (value.startsWith('/') && value.length > 1) {
      // Filter suggestions based on input
      const filtered = [
        '/help', 
        '/theme cosmic', 
        '/theme forest', 
        '/theme ocean', 
        '/clear',
        '/joke',
        '/fact'
      ].filter(cmd => cmd.startsWith(value));
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    setMessage(suggestion);
    setSuggestions([]);
    inputRef.current?.focus();
  };

  // Handle key navigation for suggestions
  const handleKeyDown = (e) => {
    if (suggestions.length > 0) {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        const currentIndex = suggestions.findIndex(s => s === message);
        let nextIndex;
        
        if (e.key === 'ArrowDown') {
          nextIndex = currentIndex < suggestions.length - 1 ? currentIndex + 1 : 0;
        } else {
          nextIndex = currentIndex > 0 ? currentIndex - 1 : suggestions.length - 1;
        }
        
        setMessage(suggestions[nextIndex]);
      } else if (e.key === 'Tab' || e.key === 'Enter' && suggestions.length === 1) {
        e.preventDefault();
        setMessage(suggestions[0]);
        setSuggestions([]);
      } else if (e.key === 'Escape') {
        setSuggestions([]);
      }
    }
  };

  return (
    <div className={`chat-input-container ${theme ? `theme-${theme}` : ''}`}>
      <form className="chat-input-form" onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <input
            ref={inputRef}
            type="text"
            value={message}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Type a message or / for commands..."
            className="chat-input"
            autoComplete="off"
          />
          {suggestions.length > 0 && (
            <div className="suggestions">
              {suggestions.map((suggestion, index) => (
                <div 
                  key={index} 
                  className={`suggestion ${message === suggestion ? 'active' : ''}`}
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </div>
              ))}
            </div>
          )}
        </div>
        <button 
          type="submit" 
          className="send-button"
          disabled={message.trim() === ''}
        >
          <span className="send-icon">➤</span>
        </button>
      </form>
    </div>
  );
};

export default ChatInput;
