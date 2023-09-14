import React, { useEffect, useState } from "react";
import useFetch from "../custom_hooks/useFetch";
import styles from "./Cart.module.css";

const Cart = (props: any) => {
  const fetchData = useFetch();
  const [address, setAddress] = useState("");
  const [shipDate, setShipDate] = useState<Date>();
  const products = props.products;
  const [productArray, setProductArray] = useState<any[]>([]);
  const [items, setItems] = useState<any[]>([]);

  const submitCart = async () => {
    const res = await fetchData("/cart/new", "PUT", {
      productIds: productArray,
      totalCost: props.totalCost,
      shipAddress: address,
      shipDate,
    });
  };

  const compileCart = async () => {
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

    const itemDataPromises = result.map(async (product) => {
      const res = await fetchData("/cart/products", "POST", {
        prodId: product.id,
      });
      if (res.ok) {
        return res.data;
      }
    });
    const itemData = (await Promise.all(itemDataPromises)).flat();
    setItems(itemData);
  };

  useEffect(() => {
    compileCart();
  }, [props.products]);

  return (
    <>
      <div className={`row ${styles.band}`}>
        <h1 className="col-md-6">Your Cart</h1>
        <div className="col-md-3">
          <button
            onClick={() => {
              console.log(productArray);
              console.log(items);
            }}
          >
            tester
          </button>
        </div>
      </div>
      <div className={`row ${styles.contents}`}>
        <div className={styles.products}>
          {items.map((item: any, idx: number) => (
            <div key={idx} className={styles.itemCard}>
              <div style={{ padding: "3px" }} className={styles.card}>
                {/* images */}
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <img
                    src={item.product_photo}
                    alt={item.product_name}
                    style={{ maxWidth: "100%", height: "200px" }}
                  />
                </div>
                <div className="row" style={{ height: "50px" }}>
                  {/* product name */}
                  <h4 className="col-sm-6">{item.product_name}</h4>
                  {/* secondhand */}
                  {item.is_secondhand && (
                    <p
                      className="col-sm-6"
                      style={{
                        textAlign: "right",
                        fontSize: "15px",
                        color: "#c20f08",
                      }}
                    >
                      (Secondhand)
                    </p>
                  )}
                </div>
                <hr style={{ color: "#c20f08" }} />
                <div style={{ height: "40px" }}>
                  {/* description */}
                  <p>{item.prod_desc}</p>
                </div>
                <p>
                  {/* price */}
                  <span style={{ fontWeight: "bold", color: "#c20f08" }}>
                    Price:
                  </span>
                  ${item.price}
                </p>
                <div className="row">
                  {/* category */}
                  <p className="col-sm-8">
                    <span style={{ fontWeight: "bold", color: "#c20f08" }}>
                      Category:
                    </span>
                    {item.category_name}
                  </p>
                </div>
                <div className={styles.actionButtons}>
                  {/* delete button */}
                  <button>
                    <img
                      src="../../images/delete.png"
                      className={styles.icon}
                    />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Cart;
