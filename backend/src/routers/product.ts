import express from "express";
const router = express.Router();
import {
  createCategory,
  delCategory,
  deleteProduct,
  editCategory,
  editProduct,
  getAllCat,
  getAllProduct,
  insertProduct,
} from "../controllers/product";
import { authModerator, authNorm } from "../middleware/auth";
import { validateCategory, validateProduct } from "../validator/products";
import validation from "../middleware/validChecker";

// categories related routers
router.put(
  "/category/new",
  authNorm,
  validateCategory,
  validation,
  createCategory
);
router.get("/category/all", getAllCat);
router.patch(
  "/category/edit",
  authModerator,
  validateCategory,
  validation,
  editCategory
);
router.delete("/category/delete", authModerator, delCategory);

// prroducts related routers
router.put("/new", authNorm, validateProduct, validation, insertProduct);
router.post("/all", getAllProduct);
router.patch("/edit", authNorm, validateProduct, validation, editProduct);
router.delete("/delete", authNorm, deleteProduct);

export default router;
 