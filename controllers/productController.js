import slugify from "slugify";

import fs from "fs";
import productModel from "../models/productModel.js";

export const createProductController = async (res, req) => {
  try {
    const { name, slug, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;

    // validations
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });

      case !description:
        return res.status(500).send({ error: "Description is Required" });

      case !price:
        return res.status(500).send({ error: "Price is Required" });

      case !category:
        return res.status(500).send({ error: "Category is Required" });

      case !quantity:
        return res.status(500).send({ error: "Quantity is Required" });

      case photo && photo.size> 100000:
        return res.status(500).send({ error: "Photo  is Required and should be less than 1kb" });
    }
    const products = new productModel({...req.fields,slug:slugify(name)})
    if(photo){
        products.photo.data = fs.readFileSync(photo.path)
        products.photo.contentType= photo.type
    }
    await products.save()
    res.status(201).send({
        success :true,
        message : "Product created successfully",
        products,
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "error in creating product",
    });
  }
};
