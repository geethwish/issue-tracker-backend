import { Request, Response } from "express";
import prisma from "../config";

export const createIssue = async (req: Request | any, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const { title, description, severity, priority } = req.body;
    const issue = await prisma.issue.create({
      data: {
        title,
        description,
        severity,
        priority,
        userId: req.user.userId,
      },
    });
    res.status(201).json(issue);
  } catch (err) {
    const error = err as Error;
    res.status(400).json({ error: error.message });
  }
};

export const getIssues = async (req: Request | any, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const issues = await prisma.issue.findMany({
      where: { userId: req.user.userId },
    });
    res.status(200).json(issues);
  } catch (err) {
    const error = err as Error;
    res.status(400).json({ error: error.message });
  }
};

export const getIssueById = async (req: Request | any, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const issue = await prisma.issue.findUnique({
      where: { id: Number(req.params.id) },
    });
    if (!issue || issue.userId !== req.user.userId) {
      return res.status(404).json({ error: "Issue not found" });
    }
    res.status(200).json(issue);
  } catch (err) {
    const error = err as Error;
    res.status(400).json({ error: error.message });
  }
};

export const updateIssue = async (req: Request | any, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const issue = await prisma.issue.findUnique({
      where: { id: Number(req.params.id) },
    });
    if (!issue || issue.userId !== req.user.userId) {
      return res.status(404).json({ error: "Issue not found" });
    }
    const updatedIssue = await prisma.issue.update({
      where: { id: Number(req.params.id) },
      data: req.body,
    });
    res.status(200).json(updatedIssue);
  } catch (err) {
    const error = err as Error;
    res.status(400).json({ error: error.message });
  }
};

export const deleteIssue = async (req: Request | any, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const issue = await prisma.issue.findUnique({
      where: { id: Number(req.params.id) },
    });
    if (!issue || issue.userId !== req.user.userId) {
      return res.status(404).json({ error: "Issue not found" });
    }
    await prisma.issue.delete({
      where: { id: Number(req.params.id) },
    });
    res.status(200).json({ message: "Issue deleted" });
  } catch (err) {
    const error = err as Error;
    res.status(400).json({ error: error.message });
  }
};
