import React, { useState, useEffect, useContext } from "react";
import ReactDOM from "react-dom";
import styles from "./ActionModal.module.css";
import AuthContext from "../context/authentication";
const authRoot = document.querySelector<HTMLDivElement>("#auth-root")!;
import useFetch from "../custom_hooks/useFetch";
import FileUpload from "./FileUpload";

const EditModal = (props: any) => {
  const auth = useContext(AuthContext);
  const [image, setImage] = useState<string | null>("");
  const [catRange, setCatRange] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number>();
  const [cat, setCat] = useState("");
  const [desc, setDesc] = useState("");
  // const [secondHand, setSecondhand] = useState(props.item.is_secondHand);
  const fetchData = useFetch();
  const item = props.children;

  const editProduct = async () => {
    const res = await fetchData(
      "/products/edit",
      "PATCH",
      {
        productId: props.item.id,
        productName: name || null,
        price: price || null,
        productCategory: cat || null,
        productDesc: desc || null,
        productPhoto: image || null,
        // secondHand,
      },
      auth.accessToken
    );
  };

  return (
    <>
      {ReactDOM.createPortal(
        <div className={styles.backdrop}>
          <div className={styles.editModal}>
            <div className={`container ${styles.details}`}>
              {/* image */}
              <FileUpload setImage={setImage}></FileUpload>
              <div className={`row`}>
                {/* name */}
                <h5 className="col-md-4">Product Name:</h5>
                <input
                  className={` col-md-8 ${styles.inputField}`}
                  type="text"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  placeholder={item.product_name}
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
                  rows={4}
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
                  className="col-md-1"
                ></input>
                <div className="col-md-1"></div>

                {/* update button */}
                <button
                  onClick={() => {
                    editProduct();
                    props.setEditModal(false);
                  }}
                  className={`col-md-3 ${styles.update}`}
                >
                  Update
                </button>
                <div className="col-md-1"></div>
                {/* cancel update */}
                <button
                  onClick={() => {
                    props.setEditModal(false);
                  }}
                  className={`col-md-2 ${styles.update}`}
                  style={{ right: "0", position: "relative" }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>,
        authRoot
      )}
    </>
  );
};

export default EditModal;
