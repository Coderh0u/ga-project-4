import pool from "../database/database";
import { Request, Response } from "express";

// add category to database
const createCategory = async (req: Request, res: Response) => {
  try {
    const newCategory = await pool.query(
      "INSERT INTO product_category(category_name) VALUES($1)",
      [req.body.categoryName]
    );
    if (newCategory.rowCount === 1) {
      res.status(201).json({ status: "ok", msg: "Category created." });
    } else {
      res.status(400).json({ status: "error", msg: "Failed to add product." });
    }
  } catch (error: any) {
    console.error(error.stack);
    res
      .status(500)
      .json({ error: "An error occured while creating category." });
  }
};

// add product to product_database
const insertProduct = async (req: Request, res: Response) => {
  try {
    const newProduct = await pool.query(
      "INSERT INTO product_database(product_name, price, prod_version, prod_category, prod_demo, product_photo, is_secondhand) VALUES($1, $2, $3, $4, $5, $6, $7)",
      [
        req.body.productName,
        req.body.price,
        req.body.productVersion || null,
        req.body.productCategory || null, // reminder, this is a foreign key
        req.body.productDemo || null,
        req.body.productPhoto || null,
        req.body.secondHand || true,
      ]
    );
    if (newProduct.rowCount === 1) {
      res.status(201).json({ status: "ok", msg: "Product added to database." });
    } else {
      res.status(400).json({ status: "error", msg: "Failed to add product." });
    }
  } catch (error: any) {
    console.error(error.stack);
    res.status(500).json({ error: "An error occured while adding product." });
  }
};

export { createCategory, insertProduct };
