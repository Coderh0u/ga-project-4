import { body } from "express-validator";

const validateRegData = [
  body("username", "Invalid username.").not().isEmpty(),

  body("password", "Password should be minimally 8 characters long.")
    .not()
    .isEmpty()
    .isLength({
      min: 8,
      max: 30,
    }),
];

const validateLogin = [
  body("username", "Please input your username.").not().isEmpty(),
  body("password", "Password should be minimally 8 characters long.")
    .not()
    .isEmpty()
    .isLength({
      min: 8,
      max: 30,
    }),
];

export { validateLogin, validateRegData };
