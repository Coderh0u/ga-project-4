import React, { useState, useEffect, useContext } from "react";
import ReactDOM from "react-dom";
import styles from "./ActionModal.module.css";
import AuthContext from "../context/authentication";
const authRoot = document.querySelector<HTMLDivElement>("#auth-root")!;
import useFetch from "../custom_hooks/useFetch";
import FileUpload from "./FileUpload";

const EditModal = (props: any) => {
  const item = props.children;
  const auth = useContext(AuthContext);
  const [image, setImage] = useState<string | null>("");
  const [catRange, setCatRange] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number>();
  const [cat, setCat] = useState("");
  const [desc, setDesc] = useState("");
  const [secondHand, setSecondhand] = useState(item.is_secondhand);
  const [updateSucess, setUpdateSuccess] = useState(false);
  const fetchData = useFetch();

  const editProduct = async () => {
    const res = await fetchData(
      "/products/edit",
      "PATCH",
      {
        productId: item.id,
        productName: name ? name : item.product_name,
        price: price ? price : item.price,
        productCategory: cat ? cat : item.prod_category,
        productDesc: desc ? desc : item.prod_desc,
        productPhoto: image ? image : item.product_photo,
        secondHand,
      },
      auth.accessToken
    );
    if (res.ok) {
      setUpdateSuccess(true);
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
        updateSucess ? (
          // successfully uploaded
          <div className={styles.backdrop}>
            <div className={styles.modal}>
              <button
                className={styles.closeButton}
                onClick={() => {
                  props.setShowModal(false);
                  setUpdateSuccess(false);
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
                    defaultChecked={secondHand}
                    onChange={() => setSecondhand(!secondHand)}
                    className="col-md-1"
                  ></input>
                  <div className="col-md-1"></div>

                  {/* update button */}
                  <button
                    onClick={() => {
                      editProduct();
                      props.setEditModal(false);
                      props.setRerender(!props.rerender);
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
          </div>
        ),
        authRoot
      )}
    </>
  );
};

export default EditModal;
