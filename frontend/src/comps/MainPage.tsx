import React, { useEffect, useState } from "react";
import useFetch from "../custom_hooks/useFetch";
import styles from "./MainPage.module.css";
import Carousel from "./Slider";

const MainPage = (props: any) => {
  const fetchData = useFetch();
  const [items, setItems] = useState([]);

  const getProducts = async () => {
    const res = await fetchData("/products/all", "POST", {
      limit: 10,
    });
    if (res.ok) {
      console.log(res);
      setItems(res.data);
    }
  };
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <img src="../images/banner.png" className={styles.banner} />
      {items.length > 0 && (
        <Carousel
          items={items}
          loginStatus={props.loginStatus}
          setShowLogin={props.setShowLogin}
          showLogin={props.showLogin}
        ></Carousel>
      )}
    </>
  );
};

export default MainPage;
