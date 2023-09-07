import { body } from "express-validator";

const validateModLog = [
  body("actionName", "").not().isEmpty(),
  body("comments", "Please input justifications for your actions.")
    .not()
    .isEmpty()
    .isLength({
      min: 8,
      max: 100,
    }),
];

export {validateModLog}