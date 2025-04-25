import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import {
  addDepartment,
  getDepartments,
  getDepartment,
  updateDepartment,
  deleteDepartment,
} from '../controllers/departmentController.js';

const router = express.Router();

router.get('/', authMiddleware, getDepartments);         // All departments
router.post('/add', authMiddleware, addDepartment);      // Add department
router.get('/:id', authMiddleware, getDepartment);       // Get one
router.put('/:id', authMiddleware, updateDepartment);    // Update
router.delete('/:id', authMiddleware, deleteDepartment); // Delete

export default router;
