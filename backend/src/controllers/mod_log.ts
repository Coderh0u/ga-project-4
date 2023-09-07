import pool from "../database/database";
import { Request, Response } from "express";

// create new moderator log
const createModLog = async (req: Request, res: Response) => {
  try {
    const newLog = await pool.query(
      "INSERT INTO moderator_logs(action_name, action_comments, user_id, product_id) VALUES($1, $2, $3, $4)",
      [
        req.body.actionName,
        req.body.comments,
        req.body.userId || null,
        req.body.product_id || null,
      ]
    );
    if (newLog.rowCount === 1) {
      res.status(200).json({ status: "ok", msg: "New log created." });
    } else {
      res.status(400).json({ status: "error", msg: "Failed to create log." });
    }
  } catch (error: any) {
    console.error(error.stack);
    res.status(500).json({ error: "An error occured while creating new log." });
  }
};

const getModLogs = async (req: Request, res: Response) => {
  try {
    if (req.body.logId) {
      const allLogs = await pool.query(
        "SELECT * FROM moderator_logs WHERE id=$1",
        [req.body.logId]
      );
      res.status(200).json({ status: "ok", allLogs });
    } else {
      const allLogs = await pool.query("SELECT * FROM moderator_logs");
      res.status(200).json({ status: "ok", allLogs });
    }
  } catch (error: any) {
    console.error(error.stack);
    res.status(500).json({ error: "An error occured while getting logs." });
  }
};
export { createModLog, getModLogs };
