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
          req.body.productCategory || null, // reminder, this is a foreign key
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
        "INSERT INTO product_database(product_name, price, prod_version, prod_category, prod_de, product_photo, is_secondhand, creator_user) VALUES($1, $2, $3, $4, $5, $6, $7, $8)",
        [
          req.body.productName,
          req.body.price,
          req.body.productVersion || null,
          req.body.productCategory || null, // reminder, this is a foreign key, need to be settled by frontend
          req.body.productDe || null,
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
    } else {
      res.status(403).json({
        status: "error",
        msg: "I hired you to be MY moderator. GET BACK TO WORK",
      });
    }
  } catch (error: any) {
    console.error(error.stack);
    res.status(500).json({ error: "An error occured while adding product." });
  }
};

const getAllProduct = async (req: Request, res: Response) => {
  const criteria: number[] = req.body.criteria; //maybe neeed to patch this

  try {
    // no filter criteria, get ALL products in database
    if (criteria.length === 0) {
      // const allProduct = await pool.query("SELECT *  FROM product_database");
      const allProduct = await pool.query(
        "SELECT product_database.product_name, product_database.price, product_database.prod_version, product_database.product_photo, product_database.is_secondhand, product_database.creator_vendor, product_database.creator_user, product_category.category_name FROM product_database JOIN product_category on product_database.prod_category = product_category.id" +
          (req.body.limit ? " ORDER BY RANDOM() " : "") +
          (req.body.limit ? " LIMIT $1" : ""),
        [req.body.limit || null]
      );
      if (allProduct.rowCount) {
        res.json(allProduct.rows);
      } else {
        res.status(404).json({ status: "error", msg: "No products found" });
      }
    }
    // only pull from a certain product category
    if (criteria.length === 1 && criteria[0] === 1) {
      const allProduct = await pool.query(
        "SELECT *  FROM product_database JOIN product_category on product_database.prod_category = product_category.id WHERE product_category.id = $1",
        [req.body.productCategory]
      );
      if (allProduct.rowCount) {
        res.json(allProduct.rows);
      } else {
        res.status(404).json({ status: "error", msg: "No products found" });
      }
    }
    // only pull from a certain product vendor
    if (criteria.length === 1 && criteria[0] === 2) {
      const allProduct = await pool.query(
        "SELECT *  FROM product_database WHERE creator_vendor=$1",
        [req.body.vendorId]
      );
      if (allProduct.rowCount) {
        res.json(allProduct.rows);
      } else {
        res.status(404).json({ status: "error", msg: "No products found" });
      }
    }
    // only pull from a category of products from a certain vendor
    if (criteria.length === 2) {
      const vendorid: string = req.body.vendorId;
      const catid: string = req.body.productCategory;

      const allProduct = await pool.query(
        `SELECT *  FROM product_database WHERE product_database.creator_vendor=$1 AND product_database.prod_category=$2`,
        [vendorid, catid]
      );
      if (allProduct.rowCount) {
        res.json(allProduct.rows);
      } else {
        res.status(404).json({ status: "error", msg: "No products found" });
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
          "UPDATE product_database SET product_name=$1, price=$2, prod_version=$3, prod_category=$4, desc=$5, product_photo=$6, is_secondhand=$7 WHERE id=$8",
          [
            req.body.productName || prod.rows[0].product_name,
            req.body.price || prod.rows[0].price,
            req.body.productVersion || prod.rows[0].prod_version,
            req.body.productCategory || prod.rows[0].prod_category,
            req.body.Desc || prod.rows[0].desc,
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
    // check the role of the person requesting the delete
    if (req.decoded.role === "user") {
      // check if person requesting the delete is the owner of the product
      const prod = await pool.query(
        "SELECT * FROM product_database WHERE id=$1",
        [req.body.productId]
      );
      if (req.decoded.data.id === prod.rows[0].creator_user) {
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
      } else {
        res.status(401).json({
          status: "error",
          msg: "You do not have the rights to delete this product.",
        });
      }
    }

    // check the role of the person requesting the delete
    if (req.decoded.role === "vendor") {
      // check if person requesting the delete is the owner of the product
      const prod = await pool.query(
        "SELECT * FROM product_database WHERE id=$1",
        [req.body.productId]
      );
      if (req.decoded.data.id === prod.rows[0].creator_vendor) {
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
      } else {
        res.status(401).json({
          status: "error",
          msg: "You do not have the rights to delete this product.",
        });
      }
    }

    // check the role of the person requesting the delete
    // moderator has rights to delete anything they want
    if (req.decoded.role === "moderator") {
      // check if person requesting the delete is the owner of the product

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
  editProduct,
  deleteProduct,
};
