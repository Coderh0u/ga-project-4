import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import AuthContext from "./context/authentication";
import LoginPage from "./authentication/Login";
import RegistrationPage from "./authentication/Registration";
import MainPage from "./comps/MainPage";
import Navbar from "./comps/Navbar";
import ExplorePage from "./comps/ExplorePage";
import User from "./comps/User";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [loginStatus, setLoginStatus] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [accessToken, setAccessToken] = useState("");
  return (
    <>
      <AuthContext.Provider value={{ accessToken, setAccessToken }}>
        <header style={{padding: '8px', height: '60px', overflow: 'visible'}}>
          <Navbar
            setShowLogin={setShowLogin}
            loginStatus={loginStatus}
            setShowRegister={setShowRegister}
          ></Navbar>
        </header>

        <div style={{top: '60px', position: 'relative'}}>
          <Routes>
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
            <Route
              path="/explore"
              element={<ExplorePage></ExplorePage>}
            ></Route>
            <Route path="/user" element={<User></User>}></Route>
          </Routes>
        </div>
        {showRegister && (
          <RegistrationPage
            showLogin={showLogin}
            setShowLogin={setShowLogin}
            showRegister={showRegister}
            setShowRegister={setShowRegister}
          ></RegistrationPage>
        )}
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
      </AuthContext.Provider>
    </>
  );
}

export default App;
