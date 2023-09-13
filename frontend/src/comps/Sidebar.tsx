import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./SideBar.module.css";
import useFetch from "../custom_hooks/useFetch";

const Sidebar = (props: any) => {
  const fetchData = useFetch();
  const [cats, setCats] = useState<any[]>([]); // short for categories
  const [vens, setVens] = useState<any[]>([]); // short for vendors

  // pull all categories from backend
  const getCat = async () => {
    const res = await fetchData("/products/category/all", "GET");
    if (res.ok) {
      setCats(res.data);
    }
  };

  // pull all vendors from backend
  const getVens = async () => {
    const res = await fetchData("/api/vendors", "GET");
    if (res.ok) {
      setVens(res.data);
    }
  };

  // function to handle checkbox categories
  const handleCatChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      props.setFilter((prevFilters: any) => [...prevFilters, e.target.value]);
    } else {
      props.setFilter((prevFilter: any) =>
        prevFilter.filter((elem: string) => elem !== e.target.value)
      );
    }
  };

  // function to handle checkbox vendors
  const handleVendorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      props.setCriteria((prevCriteria: any) => [
        ...prevCriteria,
        e.target.value,
      ]);
    } else {
      props.setCriteria((prevCriteria: any) =>
        prevCriteria.filter((elem: string) => elem !== e.target.value)
      );
    }
  };

  useEffect(() => {
    getCat();
    getVens();
  }, []);
  return (
    <div className={styles.sidemenu}>
      <h2>Categories:</h2>
      {cats.map((item: any, index: number) => (
        <label key={index} className={styles.options}>
          <input type="checkbox" value={item.id} onChange={handleCatChange} />
          {item.category_name}
        </label>
      ))}
      <br />
      <br />
      <h2>Vendors:</h2>
      {vens.map((item: any, index: number) => (
        <label key={index} className={styles.options}>
          <input
            type="checkbox"
            value={item.id}
            onChange={handleVendorChange}
          />
          {item.vendor_name}
        </label>
      ))}
    </div>
  );
};

export default Sidebar;
