import Main from "./views/Main";
import './App.css';
import {
  Routes,
  Route,
} from 'react-router-dom';
import Dashboard from "./views/Dashboard";
import Cookies from 'universal-cookie'
import jwt from 'jwt-decode'
import { useState } from 'react'
import { LoggedinContext } from './context/LoggedinContext'

function App() {

  // initialize the login status on the jwt token
  const cookies = new Cookies();
  const token = cookies.get('usertoken');
  let tempLoggedIn = false;
  let tempLoggedInId = null;
  if (token) { // if token exists, continue
    if (jwt(token).id) { // if token has id, continue
      tempLoggedIn = true;
      tempLoggedInId = jwt(token).id
    }
  }

  const [loggedinInfo, setLoggedinInfo] = useState({
    loggedin :tempLoggedIn,
    loggedinId : tempLoggedInId,
    loggedinUsername : null,
    loadingUser: false
  })

  return (
    <>
    {/* LoggedinInfo is used across all routes to hold the user login status */}
      <LoggedinContext.Provider value={{loggedinInfo, setLoggedinInfo}}>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
      </LoggedinContext.Provider>
    </>
  );
}

export default App;
