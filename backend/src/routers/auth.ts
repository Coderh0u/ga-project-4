import express from "express";
const router = express.Router();
import {
  registerUser,
  loginUser,
  registerModerator,
  loginModerator,
  registerVendor,
  loginVendor,
  deactivateAcc,
} from "../controllers/auth";
import { validateLogin, validateRegData } from "../validator/auth";
import validation from "../middleware/validChecker";
import {
  authNorm,
  authUser,
  authModerator,
  authVendor,
  // may shift to somewhere else
} from "../middleware/auth";

router.put("/register/user", validation, validateRegData, registerUser);
router.post("/login/user", validateLogin, loginUser);

router.put(
  "/register/moderator",
  validation,
  validateRegData,
  registerModerator
);
router.post("/login/moderator", validateLogin, loginModerator);

router.put("/register/vendor", validation, validateRegData, registerVendor);
router.post("/login/vendor", validateLogin, loginVendor);

router.patch("/deactivate_account", authNorm, deactivateAcc);
export default router;
