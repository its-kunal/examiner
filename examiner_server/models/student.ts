import { model, Schema } from "mongoose";
import { Student } from "../interfaces/student";
import { hashSync } from "bcrypt";

export const studentSchema = new Schema<Student>({
  name: {
    type: String,
    required: true,
  },
  rollno: {
    unique: true,
    type: String,
    index: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  isLoggedIn: {
    type: Boolean,
    default: false,
  },
});

studentSchema.pre("save", function (next) {
  this.password = hashSync(this.password, 10);
  this.email = this.email?.toLowerCase();
  next();
});

export default model("Student", studentSchema);
