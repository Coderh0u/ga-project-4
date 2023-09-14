import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./NavBar.module.css";

const Navbar = (props: any) => {
  return (
    <div className={styles.navlinks}>
      <NavLink to="/">
        <img src="../../images/title.png" className={styles.title} />
      </NavLink>

      {props.loginStatus ? (
        <NavLink className={styles.links} to="/explore">
          Shop
        </NavLink>
      ) : (
        <NavLink className={styles.links} to="/">
          <p onClick={props.setShowLogin}>Shop</p>
        </NavLink>
      )}
      {props.loginStatus ? (
        <NavLink to="/user">
          <img src="../../images/user-icon.png" className={styles.icon} />
        </NavLink>
      ) : (
        <NavLink to="/">
          <img
            src="../../images/user-icon.png"
            className={styles.icon}
            onClick={props.setShowLogin}
          />
        </NavLink>
      )}

      {props.loginStatus ? (
        <NavLink to="/cart">
          <img src="../../images/cart-icon.png" className={styles.icon} />
        </NavLink>
      ) : (
        <NavLink to="/">
          <p
            onClick={() => {
              props.setShowRegister(true);
            }}
          >
            Register
          </p>
        </NavLink>
      )}
    </div>
  );
};

export default Navbar;
