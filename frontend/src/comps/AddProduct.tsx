import React, { useState, useEffect, useContext } from "react";
import ReactDOM from "react-dom";
import useFetch from "../custom_hooks/useFetch";
import AuthContext from "../context/authentication";
import styles from "./AddProd.module.css";
import FileUpload from "./FileUpload";

const AddProduct = (props: any) => {
  const auth = useContext(AuthContext);
  const [image, setImage] = useState<string | null>("");
  const [catRange, setCatRange] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number>();
  const [cat, setCat] = useState("");
  const [desc, setDesc] = useState("");
  const [secondHand, setSecondhand] = useState(false);
  const [addSuccess, setAddSuccess] = useState(false);
  const fetchData = useFetch();
  const authRoot = document.querySelector<HTMLDivElement>("#auth-root")!;

  const addProduct = async () => {
    const res = await fetchData(
      "/products/new",
      "PUT",
      {
        productName: name,
        price,
        productCategory: cat,
        productDesc: desc,
        productPhoto: image,
        secondHand,
      },
      auth.accessToken
    );
    if (res.ok) {
      setAddSuccess(true);
    }
  };

  const getCat = async () => {
    const res = await fetchData("/products/category/all", "GET");
    if (res.ok) {
      setCatRange(res.data);
    }
  };

  useEffect(() => {
    getCat();
  }, []);
  return (
    <>
      {ReactDOM.createPortal(
        addSuccess ? (
          // successfully uploaded
          <div className={styles.backdrop}>
            <div className={styles.modal}>
              <button
                className={styles.closeButton}
                onClick={() => {
                  props.setShowModal(false);
                  setAddSuccess(false);
                  setImage(null);
                  setName("");
                  setPrice(0);
                  setCat("");
                  setDesc("");
                  setSecondhand(false);
                  props.setRerender(!props.rerender);
                  console.log(props.rerender);
                }}
              >
                <img src="../../images/close.png" className={styles.close} />
              </button>
              <h1 className={styles.success}>Successfully added product</h1>
            </div>
          </div>
        ) : (
          <>
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
                <div className={`container ${styles.file}`}>
                  <FileUpload setImage={setImage}></FileUpload>
                </div>
                {/* name */}
                <div className={`container ${styles.details}`}>
                  <div className={`row`}>
                    <h5 className="col-md-4">Product Name:</h5>
                    <input
                      className={` col-md-8 ${styles.inputField}`}
                      type="text"
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />
                  </div>
                  {/* price */}
                  <div className="row">
                    <h5 className="col-md-4">Price:</h5>
                    <div className="col-md-8">
                      <div className="row">
                        <h4 className="col-md-1" style={{ color: "black" }}>
                          $
                        </h4>
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
                    <select
                      className="col-md-8"
                      onChange={(e) => setCat(e.target.value)}
                    >
                      <option value=""></option>
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
                      rows={8}
                      onChange={(e) => {
                        setDesc(e.target.value);
                      }}
                    />
                  </div>
                  {/* secondhand */}
                  <div className="row">
                    <h5 className="col-md-4">Secondhand: </h5>
                    <input
                      type="checkbox"
                      value={undefined}
                      onChange={() => setSecondhand(!secondHand)}
                      className="col-md-8"
                    ></input>
                  </div>
                  {/* submit button */}
                  <div className="row">
                    <div className="col-md-9"></div>
                    <button
                      onClick={() => {
                        addProduct();
                      }}
                      className={`col-md-3 ${
                        name && price && cat && desc
                          ? styles.submit
                          : styles.disabled
                      }`}
                      disabled={name && price && cat && desc ? false : true}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        ),
        authRoot
      )}
    </>
  );
};

export default AddProduct;
