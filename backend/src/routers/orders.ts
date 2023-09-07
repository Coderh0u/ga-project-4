import express from "express";
const router = express.Router();
import { validateCart } from "../validator/cart";
import { authUser } from "../middleware/auth";
import validation from "../middleware/validChecker";
import {
  creatHistory,
  createCart,
  editCart,
  delCart,
  getCart,
  getHistory,
} from "../controllers/cart";

router.put("/cart/new", authUser, validateCart, validation, createCart);
router.get("/cart/show", authUser, getCart);
router.patch("/cart/edit", authUser, validateCart, validation, editCart);
router.delete("/cart/delet", authUser, delCart);

router.put("/history/new", authUser, creatHistory);
router.get("/history/show", authUser, getHistory);

export default router;
