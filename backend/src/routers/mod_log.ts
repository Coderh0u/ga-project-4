import express from "express";
const router = express.Router();
import { validateModLog } from "../validator/mod_log";
import validation from "../middleware/validChecker";
import { authModerator } from "../middleware/auth";
import { createModLog, getModLogs } from "../controllers/mod_log";

router.put("/log/new", authModerator, validateModLog, validation, createModLog);
router.get("/log/show", authModerator, getModLogs);

export default router;
