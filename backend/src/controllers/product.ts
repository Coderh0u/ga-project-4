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
      res.status(200).json({ status: "ok", msg: "Category created." });
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

// get all category
const getAllCat = async (req: Request, res: Response) => {
  try {
    const allCat = await pool.query("SELECT * FROM product_category");

    if (allCat.rowCount > 0) {
      res.status(200).json(allCat.rows);
    } else {
      res.status(404).json({ status: "error", msg: "No categories found." });
    }
  } catch (error: any) {
    console.error(error.stack);
    res.status(500).json({ error: "An error occured while getting category." });
  }
};

// edit category (moderator permission only)
const editCategory = async (req: Request, res: Response) => {
  try {
    const editedCategory = await pool.query(
      "UPDATE product_category SET category_name=$1 WHERE id=$2",
      [req.body.newName, req.body.categoryId]
    );
    if (editedCategory.rowCount === 1) {
      res.status(200).json({ status: "ok", msg: "Category name updated." });
    } else {
      res
        .status(400)
        .json({ status: "error", msg: "Unable to update category name." });
    }
  } catch (error: any) {
    console.error(error.stack);
    res.status(500).json({
      status: "error",
      msg: "An error occured while updating category name.",
    });
  }
};

// deleting category (moderator permission only)
const delCategory = async (req: Request, res: Response) => {
  try {
    const delCat = await pool.query(
      "DELETE FROM product_category WHERE id =$1",
      [req.body.categoryId]
    );
    if (delCat.rowCount === 1) {
      res.status(200).json({ status: "ok", msg: "Category deleted." });
    } else {
      res.status(400).json({ status: "error", msg: "Unable to delete." });
    }
  } catch (error: any) {
    console.error(error.stack);
    res.status(500).json({
      status: "error",
      msg: "An error occured while deleting category.",
    });
  }
};

// add product to product_database
// will need auth middleware infront to figure out who uploaded this
const insertProduct = async (req: Request, res: Response) => {
  try {
    // if uploader is a vendor
    if (req.decoded.role === "vendor") {
      const newProduct = await pool.query(
        "INSERT INTO product_database(product_name, price, prod_version, prod_category, prod_desc, product_photo, creator_vendor) VALUES($1, $2, $3, $4, $5, $6, $7)",
        [
          req.body.productName,
          req.body.price,
          req.body.productVersion || null,
          req.body.productCategory || null,
          req.body.productDesc || null,
          req.body.productPhoto || null,
          req.decoded.data.id,
        ]
      );
      if (newProduct.rowCount > 0) {
        res.status(200).json({ status: "ok", msg: "Product(s) added." });
      } else {
        res
          .status(400)
          .json({ status: "error", msg: "Failed to add product." });
      }
    }
    // if uploader is a user
    else if (req.decoded.role === "user") {
      const newProduct = await pool.query(
        "INSERT INTO product_database(product_name, price, prod_version, prod_category, prod_desc, product_photo, is_secondhand, creator_user) VALUES($1, $2, $3, $4, $5, $6, $7, $8)",
        [
          req.body.productName,
          req.body.price,
          req.body.productVersion || null,
          req.body.productCategory || null, // reminder, this is a foreign key, need to be settled by frontend
          req.body.productDesc || null,
          req.body.productPhoto || null,
          req.body.secondHand,
          req.decoded.data.id,
        ]
      );
      if (newProduct.rowCount > 0) {
        res.status(200).json({ status: "ok", msg: "Product(s) added." });
      } else {
        res
          .status(400)
          .json({ status: "error", msg: "Failed to add product." });
      }
    }
  } catch (error: any) {
    console.error(error.stack);
    res.status(500).json({ error: "An error occured while adding product." });
  }
};

const getAllProduct = async (req: Request, res: Response) => {
  try {
    let queryString =
      `SELECT product_database.product_name, product_database.price, product_database.prod_desc, product_database.product_photo, product_database.is_secondhand, product_category.category_name` +
      (req.body.criteria ? ", vendors.vendor_name" : "") +
      ` FROM product_database JOIN product_category ON product_database.prod_category = product_category.id` +
      (req.body.criteria
        ? " JOIN vendors ON product_database.creator_vendor = vendors.id"
        : "");
    const queryParams = [];
    if (req.body.limit) {
      queryString += " ORDER BY RANDOM() LIMIT $1::integer ";
      queryParams.push(req.body.limit);
    }
    if (req.body.criteria && !req.body.filter) {
      queryString += ` WHERE vendors.id = ANY($${
        queryParams.length + 1
      }::uuid[])`;
      queryParams.push(req.body.criteria);
    }
    if (req.body.filter) {
      if (req.body.criteria) {
        queryString += ` WHERE product_category.id = ANY($${
          queryParams.length + 1
        }::uuid[]) AND vendors.id = ANY($${queryParams.length + 2}::uuid[]) `;
        queryParams.push(req.body.filter, req.body.criteria);
      } else {
        queryString += ` WHERE product_category.id = ANY($${
          queryParams.length + 1
        }::uuid[]) `;
        queryParams.push(req.body.filter);
      }
    }
    const allProduct = await pool.query(queryString, queryParams);
    if (allProduct.rowCount) {
      res.json(allProduct.rows);
    } else {
      res.status(404).json({ status: "error", msg: "No products found" });
    }
  } catch (error: any) {
    console.error(error.stack);
    res.status(500).json({ error: "An error occured while getting products." });
  }
};

const getUserProd = async (req: Request, res: Response) => {
  try {
    if (req.decoded.role === "user") {
      const userProd = await pool.query(
        "SELECT product_database.id, product_database.product_name, product_database.price, product_database.prod_desc, product_database.product_photo, product_database.is_secondhand, product_category.category_name FROM product_database JOIN product_category ON product_database.prod_category = product_category.id JOIN users ON product_database.creator_user = users.id WHERE users.id =$1",
        [req.decoded.data.id]
      );
      if (userProd.rowCount) {
        res.json(userProd.rows);
      } else {
        res.json("");
      }
    }
    if (req.decoded.role === "vendor") {
      const vendProd = await pool.query(
        "SELECT product_database.id, product_database.product_name, product_database.price, product_database.prod_desc, product_database.product_photo, product_database.is_secondhand, product_category.category_name FROM product_database JOIN product_category ON product_database.prod_category = product_category.id JOIN vendors ON product_database.creator_vendor =vendors.id WHERE vendors.id =$1",
        [req.decoded.data.id]
      );
      if (vendProd.rowCount) {
        res.json(vendProd.rows);
      } else {
        res.json("");
      }
    }
  } catch (error: any) {
    console.error(error.stack);
    res.status(500).json({ error: "An error occured while getting products." });
  }
};

const editProduct = async (req: Request, res: Response) => {
  try {
    // check the role of the person requesting the edit
    if (req.decoded.role === "user") {
      // check if person requesting the edit is the owner of the product
      const prod = await pool.query(
        "SELECT * FROM product_database WHERE id=$1",
        [req.body.productId]
      );
      if (req.decoded.data.id === prod.rows[0].creator_user) {
        const updatedProduct = await pool.query(
          "UPDATE product_database SET product_name=$1, price=$2, prod_category=$3, prod_desc=$4, product_photo=$5, is_secondhand=$6 WHERE id=$7",
          [
            req.body.productName || prod.rows[0].product_name,
            req.body.price || prod.rows[0].price,
            req.body.productCategory || prod.rows[0].prod_category,
            req.body.productDesc || prod.rows[0].desc,
            req.body.productPhoto || prod.rows[0].product_photo,
            req.body.secondHand || prod.rows[0].is_secondhand,
            req.body.productId,
          ]
        );
        if (updatedProduct.rowCount) {
          res.status(200).json({ status: "ok", msg: "Product updated" });
          return;
        } else {
          res.status(404).json({ status: "error", msg: "Unable to update" });
          return;
        }
      } else {
        res.status(401).json({
          status: "error",
          msg: "You do not have the rights to edit this product.",
        });
        return;
      }
    }

    // check the role of the person requesting the edit
    if (req.decoded.role === "vendor") {
      // check if person requesting the edit is the owner of the product
      const prod = await pool.query(
        "SELECT * FROM product_database WHERE id=$1",
        [req.body.productId]
      );
      if (req.decoded.data.id === prod.rows[0].creator_vendor) {
        const updatedProduct = await pool.query(
          "UPDATE product_database SET product_name=$1, price=$2, prod_version=$3, prod_category=$4, desc=$5, product_photo=$6 WHERE id=$7",
          [
            req.body.productName || prod.rows[0].product_name,
            req.body.price || prod.rows[0].price,
            req.body.productVersion || prod.rows[0].prod_version,
            req.body.productCategory || prod.rows[0].prod_category,
            req.body.productDesc || prod.rows[0].desc,
            req.body.productPhoto || prod.rows[0].product_photo,
            req.body.productId,
          ]
        );
        if (updatedProduct.rowCount) {
          res.status(200).json({ status: "ok", msg: "Product updated" });
          return;
        } else {
          res.status(404).json({ status: "error", msg: "Unable to update" });
          return;
        }
      } else {
        res.status(401).json({
          status: "error",
          msg: "You do not have the rights to edit this product.",
        });
        return;
      }
    }
    // check the role of the person requesting the edit
    // moderator have rights to edit anything they want
    if (req.decoded.role === "moderator") {
      const prod = await pool.query(
        "SELECT * FROM product_database WHERE id=$1",
        [req.body.productId]
      );
      const updatedProduct = await pool.query(
        "UPDATE product_database SET product_name=$1, price=$2, prod_version=$3, prod_category=$4, desc=$5, product_photo=$6, is_secondhand=$7 WHERE id=$8",
        [
          req.body.productName || prod.rows[0].product_name,
          req.body.price || prod.rows[0].price,
          req.body.productVersion || prod.rows[0].prod_version,
          req.body.productCategory || prod.rows[0].prod_category,
          req.body.productDesc || prod.rows[0].desc,
          req.body.productPhoto || prod.rows[0].product_photo,
          req.body.secondHand || prod.rows[0].is_secondhand,
          req.body.productId,
        ]
      );
      if (updatedProduct.rowCount) {
        res.status(200).json({ status: "ok", msg: "Product updated" });
        return;
      } else {
        res.status(404).json({ status: "error", msg: "Unable to update" });
        return;
      }
    } else {
      res.status(401).json({
        status: "error",
        msg: "You do not have the rights to edit this product.",
      });
      return;
    }
  } catch (error: any) {
    console.error(error.stack);

    res.status(500).json({
      status: "error",
      msg: "An error occured while editing product.",
    });
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const delProduct = await pool.query(
      "DELETE FROM product_database WHERE id=$1",
      [req.body.productId]
    );
    if (delProduct.rowCount) {
      res.status(200).json({ status: "ok", msg: "Product deleted" });
      return;
    } else {
      res.status(404).json({ status: "error", msg: "No products found" });
      return;
    }
  } catch (error: any) {
    console.error(error.stack);
    res.status(500).json({
      status: "error",
      msg: "An error occured while deleting product.",
    });
  }
};

export {
  createCategory,
  getAllCat,
  editCategory,
  delCategory,
  insertProduct,
  getAllProduct,
  getUserProd,
  editProduct,
  deleteProduct,
};
