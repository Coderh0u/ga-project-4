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
    const res = await fetchData("/products/all", "POST", {
      criteria: criteria,
      limit: undefined,
    });
    if (res.ok) {
      setItems(res.data);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <Sidebar setCriteria={setCriteria} filter={filter}></Sidebar>
      <div className={styles.container}>
        {items.map((item: any, index: number) => (
          <div key={index} className={styles.itemCard}>
            {<ItemCard>{item}</ItemCard>}
          </div>
        ))}
      </div>
    </>
  );
};

export default ExplorePage;
