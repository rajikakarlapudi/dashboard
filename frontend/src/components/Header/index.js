import React from 'react';
import './index.css';

const Header = () => {
  return (
    <div className="header">
      <div className="header-title">Mobishaala / ExamGPT</div>
      <div className="header-options">
        <div className="header-option">Dashboard</div>
        <div className="header-option">Docs</div>
        <div className="header-option">API reference</div>
      </div>
      <div className="header-settings">
        <img src="settings-icon.png" alt="Settings" />
        <img src="profile-icon.png" alt="Profile" />
      </div>
    </div>
  );
}

export default Header;