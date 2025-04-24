import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const getRelationships = async (req, res) => {
  try {
    const query =
      "SELECT followerUserId FROM relationships WHERE followedUserId = ?";
    const [data] = await db.execute(query, [req.query.followedUserId]);
    return res
      .status(200)
      .json(data.map((relationship) => relationship.followerUserId));
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const addRelationship = async (req, res) => {
  try {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    let userInfo;
    try {
      userInfo = jwt.verify(token, process.env.SECRET_KEY);
    } catch (err) {
      return res.status(403).json("Token is not valid");
    }

    const query = "INSERT INTO likes (`userId`, `postId`) VALUES (?, ?)";
    const values = [userInfo.id, req.body.postId];

    await db.execute(query, values);
    return res.status(200).json("Post has been liked");
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const deleteRelationship = async (req, res) => {
  try {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    let userInfo;
    try {
      userInfo = jwt.verify(token, process.env.SECRET_KEY);
    } catch (err) {
      return res.status(403).json("Token is not valid");
    }

    const query = "DELETE FROM likes WHERE `userId` = ? AND `postId` = ?";
    const values = [userInfo.id, req.query.postId];

    await db.execute(query, values);
    return res.status(200).json("Post has been unliked");
  } catch (err) {
    return res.status(500).json(err);
  }
};
