import express from "express";
import dotenv from "dotenv";
import path from "path";
import productRoutes from "./src/product/routes/product.routes.js";

const configPath = path.resolve("backend", "config", "uat.env");
// dotenv.config({ path: "backend/config.uat.env" });
dotenv.config({ path: configPath });

const app = express();

// configure routes
app.use("/api/storefleet/products", productRoutes);

export default app;
