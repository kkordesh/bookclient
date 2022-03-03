import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Auth from './components/Auth/Auth';
import {BrowserRouter as Router} from 'react-router-dom';

const App = () => {
  const [token, setToken] = useState<string|null>("");

  const updateLocalStorage = (newToken: string) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
  }
}, []);
const clearLocalStorage = () => {
  localStorage.clear();
  setToken("");
};



  return (
    <div className="App">
       <Router>
        { token ? (
          <Navbar clearLocalStorage = {
            clearLocalStorage} token={token}/>
          ) : ( 
              <Auth updateLocalStorage = {
                updateLocalStorage} token = {token}  /> 
         )};
      
         </Router> 
    </div>
  );
}

export default App;
