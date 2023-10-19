import { model, Schema } from "mongoose";
import { Examiner } from "../interfaces/examiner";
import { hashSync } from "bcrypt";

export const examinerSchema = new Schema<Examiner>({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    index: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  emailPassword: {
    type: String,
  },
  instituteName: {
    type: String,
  },
  instituteLogo: {
    type: String,
  },
});

examinerSchema.pre("save", function (next) {
  this.password = hashSync(this.password, 10);
  next();
});

export default model("Examiner", examinerSchema);
