import express from "express";
const router = express.Router();

import {
  creatHistory,
  createCart,
  editCart,
  delCart,
  getCart,
  getHistory,
} from "../controllers/cart";
import { validateCart } from "../validator/cart";
import validation from "../middleware/validChecker";

router.put("/new", validateCart, validation, createCart);
router.delete("/delete", delCart);
router.get("/history", getHistory);
router.put("/history/new", creatHistory);

export default router;
