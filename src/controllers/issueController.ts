import { Request, Response } from "express";
import prisma from "../config";

export const createIssue = async (req: Request, res: Response) => {
  try {
    const { title, description, severity, priority } = req.body;
    const issue = await prisma.issue.create({
      data: { title, description, severity, priority },
    });
    res.status(201).json(issue);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const getIssues = async (req: Request, res: Response) => {
  try {
    const issues = await prisma.issue.findMany();
    res.status(200).json(issues);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const getIssueById = async (req: Request, res: Response) => {
  try {
    console.log(req.params.id);

    const issue = await prisma.issue.findUnique({
      where: { id: Number(req.params.id) },
    });

    console.log(issue);

    if (!issue) {
      return res.status(404).json({ error: "Issue not found" });
    }
    res.status(200).json(issue);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const updateIssue = async (req: Request, res: Response) => {
  try {
    const issue = await prisma.issue.findUnique({
      where: { id: Number(req.params.id) },
    });
    if (!issue) {
      return res.status(404).json({ error: "Issue not found" });
    }
    const updatedIssue = await prisma.issue.update({
      where: { id: Number(req.params.id) },
      data: req.body,
    });
    res.status(200).json(updatedIssue);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteIssue = async (req: Request, res: Response) => {
  try {
    const issue = await prisma.issue.findUnique({
      where: { id: Number(req.params.id) },
    });
    if (!issue) {
      return res.status(404).json({ error: "Issue not found" });
    }
    await prisma.issue.delete({
      where: { id: Number(req.params.id) },
    });
    res.status(200).json({ message: "Issue deleted" });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};
