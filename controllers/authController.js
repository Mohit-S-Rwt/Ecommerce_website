// this helps in registering the user
// callback function hai islye req and res hai ;

import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    // using destructuring
    const { name, email, password, phone, address } = req.body;

    // validations
    if (!name) {
      return res.send({ error: "Name is required" });
    }
    if (!email) {
      return res.send({ error: "email is required" });
    }
    if (!password) {
      return res.send({ error: "password is required" });
    }
    if (!phone) {
      return res.send({ error: "phoneNumber is required" });
    }
    if (!address) {
      return res.send({ error: "address is required" });
    }
    // if(!answer){
    //     return res.send({message :"answer is required"})
    // }

    // checking the user
    const exisitngUser = await userModel.findOne({ email: email });

    // existing user
    if (exisitngUser) {
      return res.status(200).send({
        success: true,
        message: "Already Register please login",
      });
    }

    // register user
    const hashedPassword = await hashPassword(password);
    const user = await new userModel({
      name,
      email,
      address,
      password: hashedPassword,
      phone,
    }).save();

    res.status(201).send({
      success: true,
      message: "User  Registered successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in registration",
      error,
    });
  }
};

//  post login
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    // validation

    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or  password",
      });
    }
    // check user;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registered",
      });
    }

    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid password",
      });
    }

    // token

    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "login succcessfully",
      user: {
        _id : user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in login",
      error,
    });
  }
};

export const testController = (req, res) => {
  try {
    res.send("protect Route");
  } catch (error) {
    console.log(error);
    res.send;
  }
};

// admin acccess

export const isAdmin = async (req, res ,next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (user.role !== 1) {
      return res.status(401).send({
        success: false,
        message: "unAuthorized Access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
        error,
        message : "errror in middleware"
    });
  }
};
