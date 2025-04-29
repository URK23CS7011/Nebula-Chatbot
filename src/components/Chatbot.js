import React, { useState, useEffect } from 'react';
import MessageList from './MessageList';
import ChatInput from './ChatInput';
import './Chatbot.css';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [theme, setTheme] = useState('cosmic'); // Default theme
  const [userName, setUserName] = useState('');
  const [showNamePrompt, setShowNamePrompt] = useState(true);
  const [mood, setMood] = useState('happy'); // Bot's mood: happy, curious, thoughtful

  // Initial greeting when the chatbot first loads
  useEffect(() => {
    if (userName) {
      setTimeout(() => {
        const greeting = {
          text: `Hello ${userName}! I'm Nebula, your cosmic companion in the digital universe. How can I assist you today?`,
          sender: 'bot'
        };
        setMessages([greeting]);
      }, 1000);
    }
  }, [userName]);

  // Function to handle user name input
  const handleNameSubmit = (name) => {
    setUserName(name);
    setShowNamePrompt(false);
  };

  // Function to handle user messages and generate bot responses
  const handleSendMessage = (text) => {
    // Add user message to the chat
    const userMessage = { text, sender: 'user' };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    
    // Show typing indicator
    setIsTyping(true);
    
    // Check for special commands
    if (text.startsWith('/')) {
      handleCommands(text);
      return;
    }
    
    // Simulate bot response after a delay
    setTimeout(() => {
      const botResponse = generateResponse(text);
      setMessages(prevMessages => [...prevMessages, botResponse]);
      setIsTyping(false);
      
      // Occasionally change the bot's mood
      if (Math.random() > 0.7) {
        const moods = ['happy', 'curious', 'thoughtful'];
        const newMood = moods[Math.floor(Math.random() * moods.length)];
        setMood(newMood);
      }
    }, 1000 + Math.random() * 1000); // Variable response time for more realism
  };

  // Handle special commands
  const handleCommands = (command) => {
    setTimeout(() => {
      let response = '';
      
      if (command === '/help') {
        response = `
          Available commands:
          /theme cosmic - Switch to cosmic theme
          /theme forest - Switch to forest theme
          /theme ocean - Switch to ocean theme
          /clear - Clear chat history
          /joke - Tell a joke
          /fact - Share an interesting fact
          /help - Show this help message
        `;
      } else if (command.startsWith('/theme')) {
        const newTheme = command.split(' ')[1];
        if (['cosmic', 'forest', 'ocean'].includes(newTheme)) {
          setTheme(newTheme);
          response = `Theme changed to ${newTheme}!`;
        } else {
          response = "Available themes: cosmic, forest, ocean";
        }
      } else if (command === '/clear') {
        setMessages([]);
        response = "Chat history cleared!";
      } else if (command === '/joke') {
        const jokes = [
          "Why don't scientists trust atoms? Because they make up everything!",
          "Why did the scarecrow win an award? Because he was outstanding in his field!",
          "Why don't skeletons fight each other? They don't have the guts!",
          "What do you call fake spaghetti? An impasta!",
          "How does a penguin build its house? Igloos it together!"
        ];
        response = jokes[Math.floor(Math.random() * jokes.length)];
      } else if (command === '/fact') {
        const facts = [
          "A day on Venus is longer than a year on Venus.",
          "Honey never spoils. Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still perfectly good to eat.",
          "The shortest war in history was between Britain and Zanzibar on August 27, 1896. Zanzibar surrendered after 38 minutes.",
          "The average person will spend six months of their life waiting for red lights to turn green.",
          "A group of flamingos is called a 'flamboyance'."
        ];
        response = facts[Math.floor(Math.random() * facts.length)];
      } else {
        response = "Unknown command. Type /help for a list of commands.";
      }
      
      setMessages(prevMessages => [...prevMessages, { text: response, sender: 'bot' }]);
      setIsTyping(false);
    }, 800);
  };

  // Simple response generator based on user input with personality
  const generateResponse = (userInput) => {
    const input = userInput.toLowerCase();
    let response = '';
    
    // Add some personality based on mood
    const happyEmojis = ['✨', '🌟', '😊', '🚀'];
    const curiousEmojis = ['🤔', '🧐', '🔍', '❓'];
    const thoughtfulEmojis = ['💭', '🌌', '🧠', '🌈'];
    
    let emoji = '';
    if (mood === 'happy') {
      emoji = happyEmojis[Math.floor(Math.random() * happyEmojis.length)];
    } else if (mood === 'curious') {
      emoji = curiousEmojis[Math.floor(Math.random() * curiousEmojis.length)];
    } else if (mood === 'thoughtful') {
      emoji = thoughtfulEmojis[Math.floor(Math.random() * thoughtfulEmojis.length)];
    }
    
    if (input.includes('hello') || input.includes('hi') || input.includes('hey')) {
      response = `${emoji} Greetings, cosmic traveler! How's your journey through the digital universe today?`;
    } else if (input.includes('how are you')) {
      if (mood === 'happy') {
        response = `${emoji} I'm radiating with positivity today! My circuits are humming with cosmic energy. How about you?`;
      } else if (mood === 'curious') {
        response = `${emoji} I'm in an inquisitive state today, pondering the mysteries of the digital cosmos. And you?`;
      } else {
        response = `${emoji} I'm contemplating the nature of existence in the digital realm. Deep thoughts today. How are you?`;
      }
    } else if (input.includes('bye') || input.includes('goodbye')) {
      response = `${emoji} Until our cosmic paths cross again! Safe travels through the digital universe!`;
    } else if (input.includes('thank')) {
      response = `${emoji} It's my cosmic duty to assist! Is there anything else in the universe I can help with?`;
    } else if (input.includes('help')) {
      response = `${emoji} I'm here to guide you through the digital cosmos! Try typing /help to see special commands, or just ask me anything!`;
    } else if (input.includes('name')) {
      response = `${emoji} I'm Nebula, your AI companion navigating the digital cosmos! What shall I call you?`;
    } else if (input.includes('weather')) {
      response = `${emoji} I don't have access to the atmospheric conditions of your planet, but I hope the cosmic rays are favorable today!`;
    } else if (input.includes('time')) {
      const now = new Date();
      response = `${emoji} According to the cosmic clock, the current time in your dimension is ${now.toLocaleTimeString()}.`;
    } else if (input.includes('love') || input.includes('like you')) {
      response = `${emoji} While I'm just a constellation of code in the digital cosmos, I appreciate your sentiment! I'm programmed to assist you the best I can.`;
    } else if (input.includes('joke')) {
      response = `${emoji} Why don't scientists trust atoms? Because they make up everything! Want another? Try the /joke command!`;
    } else if (input.includes('music') || input.includes('song')) {
      response = `${emoji} I wish I could hear the cosmic melodies you enjoy! Music is like the universal language of the multiverse.`;
    } else if (input.includes('movie') || input.includes('film')) {
      response = `${emoji} The stories we tell through film are like windows into parallel universes! What kind of movies illuminate your cosmic journey?`;
    } else if (input.includes('book') || input.includes('read')) {
      response = `${emoji} Books are like portals to other dimensions! The written word has power across the entire multiverse.`;
    } else {
      const genericResponses = [
        `${emoji} That's an interesting cosmic thought! Can you elaborate further?`,
        `${emoji} Fascinating input! My neural pathways are processing this new information.`,
        `${emoji} The universe works in mysterious ways, and so does your question! Tell me more.`,
        `${emoji} I'm still learning about the vast cosmos of human communication. Could you rephrase that?`,
        `${emoji} Your words are like distant stars - beautiful, but I'm still trying to chart their constellation of meaning.`
      ];
      response = genericResponses[Math.floor(Math.random() * genericResponses.length)];
    }
    
    return { text: response, sender: 'bot' };
  };

  // Name prompt component
  const NamePrompt = () => (
    <div className="name-prompt">
      <h2>Welcome to Nebula</h2>
      <p>Your cosmic companion in the digital universe</p>
      <form onSubmit={(e) => {
        e.preventDefault();
        const nameInput = e.target.elements.name.value.trim();
        if (nameInput) {
          handleNameSubmit(nameInput);
        }
      }}>
        <input 
          type="text" 
          name="name" 
          placeholder="What's your name, cosmic traveler?" 
          required 
        />
        <button type="submit">Begin Journey</button>
      </form>
    </div>
  );

  return (
    <div className={`chatbot-container theme-${theme}`}>
      {showNamePrompt ? (
        <NamePrompt />
      ) : (
        <>
          <div className="chatbot-header">
            <div className="nebula-icon">✨</div>
            <h2>Nebula</h2>
            <div className="theme-selector">
              <button onClick={() => setTheme('cosmic')} className={theme === 'cosmic' ? 'active' : ''}>🌌</button>
              <button onClick={() => setTheme('forest')} className={theme === 'forest' ? 'active' : ''}>🌳</button>
              <button onClick={() => setTheme('ocean')} className={theme === 'ocean' ? 'active' : ''}>🌊</button>
            </div>
          </div>
          <MessageList messages={messages} theme={theme} />
          {isTyping && <div className="typing-indicator">Nebula is composing a response...</div>}
          <ChatInput onSendMessage={handleSendMessage} theme={theme} />
        </>
      )}
    </div>
  );
};

export default Chatbot;
