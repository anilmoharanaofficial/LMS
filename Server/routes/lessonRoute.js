import { Router } from "express";
import {
  createLesson,
  deleteLesson,
  updateLesson,
} from "../controllers/lessonController.js";
import upload from "../middlewares/multer.js";
import { authorized, isLoggedIn } from "../middlewares/authMiddleware.js";

const uploadContent = upload.fields([{ name: "content", maxCount: 1 }]);

const lessonRouter = Router();

lessonRouter.post(
  "/",
  isLoggedIn,
  authorized("ADMIN"),
  uploadContent,
  createLesson
);

lessonRouter.put(
  "/:lessonId",
  isLoggedIn,
  authorized("ADMIN"),
  uploadContent,
  updateLesson
);

lessonRouter.delete(
  "/:lessonId",
  isLoggedIn,
  authorized("ADMIN"),
  deleteLesson
);

export default lessonRouter;
