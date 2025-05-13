import express, { Request, Response } from 'express';
import { getTask, getAllTasks, deleteTask, updateTask, addTask } from '../controllers/taskController';

const router = express.Router();

router.route("/").get(getAllTasks);
router.route("/:id").get(getTask);
router.route("/").post(addTask);
router.route("/:id").put(updateTask);
router.route("/:id").delete(deleteTask);

export default router;