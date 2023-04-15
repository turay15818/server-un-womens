import express from "express";
import { Login, Me, LogoutUser } from "../controllers/AuthenticationController.js";
const router = express.Router()


router.post('/login', Login)
router.get('/me', Me)
router.delete('/logoutUser', LogoutUser)

export default router
