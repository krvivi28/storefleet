import express from "express";
import {
  createNewUser,
  forgetPassword,
  logoutUser,
  userLogin,
} from "../controller/user.controller.js";

const router = express.Router();

// User POST Routes
router.route("/signup").post(createNewUser);
router.route("/login").post(userLogin);
router.route("/forgetpassword").post(forgetPassword);

// User GET Routes
router.route("/logout").get(logoutUser);

export default router;
