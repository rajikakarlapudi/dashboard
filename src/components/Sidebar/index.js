import React from 'react';
import './index.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-menu">
        <div className="menu-item active">Playground</div>
        <div className="menu-item">Chat</div>
        <div className="menu-item">Assistants</div>
        <div className="menu-item">Completions</div>
        <div className="menu-item">Fine-tuning</div>
        <div className="menu-item">Batches</div>
        <div className="menu-item">Storage</div>
        <div className="menu-item">Usage</div>
        <div className="menu-item">API keys</div>
      </div>
      <div className="sidebar-footer">
        <div className="menu-item">Forum</div>
        <div className="menu-item">Help</div>
      </div>
    </div>
  );
}

export default Sidebar;