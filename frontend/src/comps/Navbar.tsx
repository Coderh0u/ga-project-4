import React from "react";
import { Link, NavLink } from "react-router-dom";
import styles from "./NavBar.module.css";

const Navbar = (props: any) => {
  return (
    <header className={styles.navbar}>
      <div className={styles.navlinks}>
        <NavLink className={styles.links} to="/">
          <span className={styles.title}>HOU-ASSEMBLY</span>
        </NavLink>
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
        {/* <NavLink to="/cart">
          <img src="../../images/cart-icon.png" className={styles.icon} />
        </NavLink> */}
        {props.loginStatus ? (
          <NavLink to="/cart">
            <img src="../../images/cart-icon.png" className={styles.icon} />
          </NavLink>
        ) : (
          ""
        )}
      </div>
    </header>
  );
};

export default Navbar;
