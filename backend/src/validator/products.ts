import { body } from "express-validator";

const validateCategory = [
  body("categoryName", "Category name cannot be empty.").not().isEmpty(),
];

const validateProduct = [
  body("productName", "Product name cannot be empty.")
    .not()
    .isEmpty()
    .isLength({
      max: 50,
    }),
  body("price", "Price of product must be a number.")
    .not()
    .isEmpty()
    .isNumeric()
    .custom((value) => {
      const minValue = 0.0;
      const maxValue = 1000000000000.0;
      if (value < minValue || value > maxValue) {
        throw new Error(`Input must be between ${minValue} and ${maxValue}`);
      }
      return true;
    }),
];

export { validateCategory, validateProduct };
