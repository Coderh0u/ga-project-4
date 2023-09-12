import React from "react";
import useFetch from "./custom_hooks/useFetch";


const fetchData = useFetch();

const landing = async () => {
  return (
    <>
      <img src="../images/banner.png" />
      <img src = "../images/user-icon.png" />
    </>
  );
};

export default landing;
