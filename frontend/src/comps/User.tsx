import React, {
  useState,
  useEffect,
  useContext,
  ReactEventHandler,
} from "react";
import ReactDOM from "react-dom";
import useFetch from "../custom_hooks/useFetch";
import AuthContext from "../context/authentication";
import styles from "./User.module.css";
import AddProduct from "./AddProduct";
import DelModal from "./DelModal";
import EditModal from "./EditModal";
import ItemCard from "./ItemCard";

const User = () => {
  const auth = useContext(AuthContext);
  const [userName, setUserName] = useState("");
  const [products, setProducts] = useState([]);
  const [orderHist, setOrderHist] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [delModal, setDelModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [rerender, setRerender] = useState(false);
  const [toBeEdited, setEdit] = useState();
  const [toBeDeleted, setDelete] = useState();
  const fetchData = useFetch();

  const getUser = async () => {
    const res = await fetchData(
      "/auth/user",
      "POST",
      undefined,
      auth.accessToken
    );
    if (res.ok) {
      setUserName(res.data.userData.rows[0].username);
    }
  };

  const getVendor = async () => {
    const res = await fetchData(
      "/auth/vendor",
      "POST",
      undefined,
      auth.accessToken
    );
    if (res.ok) {
      setUserName(res.data.userData.rows[0].vendor_name);
    }
  };

  const getUserProd = async () => {
    const res = await fetchData(
      "/products/user",
      "GET",
      undefined,
      auth.accessToken
    );
    if (res.ok) {
      console.log(res.data);
      setProducts(res.data);
    }
  };

  const deleteProduct = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.target as HTMLButtonElement;
    console.log("delte called");
    const res = await fetchData(
      "/products/delete",
      "DELETE",
      { productId: toBeDeleted },
      auth.accessToken
    );
    if (res.ok) {
      getUserProd();

      console.log("deleted");
    }
  };

  useEffect(() => {
    if (auth.userRole === "user") {
      getUser();
    }
    if (auth.userRole === "vendor") {
      getVendor();
    }
    getUserProd();
  }, [rerender]);
  return (
    <>
      <div>
        <div className={`row ${styles.band}`}>
          <h1 className="col-md-6">
            <span>Hi</span> {userName}
          </h1>
          <div className="col-md-3"></div>
          <button
            className="col-md-2"
            onClick={() => {
              setShowModal(true);
            }}
          >
            Add product for sale
          </button>
        </div>
        <div className={`row ${styles.contents}`}>
          <div className={`col-md-6 ${styles.left}`}>
            {products &&
              products.map((item: any, idx: number) => (
                <div
                  key={idx}
                  // className={`${styles.itemCard}
                  // ${delModal || editModal ? styles.active : ""}
                  // `}
                  className={styles.itemCard}
                >
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
                      {/* edit button */}
                      <button
                        onClick={() => {
                          setEditModal(true);
                          setEdit(item);
                        }}
                      >
                        <img
                          src="../../images/edit.png"
                          className={styles.icon}
                        />
                      </button>
                      {/* delete button */}
                      <button
                        onClick={() => {
                          setDelModal(true);
                          setDelete(item.id);
                          console.log(item);
                        }}
                      >
                        <img
                          src="../../images/delete.png"
                          className={styles.icon}
                        />
                      </button>
                      <button
                        onClick={() => {
                          console.log(item);
                        }}
                      >
                        check
                      </button>
                      {delModal && (
                        <DelModal
                          setDelModal={setDelModal}
                          deleteProduct={deleteProduct}
                          setRerender={setRerender}
                          rerender={rerender}
                        >
                          {toBeDeleted}
                        </DelModal>
                      )}
                      {editModal && (
                        <EditModal
                          setEditModal={setEditModal}
                          setRerender={setRerender}
                          rerender={rerender}
                        >
                          {toBeEdited}
                        </EditModal>
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </div>
          <div className={`col-md-6 ${styles.right}`}></div>
        </div>
      </div>

      {showModal && (
        <AddProduct
          setShowModal={setShowModal}
          setRerender={setRerender}
          rerender={rerender}
        ></AddProduct>
      )}
    </>
  );
};

export default User;
