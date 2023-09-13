import { useContext, useState, useRef } from "react";
import ReactDOM from "react-dom";
import useFetch from "../custom_hooks/useFetch";
import styles from "./Modal.module.css";

const fetchData = useFetch();

const RegistrationPage = (props: any) => {
  const [role, setRole] = useState("user");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [vendorName, setVendorName] = useState("");
  const [error1, setError1] = useState("");
  const [error2, setError2] = useState("");
  const authRoot = document.querySelector<HTMLDivElement>("#auth-root")!;

  const RegisterClick = async () => {
    if (role === "user") {
      const res = await fetchData(`/auth/register/user`, "PUT", {
        username,
        password,
      });
      if (res.ok) {
        props.setShowRegister(false);
        props.setShowLogin(true);
      } else {
        if (res.data.errors.length > 2) {
          setError1(res.data.errors[0].msg);
          setError2(res.data.errors[1].msg);
          return;
        }
        if (res.data.errors.length === 1 && username.length === 0) {
          setError1(res.data.errors[0].msg);
          return;
        }
        if (res.data.errors.length === 1 && password.length === 0) {
          setError2(res.data.errors[0].msg);
          return;
        }
      }
    }

    if (role === "vendor") {
      const res = await fetchData(`/auth/register/vendor`, "PUT", {
        username,
        password,
        vendorName,
      });
      if (res.ok) {
        props.setShowRegister(false);
        props.setShowLogin(true);
      } else {
        if (res.data.errors.length > 2) {
          setError1(res.data.errors[0].msg);
          setError2(res.data.errors[1].msg);
          return;
        }
        if (res.data.errors.length === 1 && username.length === 0) {
          setError1(res.data.errors[0].msg);
          return;
        }
        if (res.data.errors.length === 1 && password.length === 0) {
          setError2(res.data.errors[0].msg);
          return;
        }
      }
    }
  };
  return (
    <>
      {ReactDOM.createPortal(
        <div className={styles.backdrop}>
          <div className={styles.modal}>
            <button
              className={styles.closeButton}
              onClick={() => {
                props.setShowRegister(false);
              }}
            >
              <img src="../../images/close.png" className={styles.close} />
            </button>
            <div className={styles.loginDetails}>
              <div>
                <div>Username:</div>
                <input
                  type="text"
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setError1("");
                    setError2("");
                  }}
                ></input>
                {error1 ? (
                  <p style={{ color: "red", margin: "0" }}>{error1}</p>
                ) : (
                  <div style={{ height: "36px", margin: "0" }}></div>
                )}
              </div>
              <div>
                <div>Password:</div>
                <input
                  type="text"
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError1("");
                    setError2("");
                  }}
                ></input>
                {error2 ? (
                  <p style={{ color: "red", margin: "0" }}>{error2}</p>
                ) : (
                  <div style={{ height: "36px", margin: "0" }}></div>
                )}
              </div>
              <div>Choose an account type:</div>
              <select
                onChange={(e) => {
                  setRole(e.target.value);
                }}
              >
                <option value="user">Standard</option>
                <option value="vendor">Corporate</option>
              </select>
              {role === "vendor" ? (
                <input
                  type="text"
                  onChange={(e) => {
                    setVendorName(e.target.value);
                  }}
                ></input>
              ) : null}
              <br />
              <button
                onClick={() => {
                  RegisterClick();
                }}
              >
                Register Account
              </button>
            </div>
          </div>
        </div>,
        authRoot
      )}
    </>
  );
};

export default RegistrationPage;
