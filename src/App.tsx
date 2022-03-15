import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Auth from './components/Auth/Auth';
import {BrowserRouter as Router} from 'react-router-dom';

const App = () => {
  const [token, setToken] = useState<string|null>("");
  const [userId, setUserId] = useState('');
  const [userName, setUserName] = useState('');
  const [isAdmin, setisAdmin] = useState("");
  


  const updateLocalStorage = (newToken: string, storedId: string, storedName: string, storedAdmin: string) => {
    localStorage.setItem("token", newToken);
    localStorage.setItem("userId", storedId);
    localStorage.setItem("userName", storedName)
    localStorage.setItem('isAdmin', storedAdmin)
    setToken(newToken);
    setUserId(storedId);
    setUserName(storedName);
    setisAdmin(storedAdmin)
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
  }
    if (localStorage.getItem("userId")) {
      setUserId(String(localStorage.getItem("userId")));
  }
    if (localStorage.getItem("userName")) {
      setUserName(String(localStorage.getItem("userName")));
    }
    if (localStorage.getItem("isAdmin")) {
      setisAdmin(String(localStorage.getItem("isAdmin")))
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
         )}

         
      
         </Router> 
    </div>
  );
}

export default App;
