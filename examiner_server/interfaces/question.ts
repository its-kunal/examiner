export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  negativeMarks: number;
  positiveMarks: number;
  isImage: boolean;
  selectedAnswer?: string;
}
