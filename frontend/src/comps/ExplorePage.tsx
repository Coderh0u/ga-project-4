import React, { useEffect, useState } from "react";
import useFetch from "../custom_hooks/useFetch";
import ItemCard from "./ItemCard";
import styles from "./Explore.module.css";
import Sidebar from "./Sidebar";

const fetchData = useFetch();

const ExplorePage = () => {
  const [items, setItems] = useState([]);
  const [criteria, setCriteria] = useState([]);
  const [filter, setFilter] = useState<any[]>([]);
  const getData = async () => {
    try {
      const res = await fetchData("/products/all", "POST", {
        limit: undefined,
        filter: filter.length ? filter : null,
      });
      console.log(res);
      if (res.ok) {
        console.log("getData pass");
        console.log("filter", filter);
        setItems(res.data);
      }
    } catch (error: any) {
      console.error("error: ", error);
    }
  };

  useEffect(() => {
    console.log("filter");
    getData();
  }, [filter]);
  return (
    <>
      <Sidebar
        setCriteria={setCriteria}
        setFilter={setFilter}
        criteria={criteria}
        filter={filter}
      ></Sidebar>
      <div className={styles.container}>
        {items.map((item: any, index: number) => (
          <div key={index} className={styles.itemCard}>
            {<ItemCard>{item}</ItemCard>}
          </div>
        ))}
        {/* delete this button */}
        <button
          style={{ color: "red", height: "40px" }}
          onClick={() => {
            filter.push("one");
          }}
        >
          push filter
        </button>
      </div>
    </>
  );
};

export default ExplorePage;
