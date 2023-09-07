import pool from "../database/database";
import { Request, Response } from "express";

const createCart = async (req: Request, res: Response) => {
  try {
    const newCart = await pool.query(
      "INSERT INTO shopping_cart(product_id, total_cost, ship_address, ship_date) VALUES($1, $2, $3, $4)",
      [
        req.body.productIds,
        req.body.totalCost,
        req.body.shipAddress,
        req.body.shipDate,
      ]
    );
    if (newCart.rowCount) {
      res.status(200).json({ status: "ok", msg: "Cart created" });
    } else {
      res.status(401).json({ status: "errorr", msg: "Unable to create cart" });
    }
  } catch (error: any) {
    console.error(error.stack);
    res
      .status(500)
      .json({ error: "An error occured while creating new cart." });
  }
};

const getCart = async (req: Request, res: Response) => {
  try {
    {
      if (req.body.cartId) {
        const cart = await pool.query(
          "SELECT * FROM shopping_cart WHERE id =$1",
          [req.body.cartId]
        );
        if (cart) {
          res.status(200).json({ status: "ok", cart });
        } else {
          res.status(404).json({ status: "error", msg: "Unable to find cart" });
        }
      } else {
        const cart = await pool.query("SELECT * FROM shopping_cart");
        if (cart) {
          res.status(200).json({ status: "ok", cart });
        } else {
          res.status(404).json({ status: "error", msg: "Unable to find cart" });
        }
      }
    }
  } catch (error: any) {
    console.error(error.stack);
    res.status(500).json({ error: "An error occured while getting cart." });
  }
};

const editCart = async (req: Request, res: Response) => {
  try {
    const editedCart = await pool.query(
      "UPDATE shopping_cart SET product_id=$1, total_cost=$2, ship_address=$3, ship_date=$4, order_date=CURRENT_DATE",
      [
        req.body.productIds,
        req.body.totalCost,
        req.body.shipAddress,
        req.body.shipDate,
      ]
    );
    if (editedCart.rowCount) {
      res.status(200).json({ status: "ok", msg: "Cart updated" });
    } else {
      res.status(401).json({ status: "error", msg: "Unable to update cart" });
    }
  } catch (error: any) {
    console.error(error.stack);
    res.status(500).json({ error: "An error occured while updating cart." });
  }
};

const delCart = async (req: Request, res: Response) => {
  try {
    const deletedCart = await pool.query(
      "DELETE FROM shopping_cart WHERE id=$1",
      [req.body.cartId]
    );
    if (deletedCart.rowCount) {
      res.status(200).json({ status: "ok", msg: "Cart removed" });
    } else {
      res.status(401).json({ status: "error", msg: "Unable to remove cart" });
    }
  } catch (error: any) {
    console.error(error.stack);
    res.status(500).json({ error: "An error occured while removing cart." });
  }
};

const creatHistory = async (req: Request, res: Response) => {
  try {
    const newHistory = await pool.query(
      "INSERT INTO order_history(product_id, total_cost, ship_address, ship_date) VALUES($1, $2, $3, $4)",
      [
        req.body.productIds,
        req.body.totalCost,
        req.body.shipAddress,
        req.body.shipDate,
      ]
    );
    if (newHistory.rowCount) {
      res.status(200).json({ status: "ok", msg: "Cart created" });
    } else {
      res.status(401).json({ status: "errorr", msg: "Unable to create cart" });
    }
  } catch (error: any) {
    console.error(error.stack);
    res
      .status(500)
      .json({ error: "An error occured while creating order history." });
  }
};

const getHistory = async (req: Request, res: Response) => {
  try {
    if (req.body.historyId) {
      const cart = await pool.query(
        "SELECT * FROM order_history WHERE id =$1",
        [req.body.historyId]
      );
      if (cart) {
        res.status(200).json({ status: "ok", cart });
      } else {
        res
          .status(404)
          .json({ status: "error", msg: "Unable to find order history" });
      }
    } else {
      const cart = await pool.query("SELECT * FROM order_history");
      if (cart) {
        res.status(200).json({ status: "ok", cart });
      } else {
        res
          .status(404)
          .json({ status: "error", msg: "Unable to find order history" });
      }
    }
  } catch (error: any) {
    console.error(error.stack);
    res
      .status(500)
      .json({ error: "An error occured while getting order history." });
  }
};

export{creatHistory, createCart, editCart, delCart, getCart, getHistory}