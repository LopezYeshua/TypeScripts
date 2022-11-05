import Login from "./views/Login";
import './App.css';
import {
  Routes, Route
} from 'react-router-dom';
import {
  useTheme,
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
  useMediaQuery,
  CssBaseline
} from '@mui/material'
import { deepmerge } from '@mui/utils'
import { getDesignTokens, getThemedComponents } from "./theme/Theme";
import Dashboard from "./views/Dashboard";
import Cookies from 'universal-cookie'
import jwt from 'jwt-decode'
import { useState, useMemo, useEffect } from 'react'
import { LoggedinContext } from './context/LoggedinContext'
import { ColorModeContext } from './context/ColorModeContext'
import UserProfile from "./views/UserProfile";


function App() {
  const [mode, setMode] = useState()
  const prefersLightMode = useMediaQuery('(prefers-color-scheme: light)')

  useEffect(() => {
    setMode(prefersLightMode ? 'light' : 'dark')
  }, [prefersLightMode])

  const colorMode = useMemo(() => ({
    toggleColorMode: () => {
      setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light')) // setMode will return the previous
    }
  }), []
  )

  let theme = useMemo(
    () => 
    createTheme(deepmerge(getDesignTokens(mode), getThemedComponents(mode))), [mode])

  theme = responsiveFontSizes(theme)


  // initialize the login status on the jwt token
  const cookies = new Cookies();
  const token = cookies.get('usertoken');
  let tempLoggedIn = false;
  let tempLoggedInId = null;
  let tempLoggedInUsername = null
  if (token) { // if token exists, continue
    if (jwt(token).id) { // if token has id, continue
      tempLoggedIn = true;
      tempLoggedInId = jwt(token).id
    }
  }

  const [loggedinInfo, setLoggedinInfo] = useState({
    loggedin :tempLoggedIn,
    loggedinId : tempLoggedInId,
    loggedinUsername : tempLoggedInUsername,
  })

  return (
    <>
    {/* LoggedinInfo is used across all routes to hold the user login status */}
      <LoggedinContext.Provider value={{loggedinInfo, setLoggedinInfo}}>
          <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Dashboard />} />
                <Route path="/:id" element={<UserProfile />} />
              </Routes>
            </ThemeProvider>
          </ColorModeContext.Provider>
      </LoggedinContext.Provider>
    </>
  );
}

export default App;
