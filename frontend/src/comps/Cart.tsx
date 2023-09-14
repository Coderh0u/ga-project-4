import React, { useEffect, useState } from "react";
import useFetch from "../custom_hooks/useFetch";
import styles from "./Cart.module.css";

const Cart = (props: any) => {
  const fetchData = useFetch();
  const [address, setAddress] = useState("");
  const [shipDate, setShipDate] = useState<Date>();
  const products = props.products;
  const [productArray, setProductArray] = useState<any[]>([]);

  const submitCart = async () => {
    const res = await fetchData("/cart/new", "PUT", {
      productIds: props.products,
      totalCost: props.totalCost,
      shipAddress: address,
      shipDate,
    });
  };

  const compileCart = () => {
    const counts: Record<string, number> = {};
    for (let product of products) {
      if (!counts[product]) {
        counts[product] = 1;
      } else {
        counts[product]++;
      }
    }
    const result: { id: string; count: number }[] = Object.entries(counts).map(
      ([id, count]) => ({ id, count })
    );
    setProductArray(result);
  };

  useEffect(() => {
    compileCart();
  }, []);

  return (
    <>
      <div className={`row ${styles.band}`}>
        <h1 className="col-md-6">Your Cart</h1>
        <div className="col-md-3"></div>
      </div>
      <div className={`row ${styles.contents}`}>
        <div className={styles.products}>
          <button
            onClick={() => {
              console.log(productArray);
            }}
          >
            tester
          </button>
        </div>
      </div>
    </>
  );
};

export default Cart;
