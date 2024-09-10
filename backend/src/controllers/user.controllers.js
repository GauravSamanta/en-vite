import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { asyncHandler } from "../helpers/asyncHandler.js";

export const getUser = asyncHandler(async (req, res) => {
  res.json(["Hello User"]);
});

export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res
      .status(404)
      .json({ sucess: false, msg: "All credentials required" });
  }
  const prisma = new PrismaClient();
  const emailExists = await prisma.user.findFirst({
    where: {
      email,
    },
  });
  if (emailExists) {
    return res.status(404).json({
      sucess: false,
      msg: "User with this email already exists",
    });
  }
  const nameParts = name.trim().split(/\s+/);

  const firstName = nameParts[0];
  const lastName = nameParts[nameParts.length - 1];
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const userCreated = await prisma.user.create({
    data: {
      firstName,
      lastName,
      email,
      password: hashedPassword,
    },
  });
  if (!userCreated) {
    return res
      .status(500)
      .json({ sucess: false, msg: "Please try again later" });
  }

  return res
    .status(201)
    .json({ sucess: true, msg: "User registered successfully" });
});

export const loginUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!email || !password) {
    return res
      .status(404)
      .json({ sucess: false, msg: "All credentials required" });
  }

  const prisma = new PrismaClient();
  const userExists = await prisma.user.findFirst({
    where: {
      email,
    },
  });
  if (!userExists) {
    return res.status(404).json({
      sucess: false,
      msg: "User with this email doesnt exists",
    });
  }

  const validUser = await bcrypt.compare(password, userExists.password);
  if (!validUser) {
    return res.status(401).json({
      sucess: false,
      msg: "Invalid credentials",
    });
  }
  const payload = {
    id: userExists.id,
    firstName: userExists.firstName,
    lastName: userExists.lastName,
    email: userExists.email,
  };
  const options = {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  };
  const token = jwt.sign(payload, process.env.JWT);
  return res
    .status(200)
    .cookie("token", token, options)
    .json({ success: true, msg: "User logged in successfully" });
});
