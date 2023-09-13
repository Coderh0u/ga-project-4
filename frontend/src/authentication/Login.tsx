import { useState, useContext } from "react";
import ReactDOM from "react-dom";
import AuthContext from "../context/authentication";
import useFetch from "../custom_hooks/useFetch";
import styles from "./Modal.module.css";
import { useNavigate } from "react-router-dom";

const fetchData = useFetch();

const LoginPage = (props: any) => {
  const auth = useContext(AuthContext);
  const [role, setRole] = useState("user");
  const [username, setUsername] = useState("plswork");
  const [password, setPassword] = useState("password");
  const [error1, setError1] = useState("");
  const [error2, setError2] = useState("");
  const authRoot = document.querySelector<HTMLDivElement>("#auth-root")!;
  const navigate = useNavigate();
  const loginClick = async () => {
    const res = await fetchData(`/auth/login/${role}`, "POST", {
      username,
      password,
    });
    if (res.ok) {
      console.log(res.data.accessToken);
      if (res.data.accessToken) {
        auth.setAccessToken(res.data.accessToken);
        props.setShowLogin(false);
        props.setLoginStatus(true);
        navigate("/explore");
      } else {
        // displaying error messages
        console.log(res.data);
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
                props.setShowLogin(false);
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
              <br />
              <select
                onChange={(e) => {
                  setRole(e.target.value);
                }}
              >
                <option value="user">Standard</option>
                <option value="vendor">Corporate</option>
              </select>
              <br />
              <button
                onClick={() => {
                  loginClick();
                  console.log("clicked");
                }}
              >
                Log In
              </button>
              <br />

              <button
                onClick={() => {
                  props.setShowLogin(false);
                  props.setShowRegister(true);
                }}
              >
                Register
              </button>
            </div>
          </div>
        </div>,
        authRoot
      )}
    </>
  );
};

export default LoginPage;
