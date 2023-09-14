// import React from "react";

const ItemCard = (props: any) => {
  const item = props.children;
  const doNothing = () => {};

  return (
    <div
      style={{
        padding: "3px",
        borderRadius: "30px",
        border: "2px solid #c20f08",
        margin: "3px",
      }}
    >
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
            style={{ textAlign: "right", fontSize: "15px", color: "#c20f08" }}
          >
            (Secondhand)
          </p>
        )}
      </div>
      <hr style={{ color: "#c20f08" }} />
      <div style={{ height: "40px" }}>
        <p>{item.prod_desc}</p>
      </div>

      <p>
        <span style={{ fontWeight: "bold", color: "#c20f08" }}>Price: </span> $
        {item.price}
      </p>
      <div className="row">
        <p className="col-sm-8">
          <span style={{ fontWeight: "bold", color: "#c20f08" }}>
            Category:
          </span>
          {item.category_name}
        </p>
        <button
          className="col-sm-4"
          style={{
            padding: 0,
            width: "100px",
            height: "100%",
            backgroundColor: "#c20f08",
            opacity: "80%",
            color: "white",
            border: "none",
          }}
          onClick={props.divertToLogin ? props.divertToLogin : doNothing}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default ItemCard;
