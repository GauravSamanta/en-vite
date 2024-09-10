import jwt from "jsonwebtoken";

export const verifyUser = async (req, res, next) => {
  const token = req.headers.cookie.split("=")[1];
  console.log(token);
  const verified = jwt.verify(token, process.env.JWT);
  if (!verified) {
    return res.status(401).json({ success: false, msg: "Unauthorized access" });
  }
  req.user = jwt.decode(token);
  console.log(req.user);

  next();
};
