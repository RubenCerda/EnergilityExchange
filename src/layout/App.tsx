import React from 'react';
import './App.css';
import RoutesApp from './routes';
import {BrowserRouter as Router} from "react-router-dom";
const App = () => {
    return (
      <Router>
        <RoutesApp/>
      </Router>
  );
  
}

export default App;
