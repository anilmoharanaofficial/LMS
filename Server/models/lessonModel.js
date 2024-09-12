import mongoose, { model, Schema } from "mongoose";

const lessonSchema = new Schema(
  {
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      minLenght: [8, "Title must be less atleast 8 characters"],
      maxLenght: [60, "Title should be less than 60 characters"],
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      minLenght: [50, "Description must be less atleast 50 characters"],
      maxLenght: [200, "Description should be less than 200 characters"],
    },
    content: {
      public_id: {
        type: String,
        required: true,
      },
      secure_url: {
        type: String,
        required: true,
      },
      duration: {
        type: String,
      },
    },
  },
  {
    timestamps: true,
  }
);

const Lesson = model("Lesson", lessonSchema);

export default Lesson;
