import { Router } from "express";
import {
  addLecturesByCourseId,
  createCourse,
  deleteCource,
  getAllCourses,
  getLecturesByCourseId,
  updateCource,
} from "../controllers/courceController.js";
import {
  isLoggedIn,
  authorizedRoles,
  authorizedSubscriber,
} from "../middlewares/authMiddleware.js";
import upload from "../middlewares/multerMiddleware.js";

const courceRoutes = Router();

courceRoutes
  .route("/")
  .get(getAllCourses)
  .post(
    isLoggedIn,
    authorizedRoles("ADMIN"),
    upload.single("thumbnail"),
    createCourse
  );

courceRoutes
  .route("/:id")
  .get(isLoggedIn, authorizedSubscriber, getLecturesByCourseId)
  .put(isLoggedIn, authorizedRoles("ADMIN"), updateCource)
  .delete(isLoggedIn, authorizedRoles("ADMIN"), deleteCource)
  .post(upload.single("lecture"), addLecturesByCourseId);

// courceRouter.get("/", getAllCourses);
// courceRouter.get("/:id", getLecturesByCourseId);

//Exporting................
export default courceRoutes;
