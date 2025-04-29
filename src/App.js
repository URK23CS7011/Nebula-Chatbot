import React from 'react';
import './App.css';
import Chatbot from './components/Chatbot';

function App() {
  return (
    <div className="App">
      <div className="app-background"></div>
      <div className="app-content">
        <h1>Nebula <span className="subtitle">The Ultimate Cosmic Companion</span></h1>
        <Chatbot />
        <footer className="app-footer">
          <p>Created with ✨ cosmic energy ✨</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
