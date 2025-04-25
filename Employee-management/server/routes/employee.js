import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import {
  addEmployee, upload,getEmployees,getEmployee
} from '../controllers/employeeController.js';

const router = express.Router();

router.get('/', authMiddleware, getEmployees);  // Change to /api/employee
router.post('/add', authMiddleware, upload.single('image'),addEmployee);

router.get('/:id', authMiddleware, getEmployee);       // Add department
// router.get('/:id', authMiddleware, getDepartment);       // Get one
// router.put('/:id', authMiddleware, updateDepartment);    // Update
// router.delete('/:id', authMiddleware, deleteDepartment); // Delete

export default router;
