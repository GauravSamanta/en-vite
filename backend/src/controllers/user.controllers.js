import { asyncHandler } from "../helpers/asyncHandler.js";

export const getUser = asyncHandler(async (req, res) => {
  res.json(["Hello User"]);
});
