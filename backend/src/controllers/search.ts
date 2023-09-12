import pool from "../database/database";
import { Request, Response } from "express";

const searchFunction = async (req: Request, res: Response) => {
  try {
    let searchString: string;
    const searchResults: any[] = [];
    const searchArray = [];
    if (req.body.queryString.length > 0) {
      searchString = req.body.queryString;
      searchArray.push(searchString.split(" "));
    }
    const searchContent = async () => {
      const productResult: any = await pool.query(
        "SELECT * FROM product_database WHERE product_name LIKE $1 OR prod_desc LIKE $1",
        [`%${searchString}%`]
      );

      const vendorResult: any = await pool.query(
        "SELECT * FROM vendors WHERE vendor_name LIKE $1",
        [`%${searchString}%`]
      );

      searchResults.push(...productResult, ...vendorResult);
    };

    await searchContent();
    res.json(searchResults);
  } catch (error: any) {
    console.error(error.stack);
    res.status(500).json({ error: "An error occured while searching." });
  }
};
