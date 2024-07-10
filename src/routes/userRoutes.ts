import express from "express";
import { getUserDetails } from "../controllers/userController";
import { authenticate } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/me", authenticate, getUserDetails);

export default router;
