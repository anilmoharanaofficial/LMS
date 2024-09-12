import { Router } from "express";
import {
  createCourse,
  deleteCourse,
  getAllCourse,
  getCourse,
  updateCourse,
} from "../controllers/courseController.js";
import { isLoggedIn } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/multer.js";

const setThumbnail = upload.fields([{ name: "thumbnail", maxCount: 1 }]);

const courceRouter = Router();

courceRouter
  .route("/")
  .get(getAllCourse)
  .post(isLoggedIn, setThumbnail, createCourse);

courceRouter
  .route("/:courseId")
  .put(isLoggedIn, setThumbnail, updateCourse)
  .delete(isLoggedIn, deleteCourse)
  .get(isLoggedIn, getCourse);

export default courceRouter;
