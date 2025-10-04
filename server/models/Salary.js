import mongoose from "mongoose";
const { Schema, model } = mongoose;

const salarySchema = new Schema(
  {
    employeeId: { type: Schema.Types.ObjectId, ref: "Employee", required: true },
    basicSalary: { type: Number, required: true },
    allowances: { type: Number, default: 0 },
    deductions: { type: Number, default: 0 },
    netSalary: { type: Number }, // optional, can calculate before save
    payDate: { type: Date, required: true },
  },
  { timestamps: true } // automatically adds createdAt and updatedAt
);


const Salary = model("Salary", salarySchema);
export default Salary;
