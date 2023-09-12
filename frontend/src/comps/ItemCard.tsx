import React from "react";

const ItemCard = (props: any) => {
  const item = props.children;
  return (
    <div>
      <img src={item.product_photo} alt={item.product_name} />
      <h3>{item.product_name}</h3>
      <p>${item.price}</p>
      <p>Category: {item.category_name}</p>
      <p>Version: {item.prod_version}</p>
    </div>
  );
};

export default ItemCard;
