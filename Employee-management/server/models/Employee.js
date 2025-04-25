import mongoose from "mongoose";
import { Schema } from "mongoose";

const employeeSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  employeeId: { type: String, required: true, unique: true }, // match `employeeId`
  dob: { type: Date },
  gender: { type: String },
  maritalStatus: { type: String }, // match `maritalStatus`
  designation: { type: String },
  department: { type: Schema.Types.ObjectId, ref: "Department", required: true }, // must be _id
  salary: { type: Number, required: true },
  image: { type: String }, // ✅ ADD THIS
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});


const Employee = mongoose.model("Employee", employeeSchema);
export default Employee;
