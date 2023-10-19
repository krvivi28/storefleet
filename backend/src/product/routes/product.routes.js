import express from "express";
import { getAppProducts } from "../controllers/product.controller.js";

const router = express.Router();

router.route("/").get(getAppProducts);

export default router;
