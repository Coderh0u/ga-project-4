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
    <div style={{ marginTop: "5px", overflowX: "hidden", overflowY: "hidden" }}>
      <Slider {...settings}>
        {props.items.map((item: any, index: number) => (
          <ItemCard
            divertToLogin={divertToLogin}
            products={props.products}
            totalCost={props.totalCost}
            setProducts={props.setProducts}
            setTotalCost={props.setTotalCost}
          >
            {item}
          </ItemCard>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
