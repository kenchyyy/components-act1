import {
    addEmployee,
    getEmployees
} from "../controllers/employeeController"

import express from "express"

const router = express.Router()

router.route("/").get(getEmployees).post(addEmployee)

export default router