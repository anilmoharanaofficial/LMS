import { Router } from "express";
import {
  createLesson,
  deleteLesson,
  updateLesson,
} from "../controllers/lessonController.js";
import upload from "../middlewares/multer.js";

const uploadContent = upload.fields([{ name: "content", maxCount: 1 }]);

const lessonRouter = Router();

lessonRouter.post("/", uploadContent, createLesson);
lessonRouter.put("/:lessonId", uploadContent, updateLesson);
lessonRouter.delete("/:lessonId", deleteLesson);

export default lessonRouter;
