import Employee from "../models/Employee.js";
import Leave from "../models/Leave.js";

const addLeave = async (req, res) => {
  try {
    const { userId, leaveType, startDate, endDate, reason } = req.body;
    const employee = await Employee.findOne({ userId });

    const newLeave = new Leave({
      employeeId: employee._id,
      leaveType,
      startDate,
      endDate,
      reason,
    });
    await newLeave.save();
    return res.status(200).json({
      success: true,
      message: "Leave added successfully",
      newLeave,
    });
  } catch (error) {
    return res
      .status(500)
      .json({
        success: false,
        message: "Error in adding Leave",
        error: error.message,
      });
  }
};


const getLeaves = async (req, res) => {
  try {
    const { id } = req.params; // user._id from employee
    let leaves = await Leave.find({ employeeId: id });

    if (leaves.length === 0) { // check length
      const employee = await Employee.findOne({ userId: id });
      if (employee) {
        leaves = await Leave.find({ employeeId: employee._id });
      }
    }

    return res.status(200).json({ success: true, leaves });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error in fetching Leave", error: error.message });
  }
};



const getLeave=async(req,res)=>{
 try {
    const leaves=await Leave.find({}).populate({
      path:"employeeId",
      populate:[
        {
          path:'department',
          select:'deptName'
        },
        {
          path:'userId',
          select:'name',
        }
      ]
    });

    return res.status(200).json({success:true,leaves});
  } catch (error) {
    return res
      .status(500)
      .json({
        success: false,
        message: "Error in adding Leave",
        error: error.message,
      });
  }
}

const getLeaveDetail=async(req,res)=>{
  try {
    const {id}=req.params;
    const leave=await Leave.findById({_id:id}).populate({
      path:"employeeId",
      populate:[
        {
          path:'department',
          select:'deptName'
        },
        {
          path:'userId',
          select:'name profileImage',
        }
      ]
    });

    return res.status(200).json({success:true,leave});
  } catch (error) {
    return res
      .status(500)
      .json({
        success: false,
        message: "Error in adding Leave",
        error: error.message,
      });
  }
}


const updateLeave=async(req,res)=>{
    try{
     const {id}=req.params;
     const leave=await Leave.findByIdAndUpdate(id,{status:req.body.status});
     if(!leave)
     {
      return res
      .status(404)
      .json({
        success: false,
        message: "Leave Not Found",
      });
     }
     return res
      .status(200)
      .json({
        success: true,
      });
    }
    catch (error) {
    return res
      .status(500)
      .json({
        success: false,
        message: "Error in Updating Leave",
        error: error.message,
      });
  }
}

export { addLeave, getLeaves,getLeave,getLeaveDetail,updateLeave};
