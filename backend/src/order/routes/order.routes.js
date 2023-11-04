import express from "express";
import {
  allPlacedOrders,
  createNewOrder,
  getSingleOrder,
  updateOrderDetails,
  userOrders,
} from "../controllers/order.controller.js";
import { auth, authByUserRole } from "../../../middlewares/auth.js";

const router = express.Router();

// order post routes

router.route("/new").post(auth, createNewOrder);

// order put routes
// updateOrder details admin only
router
  .route("/update/:id")
  .put(auth, authByUserRole("admin"), updateOrderDetails);

// order get routes

// get details of a order (admin only)
router.route("/:id").get(auth, authByUserRole("admin"), getSingleOrder);
// get my order details (loggedIn user)
router.route("/my/orders").get(auth, userOrders);
// get details of all orders placed
router
  .route("/orders/placed")
  .get(auth, authByUserRole("admin"), allPlacedOrders);

export default router;
