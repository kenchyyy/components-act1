import {
    createUser,
    getUsers
} from "../controllers/userController"

import express from "express"

const router = express.Router()

router.route("/").get(getUsers).post(createUser)

export default router