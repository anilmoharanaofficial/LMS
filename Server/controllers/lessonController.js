import { formatDuration } from "../helper/helper.js";
import Course from "../models/courseModel.js";
import Lesson from "../models/lessonModel.js";
import AppError from "../utils/AppError.js";
import catchAsync from "../utils/catchAsync.js";
import sendResponse from "../utils/sendResponse.js";
import cloudinary from "cloudinary";
import fs from "fs";
import mongoose from "mongoose";

//////////////////////////////////////
//CREATE LESSON
const createLesson = catchAsync(async (req, res, next) => {
  const { title, description, courseId } = req.body;

  const session = await mongoose.startSession();
  session.startTransaction();

  const course = await Course.findById(courseId);
  if (!course) {
    await session.abortTransaction();
    return next(new AppError("Course not found", 404));
  }

  if (!title || !description) {
    await session.abortTransaction();
    return next(new AppError("All fields are required"));
  }

  const lesson = await Lesson.create(
    [
      {
        title,
        description,
        course: courseId,
        content: {
          public_id: "DUMMY",
          secure_url: "DUMMY_URL",
          duration: "",
        },
      },
    ],
    { session }
  );

  if (req.files) {
    if (req.files.content) {
      const details = await cloudinary.v2.uploader.upload(
        req.files.content[0].path,
        {
          folder: "LMS/Courses/Lessons",
          use_filename: true,
          streaming_profile: "auto",
          resource_type: "video",
        }
      );

      if (details) {
        lesson[0].content.public_id = details.public_id;
        lesson[0].content.secure_url = details.secure_url;
        lesson[0].content.duration = formatDuration(details.duration);

        if (fs.existsSync(`uploads/${req.files.content[0].filename}`)) {
          fs.rmSync(`uploads/${req.files.content[0].filename}`);
        }
      } else {
        await session.abortTransaction();
        throw new AppError("Content uploading failed", 500);
      }
    }
  }

  course.lessons.push(lesson[0]._id);
  course.numbersOfLessons = course.lessons.length;

  await course.save({ session });
  await lesson[0].save({ session });

  await session.commitTransaction();
  session.endSession();

  sendResponse(res, "Lesson created and added to course successfully", lesson);
});

//////////////////////////////////////
//UPDATE LESSON
const updateLesson = catchAsync(async (req, res, next) => {
  const { lessonId } = req.params;

  const lesson = await Lesson.findById(lessonId);

  if (!lesson)
    return next(new AppError("Lesson with given Id does not exist", 404));

  Object.assign(lesson, req.body);

  if (req.files && req.files.content) {
    const result = await cloudinary.v2.uploader.upload(
      req.files.content[0].path,
      {
        folder: "LMS/Courses/Lessons",
        use_filename: true,
        streaming_profile: "auto",
        resource_type: "video",
      }
    );

    if (result) {
      if (lesson.content && lesson.content.public_id) {
        await cloudinary.v2.uploader.destroy(lesson.content.public_id, {
          type: "upload",
          resource_type: "video",
        });
      }

      lesson.content = {
        public_id: result.public_id,
        secure_url: result.secure_url,
        duration: formatDuration(result.duration),
      };

      if (fs.existsSync(`uploads/${req.files.content[0].filename}`)) {
        fs.rmSync(`uploads/${req.files.content[0].filename}`);
      }
    } else {
      throw new AppError("Content uploading failed", 500);
    }
  }

  await lesson.save();

  sendResponse(res, "Lesson updated successfully", lesson);
});

//////////////////////////////////////
//DELETE LESSON
const deleteLesson = catchAsync(async (req, res, next) => {
  const { lessonId } = req.params;

  const session = await mongoose.startSession();
  session.startTransaction();

  const lesson = await Lesson.findByIdAndDelete(lessonId, { session });

  if (!lesson) {
    await session.abortTransaction();
    session.endSession();
    return next(new AppError("Lesson not found", 404));
  }

  const course = await Course.findById(lesson.course).session(session);

  if (!course) {
    await session.abortTransaction();
    session.endSession();
    return next(new AppError("Course linked to this lesson not found", 404));
  }

  course.lessons = course.lessons.filter(
    (lesson) => lesson.toString() !== lessonId.toString()
  );

  course.numbersOfLessons = course.lessons.length;
  await course.save({ session });

  if (lesson.content && lesson.content.public_id) {
    await cloudinary.v2.uploader.destroy(lesson.content.public_id, {
      type: "upload",
      resource_type: "video",
    });
  }

  await session.commitTransaction();
  session.endSession();

  sendResponse(res, "Lesson deleted successfully");
});

export { createLesson, updateLesson, deleteLesson };
