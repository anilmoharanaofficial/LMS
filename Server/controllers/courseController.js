import Course from "../models/courseModel.js";
import AppError from "../utils/AppError.js";
import catchAsync from "../utils/catchAsync.js";
import sendResponse from "../utils/sendResponse.js";
import cloudinary from "cloudinary";
import fs from "fs";

////////////////////////////////
//CREATE COURSE
const createCourse = catchAsync(async (req, res, next) => {
  const { title, description, category, createdBy } = req.body;

  if (!title || !description || !category || !createdBy)
    return next(new AppError("All fields are requred"));

  const course = await Course.create({
    title,
    description,
    category,
    createdBy,
    thumbnail: {
      public_id: "Default Thumbnail/Default_Thumbnail",
      secure_url:
        "https://res.cloudinary.com/dtlj4q6a4/image/upload/v1726073940/Default%20Thumbnail/Default_Thumbnail.png",
    },
  });

  if (req.files) {
    if (req.files.thumbnail) {
      const details = await cloudinary.v2.uploader.upload(
        req.files.thumbnail[0].path,
        {
          folder: "LMS/Courses/Thumbnail",
          use_filename: true,
        }
      );

      if (details) {
        course.thumbnail.public_id = details.public_id;
        course.thumbnail.secure_url = details.secure_url;

        if (fs.existsSync(`uploads/${req.files.thumbnail[0].filename}`)) {
          fs.rmSync(`uploads/${req.files.thumbnail[0].filename}`);
        }
      } else {
        throw new AppError("Thumbnail uploading failed", 500);
      }
    }
  }

  if (!course) {
    return next(
      new AppError("Course could not be created, please try again", 400)
    );
  }

  await course.save();

  sendResponse(res, "Course created successfully", course);
});

////////////////////////////////
//UPDATE COURCSE
const updateCourse = catchAsync(async (req, res, next) => {
  const { courseId } = req.params;

  const course = await Course.findByIdAndUpdate(
    courseId,
    {
      $set: req.body,
    },
    {
      runValidators: true,
    }
  );

  if (!course) {
    return next(new AppError("Course not found", 404));
  }

  Object.assign(course, req.body);

  if (req.files && req.files.thumbnail) {
    const result = await cloudinary.v2.uploader.upload(
      req.files.thumbnail[0].path,
      {
        folder: "LMS/Courses/Thumbnail",
        use_filename: true,
      }
    );

    if (result) {
      if (course.thumbnail && course.thumbnail.public_id) {
        await cloudinary.v2.uploader.destroy(course.thumbnail.public_id, {
          type: "upload",
          resource_type: "image",
        });
      }

      course.thumbnail = {
        public_id: result.public_id,
        secure_url: result.secure_url,
      };

      if (fs.existsSync(`uploads/${req.files.thumbnail[0].filename}`)) {
        fs.rmSync(`uploads/${req.files.thumbnail[0].filename}`);
      }
    } else {
      throw new AppError("Thumbnail uploading failed", 500);
    }
  }

  await course.save();

  sendResponse(res, "Course updated successfully", course);
});

////////////////////////////////
//DLETE COURSE
const deleteCourse = catchAsync(async (req, res, next) => {
  const { courseId } = req.params;
  const course = await Course.findByIdAndDelete(courseId);

  if (!course) return next(new AppError("Course dose not found", 404));

  sendResponse(res, "Course and its lessons deleted successfully", null);
});

////////////////////////////////
//GET ALL COURSES
const getAllCourse = catchAsync(async (req, res) => {
  const courses = await Course.find({}).select("-lectures");

  sendResponse(res, "All courses", courses);
});

////////////////////////////////
//GET COURSE * SINGLE BY ID
const getCourse = catchAsync(async (req, res) => {
  const { courseId } = req.params;

  const course = await Course.findById(courseId).populate("lessons");

  if (!course) return next(new AppError("Course dose not exit", 404));

  sendResponse(res, "Course with lessons", course);
});

export { createCourse, updateCourse, deleteCourse, getCourse, getAllCourse };
