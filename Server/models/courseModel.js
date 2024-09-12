import { Schema, model } from "mongoose";
import cloudinary from "cloudinary";
import Lesson from "./lessonModel.js";

const courseSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      minLenght: [8, "Title must be less atleast 8 characters"],
      maxLenght: [60, "Title should be less than 60 characters"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      minLenght: [50, "Description must be less atleast 50 characters"],
      maxLenght: [200, "Description should be less than 200 characters"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
    },
    thumbnail: {
      public_id: {
        type: String,
        required: true,
      },
      secure_url: {
        type: String,
        required: true,
      },
    },
    createdBy: {
      type: String,
      required: true,
    },
    numbersOfLessons: {
      type: Number,
      default: 0,
    },
    lessons: { type: [Schema.Types.ObjectId], ref: "Lesson", required: true },
  },
  {
    timestamps: true,
  }
);

courseSchema.pre("findOneAndDelete", async function (next) {
  const courseId = this.getQuery()._id;

  // Delete Course
  const course = await this.model.findById(courseId);
  if (!course) {
    return next(new Error("Course not found"));
  }

  if (course.thumbnail && course.thumbnail.public_id) {
    await cloudinary.v2.uploader.destroy(course.thumbnail.public_id, {
      type: "upload",
      resource_type: "image",
    });
  }

  // Delete all lessons
  const lessonsData = await Lesson.find({ course: courseId });

  for (const lesson of lessonsData) {
    if (lesson.content && lesson.content.public_id) {
      await cloudinary.v2.uploader.destroy(lesson.content.public_id, {
        resource_type: "video",
      });
    }
  }

  await Lesson.deleteMany({ course: courseId });

  next();
});

const Course = model("Course", courseSchema);

export default Course;
