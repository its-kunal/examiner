import { model, Schema } from "mongoose";
import { Exam } from "../interfaces/exam";
import { Question } from "../interfaces/question";
import mongoose from "mongoose";

export const questionSchema = new Schema<Question>({
  id: {
    type: String,
  },
  question: {
    type: String,
    required: true,
  },
  options: [
    {
      type: String,
    },
  ],
  correctAnswer: {
    type: String,
    required: true,
  },
  selectedAnswer: {
    type: String,
  },
  negativeMarks: {
    type: Number,
    required: true,
    default: 0,
  },
  positiveMarks: {
    type: Number,
    required: true,
    default: 1,
  },
  isImage: {
    type: Boolean,
    default: false,
  },
});

const examSchema = new Schema<Exam>({
  name: { type: String, required: true },
  questions: [{ type: questionSchema }],
  username: { type: String, index: true },
  instituteName: { type: String, required: true },
  instituteLogo: { type: String, required: true },
  instructions: [{ type: String, required: true }],
  startedAt: {
    type: mongoose.Schema.Types.Date,
    required: true,
  },
  endsAt: {
    type: mongoose.Schema.Types.Date,
    required: true,
  },
  status: {
    type: String,
    default: "Upcoming",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default model("Exam", examSchema);
