import express from "express";
import {
  addNewProduct,
  deleteProduct,
  getAllProducts,
  getProductDetails,
  updateProduct,
} from "../controllers/product.controller.js";
import { auth, authByUserRole } from "../../../middlewares/auth.js";

const router = express.Router();

// GET Routes
router.route("/products").get(getAllProducts);
router.route("/details/:id").get(getProductDetails);

// POST Routes
// admin-only
router.route("/add").post(auth, authByUserRole("admin"), addNewProduct);
router.route("/update/:id").put(auth, authByUserRole("admin"), updateProduct);

// DELETE ROUTE
// Admin only
router
  .route("/delete/:id")
  .delete(auth, authByUserRole("admin"), deleteProduct);

export default router;
