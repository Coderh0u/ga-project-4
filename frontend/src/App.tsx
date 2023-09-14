import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import AuthContext from "./context/authentication";
import LoginPage from "./authentication/Login";
import RegistrationPage from "./authentication/Registration";
import MainPage from "./comps/MainPage";
import Navbar from "./comps/Navbar";
import ExplorePage from "./comps/ExplorePage";
import User from "./comps/User";
import Cart from "./comps/Cart";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [loginStatus, setLoginStatus] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [accessToken, setAccessToken] = useState("");
  const [userRole, setUserRole] = useState("");
  const [totalCost, setTotalCost] = useState(0);
  const [products, setProducts] = useState<string[]>([]);
  return (
    <>
      <AuthContext.Provider
        value={{
          accessToken,
          setAccessToken,
          userRole,
          setUserRole,
          totalCost,
          setTotalCost,
          products,
          setProducts,
        }}
      >
        <header style={{ padding: "8px", height: "60px", overflow: "visible" }}>
          <Navbar
            setShowLogin={setShowLogin}
            loginStatus={loginStatus}
            setShowRegister={setShowRegister}
            products={products}
            setProducts={setProducts}
            totalCost={totalCost}
          ></Navbar>
        </header>

        <div style={{ top: "60px", position: "relative" }}>
          <Routes>
            <Route
              path="/"
              element={
                <MainPage
                  showLogin={showLogin}
                  loginStatus={loginStatus}
                  setShowLogin={setShowLogin}
                  products={products}
                  totalCost={totalCost}
                  setProducts={setProducts}
                  setTotalCost={setTotalCost}
                ></MainPage>
              }
            ></Route>
            <Route
              path="/explore"
              element={
                <ExplorePage
                  products={products}
                  totalCost={totalCost}
                  setProducts={setProducts}
                  setTotalCost={setTotalCost}
                ></ExplorePage>
              }
            ></Route>
            <Route path="/user" element={<User></User>}></Route>
            <Route
              path="/cart"
              element={
                <Cart
                  products={products}
                  totalCost={totalCost}
                  setProducts={setProducts}
                  setTotalCost={setTotalCost}
                ></Cart>
              }
            ></Route>
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
