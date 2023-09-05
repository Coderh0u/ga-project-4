import express from "express";
const router = express.Router();
import { createCategory, insertProduct } from "../controllers/product";
// import the validators and middlewares

router.put("/category/new", createCategory);
router.put("/new", insertProduct);

export default router;
