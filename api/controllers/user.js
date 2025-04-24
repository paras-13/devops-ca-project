import { db } from "../connect.js";

export const getUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const query = "SELECT * FROM users WHERE id = ?";
    const [data] = await db.execute(query, [userId]);

    if (data.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const { password, ...info } = data[0];
    return res.status(200).json(info);
  } catch (err) {
    return res.status(500).json(err);
  }
};
