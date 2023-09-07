import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 as uuidV4 } from "uuid";
import pool from "../database/database";
import { Request, Response } from "express";

const registerUser = async (req: Request, res: Response) => {
  try {
    const auth = await pool.query("SELECT * FROM users WHERE username =$1", [
      req.body.username,
    ]);
    if (auth.rowCount) {
      console.log("username exists");
      return res
        .status(400)
        .json({ status: "error", msg: "Username is already taken." });
    }
    const hashPwd = await bcrypt.hash(req.body.password, 12);
    await pool.query("INSERT INTO users(username, hash_pwd) VALUES($1, $2)", [
      req.body.username,
      hashPwd,
    ]);
    res.status(200).json({ status: "ok", msg: "User has been created." });
  } catch (error: any) {
    console.error(error.stack);
    res.status(500).json({ error: "An error occured while creating user." });
  }
};

const loginUser = async (req: Request, res: Response) => {
  try {
    // try find username in database
    const auth = await pool.query("SELECT * FROM users WHERE username =$1", [
      req.body.username,
    ]);
    if (auth.rowCount == 0) {
      return res
        .status(400)
        .json({ status: "error", msg: "Unauthorised login" });
    }

    // validate password
    const pwdMatch = await bcrypt.compare(
      req.body.password,
      auth.rows[0].hash_pwd
    );
    if (!pwdMatch) {
      console.log("Unauthorised Login");
      return res
        .status(401)
        .json({ status: "error", msg: "Unauthorised Login" });
    }
    // checking if account is active
    if (auth.rows[0].is_active === false) {
      return res
        .status(404)
        .json({ status: "error", msg: "Account has been deactivated" });
    }
    const payload = {
      data: auth.rows[0],
      role: "user",
    };
    console.log("auth", auth.rows[0]);
    const accessSecret = process.env.ACCESS_SECRET;
    if (accessSecret) {
      const accessToken: string = jwt.sign(payload, accessSecret, {
        expiresIn: "10d",
        jwtid: uuidV4(),
      });
      res.json({ accessToken });
    } else {
      res.status(403).json({ status: "error", msg: "Token Error" });
    }
  } catch (error: any) {
    console.error(error.stack);
    res.status(500).json({ error: "An error occured while logging in." });
  }
};

const registerModerator = async (req: Request, res: Response) => {
  try {
    const auth = await pool.query(
      "SELECT * FROM moderators WHERE username =$1",
      [req.body.username]
    );
    if (auth.rowCount) {
      return res
        .status(400)
        .json({ status: "error", msg: "Username is already taken." });
    }
    const hashPwd = await bcrypt.hash(req.body.password, 12);
    await pool.query(
      "INSERT INTO moderators(username, hash_pwd) VALUES($1, $2)",
      [req.body.username, hashPwd]
    );
    res.json({ msg: "Moderator account has been created." });
  } catch (error: any) {
    console.error(error.stack);
    res.status(500).json({ error: "An error occured while creating account." });
  }
};

const loginModerator = async (req: Request, res: Response) => {
  try {
    // try find username in database
    const auth = await pool.query(
      "SELECT * FROM moderators WHERE username =$1",
      [req.body.username]
    );
    if (auth.rowCount == 0) {
      return res
        .status(400)
        .json({ status: "error", msg: "Unauthorised login" });
    }
    // validate password
    const pwdMatch = await bcrypt.compare(
      req.body.password,
      auth.rows[0].hash_pwd
    );
    if (!pwdMatch) {
      console.log("Unauthorised Login");
      return res
        .status(401)
        .json({ status: "error", msg: "Unauthorised Login" });
    }
    // checking if account is avtive
    if (auth.rows[0].is_active === false) {
      return res
        .status(404)
        .json({ status: "error", msg: "Account has been deactivated" });
    }
    const payload = {
      data: auth.rows[0],
      role: "moderator",
    };
    const accessSecret = process.env.ACCESS_SECRET;
    if (accessSecret) {
      const accessToken: string = jwt.sign(payload, accessSecret, {
        expiresIn: "10d",
        jwtid: uuidV4(),
      });
      res.json({ accessToken });
    } else {
      res.status(403).json({ status: "error", msg: "Token Error" });
    }
  } catch (error: any) {
    console.error(error.stack);
    res.status(500).json({ error: "An error occured while logging in." });
  }
};

const registerVendor = async (req: Request, res: Response) => {
  try {
    const auth = await pool.query(
      "SELECT * FROM vendors WHERE vendor_name =$1",
      [req.body.vendorName]
    );
    if (auth.rowCount) {
      return res.status(400).json({
        status: "error",
        msg: `Account under ${req.body.vendorName} already exists.`,
      });
    }
    const hashPwd = await bcrypt.hash(req.body.password, 12);
    await pool.query(
      "INSERT INTO vendors(username, hash_pwd, vendor_name) VALUES($1, $2, $3)",
      [req.body.username, hashPwd, req.body.vendorName]
    );
    res.json({ msg: "User has been created." });
  } catch (error: any) {
    console.error(error.stack);
    res.status(500).json({ error: "An error occured while creating account." });
  }
};

const loginVendor = async (req: Request, res: Response) => {
  try {
    // try find username in database
    const auth = await pool.query("SELECT * FROM vendors WHERE username =$1", [
      req.body.username,
    ]);
    if (auth.rowCount === 0) {
      return res
        .status(400)
        .json({ status: "error", msg: "Unauthorised login" });
    }
    // validate password
    const pwdMatch = await bcrypt.compare(
      req.body.password,
      auth.rows[0].hash_pwd
    );
    if (!pwdMatch) {
      console.log("Unauthorised Login");
      return res
        .status(401)
        .json({ status: "error", msg: "Unauthorised Login" });
    }
    // checking if account is avtive
    if (auth.rows[0].is_active === false) {
      return res
        .status(404)
        .json({ status: "error", msg: "Account has been deactivated" });
    }
    const payload = {
      data: auth.rows[0],
      role: "vendor",
    };
    const accessSecret = process.env.ACCESS_SECRET;
    if (accessSecret) {
      const accessToken: string = jwt.sign(payload, accessSecret, {
        expiresIn: "10d",
        jwtid: uuidV4(),
      });
      res.json({ accessToken });
    } else {
      res.status(403).json({ status: "error", msg: "Token Error" });
    }
  } catch (error: any) {
    console.error(error.stack);
    res.status(500).json({ error: "An error occured while logging in." });
  }
};

// fix this shit
const deactivateAcc = async (req: Request, res: Response) => {
  try {
    const deactAcc = await pool.query(
      "UPDATE users SET is_active = false WHERE id=$1",
      [req.decoded.data.id]
    );
    if (deactAcc.rowCount === 1) {
      res.status(200).json({ status: "ok", msg: "Account deactivated" });
    } else {
      res
        .status(400)
        .json({ status: "error", msg: "Unable to deactivate account." });
    }
  } catch (error: any) {
    console.error(error.stack);
    res.status(500).json({
      status: "error",
      msg: "An error occured while deactivating account.",
    });
  }
};

const test = async (req: Request, res: Response) => {
  res.json(req.decoded);
};

export {
  registerUser,
  loginUser,
  registerModerator,
  loginModerator,
  registerVendor,
  loginVendor,
  deactivateAcc,
  test,
};
