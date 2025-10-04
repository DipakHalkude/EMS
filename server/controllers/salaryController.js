import Salary from "../models/Salary.js";
import Employee from "../models/Employee.js";

const addSalary = async (req, res) => {
  try {
    const { employeeId, basicSalary, allowances, deductions, payDate } =
      req.body;

    const totalSalary =
      parseInt(basicSalary) + parseInt(allowances) - parseInt(deductions);

    const newSalary = new Salary({
      employeeId,
      basicSalary,
      allowances,
      deductions,
      netSalary: totalSalary,
      payDate,
    });
    await newSalary.save();
    return res
      .status(201)
      .json({ message: "Salary added successfully", newSalary });
  } catch (error) {
    return res
      .status(500)
      .json({
        success: false,
        message: "Error in adding salary",
        error: error.message,
      });
  }
};


const getSalary = async (req, res) => {
  try {
    const { id } = req.params;

    // Try to find salary by employeeId
    let salary = await Salary.find({ employeeId: id }).populate(
      "employeeId",
      "employeeId"
    );

    // If no salary found, try to find employee by userId (optional)
    if (!salary || salary.length < 1) {
      const employee = await Employee.findOne({ userId: id });
      if (!employee) {
        return res.status(200).json({ success: true, salary: [] }); // no salary and no employee found
      }
      salary = await Salary.find({ employeeId: employee._id }).populate(
        "employeeId",
        "employeeId"
      );
    }

    // Always return salary array (can be empty)
    return res.status(200).json({ success: true, salary });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in fetching salary",
      error: error.message,
    });
  }
};

export { addSalary, getSalary };
