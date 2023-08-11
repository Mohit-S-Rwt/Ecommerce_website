import express from "express";
import { requireSignIn } from "../middlewares/authMiddleware.js";
import { isAdmin } from "../controllers/authController.js";
import { UpdateProductController, createProductController, deleteProductController, getProductController, getSingleProductController, productPhotoController } from "../controllers/productController.js";
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

// get all products
router.get('/get-product', getProductController)

// single product
router.get('/get-product/:slug', getSingleProductController)


// get photo
router.get('/product-photo/:pid', productPhotoController)

// delete products

router.delete('/product/:pid', deleteProductController)

// UpdateProduct
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  UpdateProductController
);


export default router;
