import React from 'react';
import logo from './logo.svg';
import './utils/firebase';
import AppRouter from './routes/AppRouter';

function App() {
  return (
    <div className="App">
      <AppRouter/>
    </div>
  );
}

export default App;
