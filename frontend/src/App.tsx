import React, { useState } from "react";
import AuthContext from "./context/authentication";
import LoginPage from "./authentication/Login";
import RegistrationPage from "./authentication/Registration";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [accessToken, setAccessToken] = useState("");
  return (
    <>
      <AuthContext.Provider value={{ accessToken, setAccessToken }}>
        <LoginPage
          showLogin={showLogin}
          setShowLogin={setShowLogin}
          showRegister={showRegister}
          setShowRegister={setShowRegister}
        ></LoginPage>
        <RegistrationPage
          showLogin={showLogin}
          setShowLogin={setShowLogin}
          showRegister={showRegister}
          setShowRegister={setShowRegister}
        ></RegistrationPage>
      </AuthContext.Provider>
    </>
  );
}

export default App;
