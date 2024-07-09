import { Router } from "express";
import {
  createIssue,
  getIssues,
  getIssueById,
  updateIssue,
  deleteIssue,
} from "../controllers/issueController";

const router = Router();

router.post("/", createIssue);
router.get("/", getIssues);
router.get("/:id", getIssueById);
router.put("/:id", updateIssue);
router.delete("/:id", deleteIssue);

export default router;
