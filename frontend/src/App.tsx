import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import AuthContext from "./context/authentication";
import LoginPage from "./authentication/Login";
import RegistrationPage from "./authentication/Registration";
import MainPage from "./comps/MainPage";
import Navbar from "./comps/Navbar";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [loginStatus, setLoginStatus] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [accessToken, setAccessToken] = useState("");
  return (
    <>
      <Router>
        <AuthContext.Provider value={{ accessToken, setAccessToken }}>
          <Navbar
            setShowLogin={setShowLogin}
            loginStatus={loginStatus}
          ></Navbar>
          <Routes>
            <Route
              path="/landing/registration"
              element={
                <RegistrationPage
                  showLogin={showLogin}
                  setShowLogin={setShowLogin}
                  showRegister={showRegister}
                  setShowRegister={setShowRegister}
                ></RegistrationPage>
              }
            ></Route>
            <Route
              path="/"
              element={
                <MainPage
                  showLogin={showLogin}
                  loginStatus={loginStatus}
                  setShowLogin={setShowLogin}
                ></MainPage>
              }
            ></Route>
          </Routes>
        </AuthContext.Provider>
      </Router>
      {showLogin && (
        <LoginPage
          showLogin={showLogin}
          setShowLogin={setShowLogin}
          setLoginStatus={setLoginStatus}
          showRegister={showRegister}
          setShowRegister={setShowRegister}
          loginStatus={loginStatus}
        ></LoginPage>
      )}
    </>
  );
}

export default App;
