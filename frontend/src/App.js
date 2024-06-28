import React from 'react';
import Sidebar from './components/Sidebar';
import Chat from './components/Chat';
import Header from './components/Header';
import './App.css';

const App = () => {
  return (
    <div className="app">
      <Header />
      <div className="app-body">
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
}

export default App;