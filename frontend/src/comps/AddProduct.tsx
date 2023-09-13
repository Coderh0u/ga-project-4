import React, { useState, useEffect, useContext } from "react";
import ReactDOM from "react-dom";
import useUpload from "../custom_hooks/upload";
import useFetch from "../custom_hooks/useFetch";
import AuthContext from "../context/authentication";
import styles from "./AddProd.module.css";

const AddProduct = (props: any) => {
  const auth = useContext(AuthContext);
  const [image, setImage] = useState<File | null>(null);
  const [uploadRes, setUploadRes] = useState<any | null>(null);
  const [catRange, setCatRange] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number>();
  const [cat, setCat] = useState("");
  const [desc, setDesc] = useState("");
  const [secondHand, setSecondhand] = useState(false);
  const fetchData = useFetch();
  const authRoot = document.querySelector<HTMLDivElement>("#auth-root")!;

  const addProduct = async () => {
    const res = await fetchData("/products/new", "PUT", {
      productName: name,
      price,
      productCategory: cat,
      productDesc: desc,
      productPhoto: image,
      secondHand,
    });
  };

  const getCat = async () => {
    const res = await fetchData("/products/category/all", "GET");
    if (res.ok) {
      setCatRange(res.data);
    }
  };
  const handleCatChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCat(event.target.value);
    console.log(cat);
  };

  useEffect(() => {
    getCat();
  }, []);
  return (
    <>
      {ReactDOM.createPortal(
        <div className={styles.backdrop}>
          <div className={styles.modal}>
            {/* close modal */}
            <button
              className={styles.closeButton}
              onClick={() => {
                props.setShowModal(false);
              }}
            >
              <img src="../../images/close.png" className={styles.close} />
            </button>
            {/* image */}
            <div className={`container ${styles.file}`}></div>
            {/* name */}
            <div className={`container ${styles.details}`}>
              <div className={`row`}>
                <h5 className="col-md-4">Product Name:</h5>
                <input
                  className={` col-md-8 ${styles.inputField}`}
                  type="text"
                  onChange={(e) => {
                    setName(e.target.value);
                    console.log(name);
                  }}
                />
              </div>
              {/* price */}
              <div className="row">
                <h5 className="col-md-4">Price:</h5>
                <div className="col-md-8">
                  <div className="row">
                    <h4 className="col-md-1">$</h4>
                    <input
                      className={`col-md-11 ${styles.inputField}`}
                      type="number"
                      step="0.01"
                      onChange={(e) => {
                        setPrice(parseFloat(e.target.value));
                      }}
                    />
                  </div>
                </div>
              </div>
              {/* category */}
              <div className="row">
                <h5 className="col-md-4">Category: </h5>
                <select className="col-md-8" onChange={handleCatChange}>
                  {catRange.map((item: any, idx: number) => (
                    <option key={idx} value={item.id}>
                      {item.category_name}
                    </option>
                  ))}
                </select>
              </div>
              {/* description */}
              <div className="row">
                <h5 className="col-md-4">Description: </h5>
                <textarea
                  className={`col-md-8 `}
                  rows={10}
                  onChange={(e) => {
                    setDesc(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
        </div>,
        authRoot
      )}
    </>
  );
};

export default AddProduct;
