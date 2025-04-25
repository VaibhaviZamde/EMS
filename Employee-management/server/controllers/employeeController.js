import fs from "fs";
import path from "path";
import multer from "multer";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import Employee from "../models/Employee.js";
import Department from "../models/Department.js";

// Ensure the upload directory exists
const uploadDir = path.join(process.cwd(), "public", "uploads");
try {
  fs.mkdirSync(uploadDir, { recursive: true });
} catch (err) {
  console.error("Failed to create upload directory:", err);
}

// Configure multer storage
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, uploadDir);
  },
  filename(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

// Export the upload middleware with file size limit (e.g., 2MB)
export const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB limit
  fileFilter(req, file, cb) {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error('Only image files are allowed'), false);
    }
    cb(null, true);
  },
});

// Add employee controller
export const addEmployee = async (req, res) => {
  try {
    console.log("REQ.BODY:", req.body);
    console.log("REQ.FILE:", req.file);

    // List of required fields for employee creation
    const required = [
      "name", "email", "employeeId", "dob", "gender", "maritalStatus",
      "designation", "department", "salary", "password", "role"
    ];

    // Check for missing required fields
    for (let field of required) {
      if (!req.body[field]) {
        return res.status(400).json({
          success: false,
          error: `Missing required field: ${field}`
        });
      }
    }

    // Check if file is uploaded
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: "Missing required file: image"
      });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: "User already exists"
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Create the user (this may depend on your flow)
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      role: req.body.role,
      profileImage: req.file.filename, // Store image filename
    });

    const savedUser = await user.save();

    // Check if department exists
    const department = await Department.findById(req.body.department);
    if (!department) {
      return res.status(400).json({
        success: false,
        error: "Department not found"
      });
    }

    // Create the employee
    const newEmployee = new Employee({
      name: req.body.name,
      email: req.body.email,
      employeeId: req.body.employeeId,
      dob: req.body.dob,
      gender: req.body.gender,
      maritalStatus: req.body.maritalStatus,
      designation: req.body.designation,
      department: req.body.department, // Department ID
      salary: req.body.salary,
      userId: savedUser._id, // Link to the user model
    });

    const savedEmployee = await newEmployee.save();

    // Respond with success message
    return res.status(201).json({
      success: true,
      message: "Employee added successfully!",
      employee: savedEmployee,
    });

  } catch (error) {
    console.error("AddEmployee Error:", error);
    return res.status(500).json({
      success: false,
      error: "Server error while adding employee"
    });
  }
};

// Fetch all employees
export const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find()
      .populate('userId', 'name profileImage') // Only populate name and profileImage from User model
      .populate('department', 'dep_name') // Populate only the department name
      .exec();

    return res.status(200).json({
      success: true,
      employees,
    });
  } catch (error) {
    console.error("Error fetching employees:", error);
    return res.status(500).json({
      success: false,
      error: "Server error while fetching employees",
    });
  }
};

export const getEmployee = async (req, res) => {
    try {
      const userId = req.user?.id; // or use req.params.id if from route
  
      if (!userId || userId === 'undefined') {
        return res.status(400).json({
          success: false,
          error: "Invalid or missing user ID",
        });
      }
  
      const employee = await Employee.findOne({ userId })
        .populate("userId", "name email") // optional
        .populate("department", "dep_name"); // optional
  
      if (!employee) {
        return res.status(404).json({
          success: false,
          message: "Employee not found",
        });
      }
  
      return res.status(200).json({
        success: true,
        employee,
      });
    } catch (error) {
      console.error("getEmployee error:", error.message);
      return res.status(500).json({
        success: false,
        error: "Server error while fetching employee",
      });
    }
  };
  