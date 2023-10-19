import { Question } from "./question";

export interface Exam {
  name: string;
  questions: Array<Question>;
  instituteName: string;
  instituteLogo: string;
  instructions: string[];
  startedAt: Date;
  endsAt: Date;
  status: "Started" | "Ended" | "Upcoming";
  createdAt: Date;
  username: string;
}
