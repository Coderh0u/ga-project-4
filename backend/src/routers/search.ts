import express from "express";
const router = express.Router();

import { searchVendors, searchFunction } from "../controllers/search";

router.post("/search", searchFunction);
router.get("/vendors", searchVendors);

export default router;
