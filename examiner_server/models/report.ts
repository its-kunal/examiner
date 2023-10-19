import { model, Schema } from "mongoose";
import { questionSchema } from "./exam";
import { Report } from "../interfaces/report";
import { Question } from "../interfaces/question";

export const reportSchema = new Schema<Report>({
  name: {
    type: String,
    required: true,
  },
  rollno: {
    type: String,
    required: true,
    index: true,
  },
  createdAt: {
    type: Schema.Types.Date,
    default: Date.now,
  },
  examId: {
    type: String,
    required: true,
    index: true,
  },
  remarks: {
    type: String,
  },
  positiveMarks: {
    type: Number,
    required: true,
    min: 0,
  },
  negativeMarks: {
    type: Number,
    required: true,
    min: 0,
  },
  pdf: String,
  questions: [
    {
      type: questionSchema,
    },
  ],
  totalMarks: Number,
  maxMarks: Number,
  totalQuestions: Number,
  questionsCorrect: Number,
  questionsWrong: Number,
  questionUnanswered: Number,
  questionAnswered : Number,
  percentage: Number,
  isExamEnded: {
    type: Boolean,
    default: false,
  },
});

export default model("Report", reportSchema);
