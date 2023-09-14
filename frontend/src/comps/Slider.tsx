import React, { useState } from "react";
import Slider from "react-slick";
import useFetch from "../custom_hooks/useFetch";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ItemCard from "./ItemCard";

const Carousel = (props: any) => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 4,
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
            }}
          >
            {<ItemCard>{item}</ItemCard>}
          </div>
        ))}
      </Slider>
      <div style={{ textAlign: "center" }}></div>
    </div>
  );
};

export default Carousel;
