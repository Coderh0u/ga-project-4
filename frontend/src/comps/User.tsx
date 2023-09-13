import React, { useState, useEffect, useContext } from "react";
import useFetch from "../custom_hooks/useFetch";
import AuthContext from "../context/authentication";
import styles from "./User.module.css";
import AddProduct from "./AddProduct";

const User = () => {
  const auth = useContext(AuthContext);
  const [userName, setUserName] = useState("");
  const [orderHist, setOrderHist] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const fetchData = useFetch();

  const getUser = async () => {
    const res = await fetchData(
      "/auth/user",
      "POST",
      undefined,
      auth.accessToken
    );
    if (res.ok) {
      setUserName(res.data.userData.rows[0].username);
    }
  };
  useEffect(() => {
    getUser();
  }, []);
  return (
    <>
      <div className={`row ${styles.band}`}>
        <h1 className="col-md-6">
          <span>Hi</span> {userName}
        </h1>
        <div className="col-md-3"></div>
        <button
          className="col-md-2"
          onClick={() => {
            setShowModal(true);
          }}
        >
          Add product for sale
        </button>
      </div>
      {showModal && <AddProduct setShowModal={setShowModal}></AddProduct>}
    </>
  );
};

export default User;
