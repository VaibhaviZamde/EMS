import Department from "../models/Department.js";

// ✅ Get all departments
const getDepartments = async (req, res) => {
  try {
    const departments = await Department.find();
    return res.status(200).json({ success: true, departments });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Server error while fetching departments",
    });
  }
};

// ✅ Add new department
const addDepartment = async (req, res) => {
  try {
    const { dep_name, description } = req.body;

    const newDep = new Department({ dep_name, description });
    await newDep.save();

    return res.status(201).json({ success: true, department: newDep });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Server error while adding department",
    });
  }
};

// ✅ Get a department by ID
const getDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const department = await Department.findById(id);

    if (!department) {
      return res.status(404).json({
        success: false,
        error: "Department not found",
      });
    }

    return res.status(200).json({ success: true, department });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Server error while fetching department",
    });
  }
};

// ✅ Update department by ID
const updateDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const { dep_name, description } = req.body;

    const updateDep = await Department.findByIdAndUpdate(
      id,
      { dep_name, description },
      { new: true } // Returns the updated document
    );

    if (!updateDep) {
      return res.status(404).json({
        success: false,
        error: "Department not found",
      });
    }

    return res.status(200).json({ success: true, updateDep });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Server error while updating department",
    });
  }
};

// ✅ Delete department by ID
const deleteDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteDep = await Department.findByIdAndDelete(id);

    if (!deleteDep) {
      return res.status(404).json({
        success: false,
        error: "Department not found",
      });
    }

    return res.status(200).json({ success: true, deleteDep });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Server error while deleting department",
    });
  }
};

export {
  addDepartment,
  getDepartments,
  getDepartment,
  updateDepartment,
  deleteDepartment,
};
