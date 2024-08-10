import { Router } from "express";
import {
  changePassword,
  forgotPassword,
  getProfile,
  login,
  logout,
  register,
  resetPassword,
  updateUser,
} from "../controllers/userControllers.js";
import { isLoggedIn } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/multerMiddleware.js";

const userRoutes = Router();

//User Routes
// userRoutes.post("/register", register);
userRoutes.post("/register", upload.single("avatar"), register);
userRoutes.post("/login", login);
userRoutes.get("/logout", logout);
userRoutes.get("/profile", isLoggedIn, getProfile);
userRoutes.post("/forgot-password", forgotPassword);
userRoutes.post("/reset/:resetToken", resetPassword);
userRoutes.post("/change-password", isLoggedIn, changePassword);
userRoutes.put("/update", isLoggedIn, upload.single("avatar"), updateUser);

//Exporting.......
export default userRoutes;
