import express from "express";
import { requireSignIn } from "./../middlewares/authMiddleware.js";
import {
  allCategoryController,
  createCategoryController,
  deleteCategoryController,
  singleCategoryController,
  updateCategoryController,
} from "../controllers/categoryController.js";
import { isAdmin } from "../controllers/authController.js";

const router = express.Router();

// routes
// create category
router.post(
  "/create-category",
  requireSignIn,
  isAdmin,
  createCategoryController
);

// update category
router.put(
  "/update-category/:id",
  requireSignIn,
  isAdmin,
  updateCategoryController
);

// get all category

router.get('/get-category',allCategoryController)

// single category

router.get('/single-category/:slug',singleCategoryController)


router.delete('/delete-category/:id', requireSignIn,isAdmin, deleteCategoryController)

export default router;
