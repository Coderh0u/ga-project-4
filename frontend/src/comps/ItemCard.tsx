import React from "react";

const ItemCard = (props: any) => {
  const item = props.children;
  return (
    <div>
      <img src={item.product_photo} alt={item.product_name} />
      <h3>{item.product_name}</h3>
      <p>Price: ${item.price}</p>
      <p>Category: {item.category_name}</p>
      <p>Version: {item.prod_version}</p>
      <p>Vendor: {item.vendor_name}</p>
      <br />
      {item.is_secondhand && <h4>Secondhand</h4>}
    </div>
  );
};

export default ItemCard;
