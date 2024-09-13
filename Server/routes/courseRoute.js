import { Router } from "express";
import {
  createCourse,
  deleteCourse,
  getAllCourse,
  getCourse,
  updateCourse,
} from "../controllers/courseController.js";
import { authorized, isLoggedIn } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/multer.js";

const setThumbnail = upload.fields([{ name: "thumbnail", maxCount: 1 }]);

const courceRouter = Router();

courceRouter
  .route("/")
  .get(getAllCourse)
  .post(isLoggedIn, authorized("ADMIN"), setThumbnail, createCourse);

courceRouter
  .route("/:courseId")
  .put(isLoggedIn, authorized("ADMIN"), setThumbnail, updateCourse)
  .delete(isLoggedIn, authorized("ADMIN"), deleteCourse)
  .get(isLoggedIn, getCourse);

export default courceRouter;
