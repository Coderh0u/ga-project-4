import React, { useState } from "react";
import Slider from "react-slick";
import useFetch from "../custom_hooks/useFetch";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Carousel = (props: any) => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };
  const divertToLogin = () => {
    if (!props.loginStatus) {
      props.setShowLogin(true);
    } else {
      // show product
    }
  };
  return (
    <div>
      <Slider {...settings}>
        {props.items.map((item: any, index: number) => (
          <div
            key={index}
            onClick={() => {
              divertToLogin();
              console.log("prod clicked");
              console.log(props.showLogin);
            }}
          >
            <img src={item.product_photo} />
            <h3>{item.product_name}</h3>
            <p>${item.price}</p>
            <p>Category: {item.category_name}</p>
            <p>Version: {item.prod_version}</p>
          </div>
        ))}
      </Slider>
      <div style={{ textAlign: "center" }}></div>
    </div>
  );
};

export default Carousel;
