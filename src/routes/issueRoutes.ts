import { Router } from "express";
import {
  createIssue,
  getIssues,
  getIssueById,
  updateIssue,
  deleteIssue,
} from "../controllers/issueController";
import { authenticate, authorize } from "../middleware/authMiddleware";

const router = Router();

router.post("/", authenticate, createIssue);
router.get("/", authenticate, getIssues);
router.get("/:id", authenticate, getIssueById);
router.put("/:id", authenticate, updateIssue);
router.delete("/:id", authenticate, authorize(["ADMIN"]), deleteIssue);

export default router;
