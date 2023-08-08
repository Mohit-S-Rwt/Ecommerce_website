import express from "express";
import { requireSignIn } from "../middlewares/authMiddleware.js";
import { isAdmin } from "../controllers/authController.js";
import { createProductController } from "../controllers/productController.js";
import formidable from "express-formidable";

const router = express.Router();

// route
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);

export default router;
