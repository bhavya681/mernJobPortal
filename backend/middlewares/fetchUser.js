import dotenv from "dotenv";
import express from "express";
import jwt from "jsonwebtoken";

const fetchUser = async (req, res, next) => {
  try {
    // const token = req.cookie.token;
    const token=req.header('auth-token');
    if (!token) {
      return res
        .status(401)
        .json({
          success: false,
          message: "Authenticate Using Valid Jwt Token",
        });
    }
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    req.id = userId;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ success: false, message: "Authenticate Using Valid Jwt Token" });
  }
};

export default fetchUser;
