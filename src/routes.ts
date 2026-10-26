import { Router, Request, Response } from "express";

export const STARTED_AT = new Date().toISOString();

export const router = Router();

router.get("/api/health", (_req: Request, res: Response) => {
  res.status(200).json({
    status: "ok",
    uptime: process.uptime(),
    startedAt: STARTED_AT,
  });
});

router.get("/api/hello", (_req: Request, res: Response) => {
  res.status(200).json({ message: "Hello, World!" });
});
