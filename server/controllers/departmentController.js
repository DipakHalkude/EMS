import Department from "../models/Department.js";

const getDepartments = async (req, res) => {
  try {
    const departments = await Department.find({});
    return res.status(200).json({ success: true, departments });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Get Department Server Error" });
  }
};

const addDepartment = async (req, res) => {
  try {
    const { deptName, deptDesc } = req.body;

    const newDep = new Department({
      deptName,
      deptDesc,
    });

    await newDep.save();
    return res.status(200).json({ success: true, department: newDep });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Internal Server Error In Add Department",
    });
  }
};

const getDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const department = await Department.findById({ _id: id });
    return res.status(200).json({ success: true, department });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Get Department Server Error" });
  }
};

const editDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const { deptName, deptDesc } = req.body;
    const updateDept = await Department.findByIdAndUpdate(
      { _id: id },
      { deptName, deptDesc },
      { new: true }
    );
    return res.status(200).json({ success: true, updateDept });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Edit Department Server Error" });
  }
};

//   try {
//     const { id } = req.params;

//     const deleteDep = await Department.findById({_id:id});
//     if (!deleteDep) {
//       return res
//         .status(404)
//         .json({ success: false, error: "Department not found" });
//     }

//     await deleteDep.deleteOne(); // safe now
//     return res.status(200).json({ success: true, department: deleteDep });
//   } catch (error) {
//     console.error("Delete Error:", error.message);
//     return res
//       .status(500)
//       .json({ success: false, error: "Delete Department Server Error" });
//   }
// };

// const deleteDepartment = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const department = await Department.findById(id);
//     if (!department) {
//       return res.status(404).json({ success: false, error: "Department not found" });
//     }

//     // Check if any employee belongs to this department
//     const employeeCount = await Employee.countDocuments({ department: id });
//     if (employeeCount > 0) {
//       return res.status(400).json({
//         success: false,
//         error: "Cannot delete department with employees. Delete employees first.",
//       });
//     }

//     await department.deleteOne();
//     return res.status(200).json({ success: true, department });
//   } catch (error) {
//     console.error("Delete Error:", error.message);
//     return res.status(500).json({ success: false, error: "Delete Department Server Error" });
//   }
// };

const deleteDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const department = await Department.findById(id);
    if (!department) {
      return res
        .status(404)
        .json({ success: false, error: "Department not found" });
    }

    await department.deleteOne(); // triggers pre-hook to delete employees, leaves, salaries
    return res.status(200).json({ success: true, department });
  } catch (error) {
    console.error("Delete Error:", error.message);
    return res
      .status(500)
      .json({ success: false, error: "Delete Department Server Error" });
  }
};

export {
  addDepartment,
  getDepartments,
  getDepartment,
  editDepartment,
  deleteDepartment,
};
