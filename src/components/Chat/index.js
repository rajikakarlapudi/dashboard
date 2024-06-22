import React from 'react';
import './index.css';

const Chat = () => {
  return (
    <div className='top'>
    <div className="chat-header">
    <h2>Chat</h2>
    <div className="chat-header-buttons">
      <button>Presets</button>
      <button>Save</button>
      <button>Compare</button>
    </div>
  </div>
    <div className="chat">
      <div className='middle-container'>
      <div className="chat-interface">
      <div className="header-1">
        <select className="model-select">
          <option value="gpt-4">gpt-4</option>
          <option value="gpt-3.5">gpt-3.5</option>
        </select>
        <div className="actions">
          <button className="compare-button">Compare</button>
        </div>
      </div>
      <div className="system-message">
        <p className='para'>SYSTEM</p>
        <input type="text" placeholder="Enter system instructions" />
      </div>
      <div className="user-message">
        <input type="text" placeholder="Enter user message..." />
        <div className="buttons">
          <button className="user-button">User</button>
          <button className="add-button">Add</button>
          <button className="run-button">Run</button>
        </div>
      </div>
    </div>
      <div className="functions-panel">
      <h2>Functions</h2>
      <button className="add-function-button">+ Add function</button>
      <div className="slider">
        <label>Temperature</label>
        <input type="range" min="0" max="2" step="0.1" defaultValue="1" />
        <span className="value">1</span>
      </div>
      <div className="slider">
        <label>Maximum Tokens</label>
        <input type="range" min="0" max="4096" defaultValue="256" />
        <span className="value">256</span>
      </div>
      <div className="input-group">
        <label>Stop sequences</label>
        <input type="text" placeholder="Enter sequence and press Tab" />
      </div>
      <div className="slider">
        <label>Top P</label>
        <input type="range" min="0" max="1" step="0.01" defaultValue="1" />
        <span className="value">1</span>
      </div>
      <div className="slider">
        <label>Frequency penalty</label>
        <input type="range" min="0" max="2" step="0.1" defaultValue="0" />
        <span className="value">0</span>
      </div>
      <div className="slider">
        <label>Presence penalty</label>
        <input type="range" min="0" max="2" step="0.1" defaultValue="0" />
        <span className="value">0</span>
      </div>
      <p className="info">API and Playground requests will not be used to train our models. <a href="#">Learn more</a></p>
    </div>
      </div>
    </div>
    </div>
  );
}

export default Chat;