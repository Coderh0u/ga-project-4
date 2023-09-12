import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./SideBar.module.css";
import useFetch from "../custom_hooks/useFetch";

const Sidebar = (props: any) => {
  const fetchData = useFetch();
  const [cats, setCats] = useState([]); // short for categories

  // pull all categories from backend
  const getCat = async () => {
    const res = await fetchData("/products/category/all", "GET");
    if (res.ok) {
      setCats(res.data);
    }
  };
  // functifon to handle checkbox
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      props.setFilter((prevFilters: any) => [...prevFilters, e.target.value])
    } else {
      props.setFilter((prevFilter: any) =>
        prevFilter.filter((elem: string) => elem !== e.target.value)
      );
    }
  };

  useEffect(() => {
    getCat();
  }, []);
  return (
    <div className={styles.sidemenu}>
      <h2>Categories:</h2>
      {cats.map((item: any, index: number) => (
        <label key={index} className={styles.options}>
          <input type="checkbox" value={item.id} onChange={handleChange} />
          {item.category_name}
        </label>
      ))}
      {/* delete this button */}
      <button
        onClick={() => {
          console.log(props.filter);
        }}
      >
        FILTER
      </button>
    </div>
  );
};

export default Sidebar;
