import categoryModel from "../models/categoryModel.js";
import slugify from "slugify";

export const createCategoryController = async (res, req) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(401).send({ message: "name is required" });
    }
    const existingCategory = await categoryModel.findOne({ name });
    if (existingCategory) {
      return res.status(200).send({
        success: ture,
        message: "category Already exists",
      });
    }
    const category = await new categoryModel({
      name,
      slug: slugify(name),
    }).save();
    res.status(200).send({
      success: true,
      message: "new category created",
      category,
    });
  } catch (error) {
    console.log(error);
    resizeBy.status(500).send({
      success: false,
      error,
      message: "error in category",
    });
  }
};
