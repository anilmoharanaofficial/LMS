import Course from "../models/courseModel.js";
import AppError from "../utils/errorUtil.js";
import cloudinary from "cloudinary";
import fs from "fs";

///////////////////////////////
/////////ALL COURCESS
const getAllCourses = async (req, res, next) => {
  try {
    const courses = await Course.find({}).select("-lectures");

    //Success Status
    res.status(200).json({
      success: true,
      message: "All Courses",
      courses,
    });
  } catch (error) {
    return next(new AppError(error.message));
  }
};

///////////////////////////////
///GET LECTUREs BY COURCE ID
const getLecturesByCourseId = async (req, res, next) => {
  try {
    const { id } = req.params;

    const course = await Course.findById(id);

    if (!course) {
      return next(new AppError("Invalid course id", 400));
    }

    //Success Status
    res.status(200).json({
      success: true,
      message: "All Courses",
      lectures: course.lectures,
    });
  } catch (error) {
    return next(new AppError(error.message));
  }
};

//////////////////////////////
///CREATE COURCE
const createCourse = async (req, res, next) => {
  const { title, description, category, createdBy } = req.body;

  // Validation
  if (!title || !description || !category || !createdBy) {
    return next(new AppError("All fields are required", 400));
  }

  try {
    const course = await Course.create({
      title,
      description,
      category,
      createdBy,
      thumbnail: {
        public_id: "Dummy",
        secure_url: "Dummy",
      },
    });

    if (!course) {
      return next(
        new AppError("Course could not be created, please try again", 400)
      );
    }

    // Upload File
    if (req.file) {
      const result = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: "LMS",
      });
      if (result) {
        course.thumbnail.public_id = result.public_id;
        course.thumbnail.secure_url = result.secure_url;

        // Remove file from local server
        if (fs.existsSync(`uploads/${req.file.filename}`)) {
          fs.rmSync(`uploads/${req.file.filename}`);
        }
      } else {
        throw new AppError("File upload to Cloudinary failed", 400);
      }
    }

    // Save Course
    await course.save();

    // Success Status
    res.status(200).json({
      success: true,
      message: "Course created successfully",
      course,
    });
  } catch (error) {
    return next(new AppError(error.message, 400));
  }
};

///////////////////////////////
//UPDATE COURCE
const updateCource = async (req, res, next) => {
  try {
    const { id } = req.params;
    const course = await Course.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      {
        runValidators: true,
      }
    );

    //Validator
    if (!course) {
      return next(new AppError("Course with given Id dose not exist", 500));
    }

    // Success Status
    res.status(200).json({
      success: true,
      message: "Course Updated successfully",
      course,
    });
  } catch (error) {
    return next(new AppError(error.message, 400));
  }
};

//////////////////////////////////////////
//DLETE COURCE
const deleteCource = async (req, res, next) => {
  try {
    const { id } = req.params;
    const course = await Course.findById(id);

    //Validator
    if (!course) {
      return next(new AppError("Course with given Id dose not exist", 500));
    }

    //Delete Course
    await course.deleteOne();

    // Success Status
    res.status(200).json({
      success: true,
      message: "Course Removed successfully",
      course,
    });
  } catch (error) {
    return next(new AppError(error.message, 400));
  }
};

/////////////////////////////////////////////////////
////////Add Lectures
const addLecturesByCourseId = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const { id } = req.params;

    const course = await Course.findById(id);

    if (!course) {
      return next(new AppError("Course with given Id dose not exist", 500));
    }

    const lectureData = {
      title,
      description,
      lecture: {
        public_id: "Dummy",
        secure_url: "Dummy",
      },
    };

    // Upload File
    if (req.file) {
      const result = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: "LMS",
      });
      if (result) {
        lectureData.lecture.public_id = result.public_id;
        lectureData.lecture.secure_url = result.secure_url;

        // Remove file from local server
        if (fs.existsSync(`uploads/${req.file.filename}`)) {
          fs.rmSync(`uploads/${req.file.filename}`);
        }
      } else {
        throw new AppError("File upload to Cloudinary failed", 400);
      }
    }

    course.lectures.push(lectureData);

    course.numbersOfLectures = course.lectures.length;

    await course.save();

    // Success Status
    res.status(200).json({
      success: true,
      message: "Lectures successfully added to the course",
      course,
    });
  } catch (error) {
    return next(new AppError(error.message, 400));
  }
};

//Expoting.............
export {
  getAllCourses,
  getLecturesByCourseId,
  createCourse,
  updateCource,
  deleteCource,
  addLecturesByCourseId,
};
