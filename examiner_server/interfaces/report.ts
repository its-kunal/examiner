import { Question } from "./question";

export interface Report {
  name: string;
  rollno: string;
  createdAt: Date;
  examId: string;
  remarks: string;
  examinerId: string;
  positiveMarks: number;
  negativeMarks: number;
  pdf: string;
  questions: Array<Question>;
  totalMarks: number;
  isExamEnded: boolean;
  percentage: number;
  maxMarks: number;
  totalQuestions: number;
  questionsCorrect: number;
  questionsWrong: number;
  questionUnanswered: number;
  questionAnswered: number;
}
