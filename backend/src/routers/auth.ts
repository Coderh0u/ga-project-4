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
  pullUserData,
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

router.put("/register/user", validateRegData, validation, registerUser);
router.post("/login/user", validateLogin, validation, loginUser);


router.put(
  "/register/moderator",
  validateRegData,
  validation,
  registerModerator
);

router.post("/login/moderator", validateLogin, validation, loginModerator, );

router.put("/register/vendor", validateRegData, validation, registerVendor);
router.post("/login/vendor", validateLogin, validation, loginVendor);

router.patch("/deactivate_account", authNorm, deactivateAcc);// probably broken
router.post("/user", authNorm, pullUserData);// pull data from whoever is using
export default router;
