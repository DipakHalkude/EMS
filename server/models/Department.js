import mongoose from "mongoose";
import Employee from "./Employee.js";
import Leave from "./Leave.js";
import Salary from "./Salary.js";
import User from "./User.js"; // <-- import User model

const departmentSchema = new mongoose.Schema({
  deptName: { type: String, required: true, unique: true },
  deptDesc: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

departmentSchema.pre("deleteOne", { document: true, query: false }, async function (next) {
  try {
    const employees = await Employee.find({ department: this._id });
    const empIds = employees.map((emp) => emp._id);
    const userIds = employees.map((emp) => emp.userId); // <-- get userIds from employee

    // Delete related documents
    await Employee.deleteMany({ department: this._id });
    await Leave.deleteMany({ employeeId: { $in: empIds } });
    await Salary.deleteMany({ employeeId: { $in: empIds } });
    await User.deleteMany({ _id: { $in: userIds } }); // <-- delete user accounts

    next();
  } catch (error) {
    next(error);
  }
});

const Department = mongoose.model("Department", departmentSchema);

export default Department;
