import React, { useState } from "react";
import useFetch from "../custom_hooks/useFetch";
import styles from "./Cart.module.css";

const Cart = (props: any) => {
  const fetchData = useFetch();
  const [address, setAddress] = useState("");
  const [shipDate, setShipDate] = useState<Date>();

  const submitCart = async () => {
    const res = await fetchData("/cart/new", "PUT", {
      productIds: props.products,
      totalCost: props.totalCost,
      shipAddress: address,
      shipDate,
    });
  };

  return (
    <>
      <div className={`row ${styles.band}`}>
        <h1 className="col-md-6">Your Cart</h1>
        <div className="col-md-3"></div>
      </div>

      <ul>
        {/* {props.products.map((product: any) => (
          <li key={product.id}>
            {product.name} - ${product.price}
          </li>
        ))} */}
      </ul>
      <p>Total Cost: ${props.totalCost}</p>
    </>
  );
};

export default Cart;
