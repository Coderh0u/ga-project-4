import { body } from "express-validator";

const validateCart = [
  body("shipAddress", "Shipping address cannot be empty").not().isEmpty(),
  body("shipDate", "Must input date in this field").not().isEmpty(),
  body("productIds").custom((productIds) => {
    if (Array.isArray(productIds) && productIds.length !== 0) {
      return true;
    } else {
      throw new Error("Cart cannot be empty.");
    }
  }),
];

export { validateCart };
