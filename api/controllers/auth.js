import { db } from "../connect.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const register = async (req, res) => {
  try {
    // Check if user exists
    const q = "SELECT * FROM users WHERE username = ?";
    const [data] = await db.execute(q, [req.body.username]);

    if (data.length) return res.status(409).json("User already exists");

    // Hash password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    // Insert new user
    const insertQuery =
      "INSERT INTO users (`username`, `email`, `password`, `name`) VALUES (?, ?, ?, ?)";
    const values = [
      req.body.username,
      req.body.email,
      hashedPassword,
      req.body.name,
    ];

    await db.execute(insertQuery, values);

    return res.status(200).json("User has been created");
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const login = async (req, res) => {
  try {
    const q = "SELECT * FROM users WHERE username = ?";
    const [data] = await db.execute(q, [req.body.username]);

    if (data.length === 0) return res.status(404).json("User Not found");

    const checkPassword = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );

    if (!checkPassword)
      return res.status(400).json("Wrong username or password");

    const token = jwt.sign({ id: data[0].id }, process.env.SECRET_KEY);

    const { password, ...others } = data[0];

    res
      .cookie("accessToken", token, {
        httpOnly: true,
      })
      .status(200)
      .json(others);
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const logout = (req, res) => {
  res
    .clearCookie("accessToken", {
      secure: true,
      sameSite: "none",
    })
    .status(200)
    .json("User has been logged out");
};
